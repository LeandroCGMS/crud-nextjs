import { useEffect, useRef, useState, useId } from "react";
// import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import ReCaptchaProvider from './GoogleRecaptchaProvider'
import { useRouter, usePathname } from "next/navigation";
import { BsMicrosoftTeams } from "react-icons/bs";
import { SiZoom } from "react-icons/si";
import { MdOutlineEmail } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { useWindowSize } from '../utils/useWindowSize';
import Navbar from '../utils/Navbar'
import { IoHomeOutline } from "react-icons/io5";
import { GrTest } from "react-icons/gr";
import { VscCallOutgoing } from "react-icons/vsc";

const classNamesButtonsContact = `cursor-pointer hover:bg-gray-700 active:bg-gray-600 p-2 rounded-lg bg-[white] border-[#CF27F5] border-1`;
function HeaderPCVersion() {
    return (
        <div className="w-full w-x-full flex flex-row text-white bg-black justify-between items-center p-2 border border-white rounded-lg">
            <div>
                <ComponentButtonFaleConosco />
            </div>
            <div>
                <ComponentButtonAreaDeTestes />
            </div>
            <ComponentContacts />
        </div>
    )
}
export default function HeaderComponent() {
    const width = useWindowSize();

    // Define o breakpoint para mobile
    const isMobile = width <= 768;
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, [])
    return (
        <>
            {!isMobile && hasMounted && <HeaderPCVersion />}
            {isMobile && hasMounted && <Navbar />}
        </>
    )
}

export function ComponentContacts({ rowOrColumn = 'row' }) {
    return (
        <div className={`flex ${rowOrColumn === 'row' ? 'flex-row' : 'flex-col'} gap-2 justify-center items-center h-fit`}>
            <h1 className={`text-white bg-black font-mono`}>Contatos: </h1>
            <div className={`flex flex-row gap-1`}>
                <BsMicrosoftTeams className={classNamesButtonsContact} size={40} color="#6264A7" onClick={() => {
                    window.open(`https://teams.microsoft.com/l/chat/0/0?users=leandrocgms1986@outlook.com`, '_blank', 'noopener,noreferrer')
                }} />
                <SiZoom className={classNamesButtonsContact} size={40} color="#0000FF" onClick={() => {
                    window.open(`https://zoom.us/start/videomeeting?email=leandrocgms2015@gmail.com`, '_blank', 'noopener,noreferrer')
                }} />
                <MdOutlineEmail className={`${classNamesButtonsContact} bg-black`} size={40} color="white" onClick={() => {
                    window.open(`mailto:leandrocgms1986@outlook.com`, '_blank', 'noopener,noreferrer')
                }} />
                <IoLogoWhatsapp className={classNamesButtonsContact} size={40} color="green" onClick={() => {
                    window.open(`https://wa.me/5567981712803`, '_blank', 'noopener,noreferrer')
                }} />
                <FaGithub className={`${classNamesButtonsContact} bg-black`} size={40} color="white" onClick={() => {
                    window.open(`https://github.com/LeandroCGMS`, '_blank', 'noopener,noreferrer')
                }} />
            </div>
        </div>
    )
}

export function ComponentButtonFaleConosco() {
    return (
        <button className="font-mono flex flex-row gap-2 items-center justify-center bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg cursor-pointer">
            <VscCallOutgoing />
            Fale Conosco
        </button>
    )
}

export function ComponentButtonAreaDeTestes() {
    const pathname = usePathname();

    // Verifica se está exatamente na raiz '/'
    const isHome = pathname === '/';
    console.log('pathname:', pathname, 'isHome:', isHome);
    const router = useRouter();
    if (isHome) {
        return (
            <button onClick={() => {
                router.push('/login')
            }}
                className="font-mono flex flex-row gap-2 items-center justify-center bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg cursor-pointer">
                <GrTest />
                Área de Testes
            </button>
        )
    }
    return (
        <button onClick={() => {
            router.push('/')
        }}
            className="font-mono flex flex-row gap-2 items-center justify-center bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg cursor-pointer">
            <IoHomeOutline /> Página Inicial
        </button>
    )
}