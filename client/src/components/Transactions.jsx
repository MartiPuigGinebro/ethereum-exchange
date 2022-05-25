import React, {useContext} from 'react';

import {TransactionContext} from '../context/TransactionContext';

import dummyData from "../utils/dummyData";
import {shortenAddress} from "../utils/shortenAddress";
import useFetch from "../hooks/useFetch";

const TransactionCard = ({value, keyword, message, from, url, timestamp, to}) => {
    const gifUrl = useFetch({keyword});

    return (
        <div className="bg-[#181918] m-4 flex flex-1
            2xl:min-w-[450px]
            2xl:max-w-[550px]
            sm:min-w-[270px]
            sm:max-w-[300px]
            flex-col p-3 rounded-md hover:shadow-2xl">

            <div className="flex flex-col items-center w-full mt-3">
                <div className="w-full mb-6 p-2">
                    <a href={`https://ropsten.etherscan.io/address/${from}`} target='_blank' rel='_noopener noreferrer'>
                        <p className="text-white text-base">From: {shortenAddress(from)}</p>
                    </a>
                    <a href={`https://ropsten.etherscan.io/address/${to}`} target='_blank' rel='_noopener noreferrer'>
                        <p className="text-white text-base">To: {shortenAddress(to)}</p>
                    </a>
                    <p className="text-white text-base">Amount: {value} ETH</p>
                    {message && <p className="text-white text-base">Message: {message}</p>}


                </div>
                <img
                    src={gifUrl || url}
                    alt="gif"
                    className="w-full h-64 2x:h-96 rounded-md shadow-lg object-cover"
                />
                <div className="bg-black p-3 px-10 w-max rounded-3xl -mt-12 shadow-2xl">
                    <p className="text-[#722741FF] font-bold">{timestamp}</p>
                </div>
            </div>
        </div>
    )
};

const Transactions = () => {
    const {currentAccount, transactions} = useContext(TransactionContext);

    return (
        <div className="flex w-full justify-center items-center lg:pt-20 2xl:px-20 ">
            <div id="transactions" className="flex flex-col md:p-12 py-12 px-4">
                {currentAccount ? (
                    <h3 className="text-white text-3xl text-center my-2">Latest transactions</h3>
                ) : (
                    <h3 className="text-white text-3xl text-center my-2">Connect your wallet to see your transactions </h3>
                )
                }

                <div className="flex flex-wrap justify-center items-center mt-10">
                    {transactions.reverse().map((transactions, index) => (
                        <TransactionCard key={index} {...transactions}/>)
                    )}
                </div>
            </div>
        </div>
    )
};

export default Transactions;
