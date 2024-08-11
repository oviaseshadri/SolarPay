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
  const { getBillAmount, payBill, connectWallet } = useContext(TransactionContext);

  const [hideConnectBtn, setHideButtonBtn] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [billAmount, setBillAmount] = useState(null);

  // useEffect(() => {
  //   if(window.ethereum && window.ethereum.isMiniPay) {
  //     connectWallet();
  //   } else {
  //     setHideButtonBtn(false);
  //   }
  // }, []);

  const handleCalculateBill = async () => {
    try {
      setActiveSection('userDetails');
      const amout = await getBillAmount();
      setBillAmount(amout);
    } catch (error) {
      setError(`Failed to calculate bill: ${error.message}`);
    }
  };

  const handlePayBill = async () => {
    try {
      setActiveSection('userDetails');
      await payBill(billAmount);
    } catch (error) {
      setError(`Failed to pay bill: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="flex w-full justify-center">
        <div className="flex flex-col items-center text-white">
          <div className="flex items-center">
            <span className="mx-4">Current bill:</span>
            {billAmount !== null ? <span className="text-xl font-bold">{billAmount} WEI</span> : '-'}
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <button
          className=" flex p-5 mb-5 bg-violet-700 text-white font-bold py-2 px-4 rounded-full my-10"
          style={{
            marginRight: "10px",
            backgroundColor: "#602ADA",
          }}
          onClick={handleCalculateBill}
        >
          Update your current bill
        </button>
        <button
          className="flex p-5 mb-5 bg-violet-700 text-white font-bold py-2 px-4 rounded-full my-10"
          style={{
            marginRight: "10px",
            backgroundColor: "#602ADA",
          }}
          onClick={handlePayBill}
        >
          Pay Bill
        </button>
      </div>
    </div>
  );
};

export default ElectricityBill;
