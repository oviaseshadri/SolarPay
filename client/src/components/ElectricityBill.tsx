import React, { useContext, useEffect, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";
import { Form } from ".";
import ConnectButton from "./ConnectButton";


const ElectricityBill = () => {
  const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading } = useContext(TransactionContext);

  const [ hideConnectBtn, setHideButtonBtn] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  // useEffect(() => {
  //   if(window.ethereum && window.ethereum.isMiniPay) {
  //     connectWallet();
  //   } else {
  //     setHideButtonBtn(false);
  //   }
  // }, []);

  const calculateBill = async () => {
    try {
      setActiveSection('userDetails');
    } catch (error) {
      setError(`Failed to calculate bill: ${error.message}`);
    }
  };

  const payBill = async () => {
    try {
      setActiveSection('userDetails');
    } catch (error) {
      setError(`Failed to pay bill: ${error.message}`);
    }
  };

  return (
    <div className="flex w-full justify-center items-center">
        <button
          className=" flex p-5 mb-5 bg-violet-700 text-white font-bold py-2 px-4 rounded-full my-10"
          style={{
            marginRight: "10px",
            backgroundColor: "#602ADA",
          }}
          onClick={calculateBill}
        >
          Outstanding Payment
        </button>
        <button
          className="flex p-5 mb-5 bg-violet-700 text-white font-bold py-2 px-4 rounded-full my-10"
          style={{
            marginRight: "10px",
            backgroundColor: "#602ADA",
          }}
          onClick={payBill}
        >
          Pay Bill
        </button>
    </div>
  );
};

export default ElectricityBill;
