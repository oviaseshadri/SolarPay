import { createPublicClient, createWalletClient, http, parseEther, formatEther } from 'viem';
import { celoAlfajores } from '@viem/chain';
import { privateKeyToAccount } from 'viem/accounts';

// Replace with your private key
const privateKey = 'a63f1757490144618dd21956f01b7ce0d8df5248d921fff91db4ce9e7a87ab4d';
const account = privateKeyToAccount(privateKey);

// Setup public and wallet clients
const publicClient = createPublicClient({
  chain: celoAlfajores,
  transport: http(),
});

const walletClient = createWalletClient({
  chain: celoAlfajores,
  transport: http(),
  account,
});

// Contract ABI and address
const contractABI = [/* Place the ABI array here */];
const contractAddress = '0x19bf72D056FcF008F710Ee2995bEE66C259707CE';

// Helper function to call view functions
async function callViewFunction(functionName, args = []) {
  return await publicClient.readContract({
    address: contractAddress,
    abi: contractABI,
    functionName,
    args,
  });
}

// Helper function to send transactions
async function sendTransaction(functionName, args = [], value) {
  const txHash = await walletClient.writeContract({
    address: contractAddress,
    abi: contractABI,
    functionName,
    args,
    value,
  });
  console.log('Transaction Hash:', txHash);
  const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
  console.log('Transaction Receipt:', receipt);
  return receipt;
}

// Invoke functions

async function invokeFunctions() {
  // 1. DollarPerUnit (view function)
  const dollarPerUnit = await callViewFunction('DollarPerUnit');
  console.log('DollarPerUnit:', formatEther(dollarPerUnit));

//   // 2. addConsumption (nonpayable)
//   const unitsConsumed = 100; // Example value
//   await sendTransaction('addConsumption', [unitsConsumed]);

//   // 3. calculateBill (view function)
//   const billAmount = await callViewFunction('calculateBill');
//   console.log('Bill Amount:', formatEther(billAmount));

//   // 4. getPaymentHistory (view function)
//   const userAddress = account.address;
//   const paymentHistory = await callViewFunction('getPaymentHistory', [userAddress]);
//   console.log('Payment History:', paymentHistory);

//   // 5. owner (view function)
//   const ownerAddress = await callViewFunction('owner');
//   console.log('Owner Address:', ownerAddress);

//   // 6. payBill (payable)
//   const paymentValue = parseEther('0.1'); // Example payment value
//   await sendTransaction('payBill', [], paymentValue);

//   // 7. setDollarPerUnit (nonpayable)
//   const newDollarPerUnit = 200; // Example value
//   await sendTransaction('setDollarPerUnit', [newDollarPerUnit]);

//   // 8. users (view function)
//   const userInfo = await callViewFunction('users', [userAddress]);
//   console.log('User Info:', userInfo);
}

// Run the function invocations
invokeFunctions().catch(console.error);
