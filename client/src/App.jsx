import {Footer, Navbar, Services, Transactions, Welcome} from './components';

/**
 * La función de la aplicación devuelve un div con un componente de Navbar, Welcome, Services,
 * Transactions y Footer.
 */
const App = () => {
    return (
        <div className="min-h-screen gradient-bg">
            <div>
                <Navbar/>
                <Welcome/>
            </div>
            <Services/>
            <Transactions/>
            <Footer/>
        </div>
    )
};

export default App
