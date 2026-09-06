import { useEffect, useRef, useState, useId } from "react";
// import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import ReCaptchaProvider from './GoogleRecaptchaProvider'
import { useRouter } from "next/navigation";


export default function HeaderComponent() {
    return (
        <div className="w-full flex flex-row text-white bg-black justify-between items-center p-2">
            <div >
                <button className="bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white font-bold py-2 px-4 rounded-full cursor-pointer">
                    Fale Conosco
                </button>
            </div>
            <div >
                <button className="bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white font-bold py-2 px-4 rounded-full cursor-pointer">
                    Área de Testes
                </button>
            </div>
            <div >
                <button className="bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white font-bold py-2 px-4 rounded-full cursor-pointer">
                    Área de Testes
                </button>
            </div>
        </div>
    )
}