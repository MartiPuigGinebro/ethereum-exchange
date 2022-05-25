import {BsShieldFillCheck} from "react-icons/bs";
import {AiOutlinePercentage} from "react-icons/ai";
import {BiTimeFive} from "react-icons/bi";
import {SiEthereum, SiHiveBlockchain, SiTrustpilot} from "react-icons/si";

/**
 * Creación de un componente de tarjeta de servicio.
 */
const ServiceCard = ({color, title, icon, subtitle}) => (
    <div
        className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
        <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
            {icon}
        </div>
        <div className="ml-5 flex flex-col flex-1">
            <h3 className="text-white text-xl sm:text-2xl font-bold">{title}</h3>
            <p className="mt-2 text-white text-sm ">{subtitle}</p>
        </div>
    </div>
);

/**
 * Componente de servicios. Contiene una lista de tarjetas de servicios.
 */
const Services = () => {
    return (
        <div className="flex flex-col ml:flex-row w-full lg:pt-32 justify-center items-center ">
            <div id="services" className="flex mf:flex-row flex-col items-center justify-between py-12 px-4">
                <div className="flex-1 flex flex-col items-start justify-start">
                    <h2 className="text-white text-3xl sm:text-5xl text-white">Services that we offer...
                        <br/>
                        and keep improving</h2>
                </div>
            </div>
            <div className="flex-1 flex flex-col md:w-3/5">
                <ServiceCard
                    color="bg-[#F84550]"
                    title="Best Rates"
                    icon={<AiOutlinePercentage fontSize={21} className="text-white"/>}
                    subtitle="We offer the best market rates just for you and your business."
                />
                <ServiceCard
                    color="bg-[#F845504C]"
                    title="Security Guaranteed"
                    icon={<BsShieldFillCheck fontSize={21} className="text-white"/>}
                    subtitle="Your data is safe with us. We use the latest security technologies to protect your data."
                />
                <ServiceCard
                    color="bg-[#8945F8]"
                    title="Fast and Easy"
                    icon={<BiTimeFive fontSize={21} className="text-white"/>}
                    subtitle="You only need to fill out the form and we will take care of the rest."
                />
                <ServiceCard
                    color="bg-[#8945F84D]"
                    title="Reliability"
                    icon={<SiTrustpilot fontSize={21} className="text-white"/>}
                    subtitle="We are reliable and we will always be there to help you."
                />
                <ServiceCard
                    color="bg-[#2952E3]"
                    title="Blockchain"
                    icon={<SiHiveBlockchain fontSize={21} className="text-white"/>}
                    subtitle="Our application is built on the blockchain. We are always up to date."
                />
                <ServiceCard
                    color="bg-[#2952E34D]"
                    title="Ethereum"
                    icon={<SiEthereum fontSize={21} className="text-white"/>}
                    subtitle="ETH is the most popular cryptocurrency in the world. We use it to make transactions."
                />
            </div>
        </div>
    )
};

export default Services;
