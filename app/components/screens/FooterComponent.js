'use client';
import { useEffect, useRef, useState, useId, useCallback } from "react";
// import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useRouter, usePathname } from "next/navigation";
import styles from './page.module.css';
import { getCurrentYear } from '../utils/functions'
import { global } from '@/app/components/utils/functions'


export default function FooterComponent() {
	console.log('usePathname => ', usePathname())
	const [currentYearOnline, setCurrentYearOnline] = useState(null);
	const footerRef = useRef(null)
	// Usar useEffect para buscar o ano apenas na montagem inicial evita chamadas repetidas
	useEffect(() => {
		getCurrentYear(setCurrentYearOnline);
	}, []);
	useEffect(() => {
		if (footerRef.current) {
			global.footerHeight = footerRef.current.offsetHeight;
		}
	},[footerRef?.current?.offsetHeight]);
	return (
		<div ref={footerRef} style={{ zIndex: usePathname() == '/login' ? 0 : 1001 }} className={`${styles.footer} w-full border-2 border-purple-500 rounded-lg mb-0 flex flex-col text-white bg-black justify-center items-center m-2 p-2`}>
			<h1 className={`text-2xl text-center`}>
				© {currentYearOnline} Leandro Santos de Carvalho.
			</h1>
			<h1 className={`text-2xl text-center`}>
				Todos os direitos reservados.
			</h1>
			{/* <div style={{ height: 65 }}>

            </div> */}
		</div>
	)
}