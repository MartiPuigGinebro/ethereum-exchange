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

    const handleChange = (event, name) => {
        setFormData((prevState) => ({...prevState, [name]: event.target.value}));
    };

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) {
                return alert('Please connect to MetaMask');
            }

            const accounts = await ethereum.request({method: 'eth_accounts'});

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
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
        } catch (error) {
            console.log(error);

            throw new Error('No ethereum object');
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (<TransactionContext.Provider
        value={{connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction}}>
        {children}
    </TransactionContext.Provider>);
};
