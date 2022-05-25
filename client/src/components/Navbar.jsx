import {useState} from "react";
import {HiMenuAlt4} from 'react-icons/hi';
import {AiOutlineClose} from 'react-icons/ai';
import {HashLink} from 'react-router-hash-link';
import {BrowserRouter} from "react-router-dom";

import logo from '../assets/logo.png';

/* Dependiendo del dispositivo, el menú es diferente */
const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        <BrowserRouter basename="/">
            <nav className="w-full flex md:justify-center justify-between items-center p-4">
                <div className="md:flex-[0.5] flex-initial justify-center items-center">
                    <img src={logo} alt="logo" className="w-48 cursor-pointer"/>
                </div>
                <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                    <li className='mx-4 cursor-pointer services'>
                        <HashLink smooth to="/#services">Services</HashLink>
                    </li>
                    <li className='mx-4 cursor-pointer transactions'>
                        <HashLink smooth to="/#transactions">Transactions</HashLink>
                    </li>
                    <li className='mx-4 cursor-pointer footer'>
                        <HashLink smooth to="/#footer">Web 3.0</HashLink>
                    </li>
                    <li
                        className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                        <a href="https://github.com/MartiPuigGinebro/ethereum-exchange">Source</a>
                    </li>
                </ul>

                <div className="flex relative">
                    {toggleMenu ?
                        <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer"
                                        onClick={() => setToggleMenu(false)}/> :
                        <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer"
                                    onClick={() => setToggleMenu(true)}/>
                    }

                    {toggleMenu && (
                        <ul className="fixed top-0 right-0 p-3 w-screen h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in">
                            <li className="text-xl w-full my-2">
                                <AiOutlineClose onClick={() => setToggleMenu(false)}/>
                            </li>
                            <li className='mx-4 cursor-pointer wallet'>
                                <HashLink smooth to="/#wallet">Wallet</HashLink>
                            </li>
                            <li className='mx-4 cursor-pointer services'>
                                <HashLink smooth to="/#services">Services</HashLink>
                            </li>
                            <li className='mx-4 cursor-pointer transactions'>
                                <HashLink smooth to="/#transactions">Transactions</HashLink>
                            </li>
                            <li className='mx-4 cursor-pointer footer'>
                                <HashLink smooth to="/#footer">Web 3.0</HashLink>
                            </li>
                        </ul>
                    )}
                </div>
            </nav>
        </BrowserRouter>
    )
};

export default Navbar;
