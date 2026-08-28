import { useEffect, useRef, useState, useId } from "react";
// import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useRouter } from "next/navigation";
import styles from './page.module.css';
import { getCurrentYear } from '../utils/functions'


export default function FooterComponent() {
    const [currentYearOnline, setCurrentYearOnline] = useState(null);
    getCurrentYear(setCurrentYearOnline)


    return (
        <div className={`${styles.footer} w-full flex flex-col text-white bg-black justify-center items-center m-2 p-2`}>
            <h1 className={`text-2xl text-center`}>
                © {currentYearOnline} Leandro Santos de Carvalho.
            </h1>
            <h1 className={`text-2xl text-center`}>
                Todos os direitos reservados.
            </h1>
        </div>
    )
}