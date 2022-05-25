import React, {useEffect} from 'react';
import {ethers} from 'ethers';

import {contractABI, contractAddress} from '../utils/constants';

/* Creación createContext, se puede usar para pasar datos a través del árbol de componentes sin tener que
pasar params manualmente en cada nivel. */
export const TransactionContext = React.createContext();

const {ethereum} = window;

/**
 * Devuelve una instancia del contrato que está conectado a la red Ethereum.
 */
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

    /**
     * Cuando el usuario escribe en el input, la función handleChange actualizará el estado de formData con el
     * nuevo valor.
     */
    const handleChange = (event, name) => {
        setFormData((prevState) => ({...prevState, [name]: event.target.value}));
    };

    /**
     * Obtiene todas las transacciones del contrato inteligente y luego establece el estado de las transacciones en
     * structuredTransactions
     */
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
            setTransactions(structuredTransactions);
        } catch (error) {
            throw new Error(error);
        }
    };

    /**
     * Si el usuario no está conectado a MetaMask, avísele para que se conecte. Si están conectados, obtenga la primera
     * cuenta de la lista de cuentas y configúrela como la cuenta actual. Luego, obtenga todas las transacciones de la
     * cuenta corriente.
     */
    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) {
                return alert('Please connect to MetaMask');
            }

            const accounts = await ethereum.request({method: 'eth_accounts'});

            if (accounts.length) {
                setCurrentAccount(accounts[0]);

                getAllTransactions();
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    /**
     * Si no hay ningún objeto ethereum, avise al usuario para que se conecte a MetaMask. Si hay un objeto ethereum,
     * solicite las cuentas del usuario y establezca la cuenta actual como cuenta.
     */
    const connectWallet = async () => {
        try {
            if (!ethereum) {
                return alert('Please connect to MetaMask');
            }

            const accounts = await ethereum.request({method: 'eth_requestAccounts'});

            setCurrentAccount(accounts[0]);
        } catch (error) {
            throw new Error(error);
        }
    };

    /**
     * Obtiene el recuento de transacciones del contrato inteligente y lo almacena en el almacenamiento local del
     * navegador.
     */
    const checkIfTransactionExists = async () => {
        try {
            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();

            window.localStorage.setItem('transactionCount', transactionCount);
        } catch (error) {
            throw new Error(error);
        }
    };

    /**
     * Envía una transacción a la cadena de bloques y luego agrega la transacción.
     */
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
            await transactionHash.wait();
            setIsLoading(false);

            const transactionCount = await transactionContract.getTransferCount();

            setTransactionCount(transactionCount.toNumber());

            window.location.reload();
        } catch (error) {
            throw new Error(error);
        }
    };

    /* Este es un hook que se llama cuando se monta el componente. Se utiliza para verificar si el usuario está
    conectado a MetaMask y si hay transacciones en el contrato inteligente. */
    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionExists();
    }, []);

    /* Pasar datos a los componentes secundarios. */
    return (<TransactionContext.Provider
        value={{
            connectWallet,
            currentAccount,
            formData,
            setFormData,
            handleChange,
            sendTransaction,
            transactions,
            isLoading
        }}>
        {children}
    </TransactionContext.Provider>);
};
