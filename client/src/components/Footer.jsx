const Footer = () => {
    return (
        <div className="flex flex-col w-full lg:flex-row justify-center items-center pb-20 lg:pb-20 lg:pt-40">
            <div id="footer" className="flex flex-col w-full lg:w-1/3">
                <h3 className="text-white text-3xl text-center my-2">
                    <a href="https://ethereum.org/en/web3/" className="text-white">
                        What is 3.0?
                    </a>
                </h3>
                <p className="text-white text-center my-2">
                    the decentralized market © {new Date().getFullYear()}
                </p>
            </div>
        </div>
    )
};

export default Footer;
