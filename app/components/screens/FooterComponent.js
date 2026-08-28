import { useEffect, useRef, useState, useId } from "react";
// import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useRouter } from "next/navigation";
import styles from './page.module.css';

export default function FooterComponent({currentYearOnline}) {

    return (
        <div className={`${styles.footer} w-full flex flex-col text-white bg-black justify-center items-center m-2 p-2`}>
            <h1 className={`text-3xl text-center`}>
                © {currentYearOnline} Leandro Santos de Carvalho.
            </h1>
            <h1 className={`text-3xl text-center`}>
                Todos os direitos reservados.
            </h1>
        </div>
    )
}