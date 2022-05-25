import React, {useEffect} from 'react';
import {ethers} from 'ethers';

import {contractABI, contractAddress} from '../utils/constants';

export const TransactionContext = React.createContext();

const {ethereum} = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
};

export const TransactionsProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = React.useState('');
    const [formData, setFormData] = React.useState({addressTo: '', amount: '', keyword: '', message: ''});
    const [isLoading, setIsLoading] = React.useState(false);
    const [transactionCount, setTransactionCount] = React.useState(localStorage.getItem('transactionCount') || 0);
    const [transactions, setTransactions] = React.useState([]);

    const handleChange = (event, name) => {
        setFormData((prevState) => ({...prevState, [name]: event.target.value}));
    };

    const getAllTransactions = async () => {
        try {
            if (!ethereum) {
                return alert('Please connect to MetaMask');
            }
            const transactionContract = getEthereumContract();

            const availableTransactions = await transactionContract.getAllTransfer();

            const structuredTransactions = availableTransactions.map((transaction) => ({
                from: transaction.from,
                to: transaction.to,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                value: parseInt(transaction.value._hex) / (10 ** 18),
            }));

            console.log(structuredTransactions);

            setTransactions(structuredTransactions);
        } catch (error) {
            console.error(error);
        }
    };

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) {
                return alert('Please connect to MetaMask');
            }

            const accounts = await ethereum.request({method: 'eth_accounts'});

            if (accounts.length) {
                setCurrentAccount(accounts[0]);

                getAllTransactions();
            } else {
                console.log('No accounts found');
            }
        } catch (error) {
            console.log(error);

            throw new Error('No ethereum object');
        }
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) {
                return alert('Please connect to MetaMask');
            }

            const accounts = await ethereum.request({method: 'eth_requestAccounts'});

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);

            throw new Error('No ethereum object');
        }
    };

    const checkIfTransactionExists = async () => {
        try {
            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();

            window.localStorage.setItem('transactionCount', transactionCount);
        } catch (error) {
            console.log(error);

            throw new Error('No ethereum object');
        }
    };

    const sendTransaction = async () => {
        try {
            if (!ethereum) {
                return alert('Please connect to MetaMask');
            }

            const {addressTo, amount, keyword, message} = formData;
            const transactionContract = getEthereumContract();
            const parseEtherAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',
                    value: parseEtherAmount._hex,
                }],
            });

            const transactionHash = await transactionContract.addToBlock(addressTo, parseEtherAmount, message, keyword);

            setIsLoading(true);
            console.log(`Loading: ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success: ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransferCount();

            setTransactionCount(transactionCount.toNumber());

            window.location.reload();
        } catch (error) {
            console.log(error);

            throw new Error('No ethereum object');
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionExists();
    }, []);

    return (<TransactionContext.Provider
        value={{connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, transactions, isLoading}}>
        {children}
    </TransactionContext.Provider>);
};
