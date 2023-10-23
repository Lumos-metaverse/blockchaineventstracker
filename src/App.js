import './App.css';
import React, {useState, useEffect} from "react";
import { ContractABI, ContractAddress } from "./utils/contractdeets";
import Header from "./components/Header";
import Logo from "./components/Logo";
import Button from "./components/Button";
import Header2 from "./components/Header2";
const ethers = require("ethers");
const {ethereum} = window;

function App() {
  const [walletAddress, setwalletAddress] = useState(null);
  const [myData, setMyData] = useState(null);
  const [myNumber, setMyNumber] = useState(null);
  const [myOldNumber, setMyOldNumber] = useState();
  const [myNewNumber, setMyNewNumber] = useState();
  const [myAddedNumber, setMyAddedNumber] = useState();
  const [mySender, setMyNewSender] = useState();

  const getEthereumContract = () => {
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const transactionContract = new ethers.Contract(
        ContractAddress,
        ContractABI,
        signer
      );
      return transactionContract;
    }
  };

  const latestEvent = () => {
    const transactionContract = getEthereumContract(); 
    transactionContract.on("storedNumber",(oldNumber, newNumber, addedNumber, sender) => {
      setMyOldNumber(Number(oldNumber));
      setMyNewNumber(Number(newNumber));
      setMyAddedNumber(Number(addedNumber));
      setMyNewSender(sender);
      
    });
    };

  const storeNum = async () => {
    try {      
      const transactionContract = getEthereumContract();
      const val = await transactionContract.store(myNumber);
      alert("Transaction Submitted, please wait for confirmation popup");
      await val.wait()
      window.confirm("Transaction Confirmed, select Get Last Number or Events");      
    } catch (error) {
      console.log(error);
    }
  };

  const getLastNum = async () => {
    try {      
      const transactionContract = getEthereumContract();
      const val = await transactionContract.retrieve();
      setMyData(val.toString());      
    } catch (error) {
      console.log(error);
    }
  };

  const ConnectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Please install metamask");
        return;
      } else {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setwalletAddress(accounts[0]);
        console.log("Connected", walletAddress);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    latestEvent();
  });

  return (
      <div className="App">
          <header className = "center">
          <Logo />
          <Header title = "Blockchain Events Tracker" />
          <section className = "right">
          {walletAddress === null ? (<button onClick={() => ConnectWallet()} > Metamask Connect Wallet </button>) 
          : (<p> Wallet Address Connected </p>)}
          </section>
          <input type = "text" placeholder = "Enter a number" onChange={(e)=>(setMyNumber(e.target.value))} />
          <Button onClick={() => storeNum()} text = "Enter a number" />
          <br />
          <br />
          <Button onClick = {() => getLastNum()} text = "Get Last Number" />
          {myData!==null ? <p> <b>Your Last Number: </b> {myData} </p> : undefined}
          <br />
          <Header2 title = "Latest Event"/>
          {mySender!==null ? <p><b>Old Number: </b> {myOldNumber} </p>:undefined}
          {mySender!==null ? <p><b>New Number: </b> {myNewNumber} </p>:undefined}
          {mySender!==null ? <p> <b>Added Number: </b> {myAddedNumber} </p>:undefined}
          {mySender!==null ? <p><b>Sender: </b> {mySender} </p>:undefined}
          </header>
      </div>
    );
  }

export default App;