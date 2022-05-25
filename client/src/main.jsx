import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {TransactionsProvider} from './context/TransactionContext'

/* Render de APP dentro del componente TransactionsProvider. */
ReactDOM.createRoot(
    document.getElementById('root')).render(
    <TransactionsProvider>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </TransactionsProvider>
);
