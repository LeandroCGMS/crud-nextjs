'use client';
import React from 'react';
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useRouter } from "next/navigation";
import HeaderComponent from '../components/screens/HeaderComponent';
import FooterComponent from '@/app/components/screens/FooterComponent'
import useWindowSizeHW from '../components/utils/useWindowHW';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleToken } from '@/app/components/utils/useGoogleToken';
import { toast } from 'sonner';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { global } from '@/app/components/utils/functions'

export default function LoginComponent() {
	const { footerHeight, headerHeight } = global
	const sumHeights = footerHeight + headerHeight
	console.warn('footerHeight => ', footerHeight, 'headerHeight => ', headerHeight, 'sumHeights => ', sumHeights)
	const { getGoogleToken, isReady } = useGoogleToken();
	const divRef = useRef(null);
	const router = useRouter()
	const [hidePassword, setHidePassword] = useState(true)
	const [inputHeightPassword, setInputHeightPassword] = useState(0)
	const inputRefPassword = useRef(null);
	useEffect(() => {
		if (inputRefPassword.current) {
			setInputHeightPassword(inputRefPassword.current.offsetHeight);
		}
	}, [])
	const baseIconPasswordStyle = {
		marginBottom: - inputHeightPassword, position: 'relative', marginLeft: 5, cursor: 'pointer', opacity: 0.5
	}
	const handleSuccess = async (credentialResponse) => {
		const token = credentialResponse.credential
		// console.log('Login efetuado com sucesso! Token JWT do Google:', token);

		// Aqui você normalmente envia o 'credential' (ID token) para o seu backend 
		// ou API Route do Next.js para validar a sessão e autenticar o usuário no banco de dados.
		try {
			isReady && getGoogleToken('api_news_action').then(async googleToken => {
				if (googleToken) {
					const response = await fetch('/api/auth/google', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							googleToken: googleToken
						},
						body: JSON.stringify({ token }),
					});

					const data = await response.json();

					if (response.ok) {
						toast.success('Autenticado com sucesso.');
						sessionStorage.setItem('dataUser', JSON.stringify(data));
						router.push('/homelogged');
					} else {
						toast.error('Erro na autenticação. Tente, novamente, ou contacte o administrador do sistema.');
					}
				} else {
					toast.error('Falha ao obter o token do Google reCAPTCHA v3.');
				}
			});
		} catch (error) {
			toast.error('Erro de rede ao comunicar com o servidor. Tente, novamente, ou contacte o administrador do sistema.');
		}
	};

	const handleError = () => {
		toast.error('Erro ao realizar login com o Google.');
	};
	return (
		<>
			<HeaderComponent />
			<div style={{ minHeight: `calc(100vh - ${sumHeights}px)` }} className={`min-w-screen flex flex-col items-center justify-center gap-2 bg-black text-black`}>
				<div
					className={`bg-white border-[0.4em] border-purple-700 flex flex-col items-center justify-center px-0 sm:px-12 py-2 gap-1 rounded-lg w-[auto]`}>
					<div className={`flex flex-col items-center justify-center border-[2px] border-gray-200 py-1 rounded-lg w-full`}>
						<label className={`text-xs`} htmlFor="inputUser">Nome de Usuário / e-mail cadastrado: </label>
						<input className={`p-2 border-[2px] rounded text-center`} placeholder="Usuário" type="text" name="inputUser" id="" />
					</div>
					<div className={`flex flex-col items-center justify-center border-[2px] border-gray-200 py-1 rounded-lg w-full`}>
						<label className={`text-xs`} htmlFor="inputPassword">Senha: </label>
						<div className={``}>
							{hidePassword ? (
								<FaEye style={baseIconPasswordStyle} size={inputHeightPassword} onClick={() => setHidePassword(false)} />
							) : (
								<FaEyeSlash style={baseIconPasswordStyle} size={inputHeightPassword} onClick={() => setHidePassword(true)} />
							)}
							<input ref={inputRefPassword} maxLength="20" className={`p-2 border-[2px] rounded text-center`} placeholder="Senha" type={hidePassword ? "password" : "text"} name="inputPassword" id="" />
						</div>
					</div>
					<div className={`flex flex-row items-center border-[2px] border-gray-200 rounded-lg justify-center gap-2 w-full px-1`}>
						<button className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900">
							Entrar
						</button>

						<button className="px-6 py-2.5 text-sm font-semibold text-slate-200 bg-slate-800/80 border border-slate-700/60 rounded-lg backdrop-blur-md hover:bg-slate-700/80 hover:text-white hover:border-slate-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900">
							Criar Conta
						</button>
						{/* <button className="flex items-center justify-center gap-3 px-6 py-2.5 text-sm font-medium text-slate-200 bg-slate-800/80 border border-slate-700/80 rounded-lg hover:bg-slate-700/80 hover:text-white hover:border-slate-600 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-sm">
							<svg className="w-5 h-5" viewBox="0 0 24 24">
								<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
								<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
								<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
								<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
							</svg>
							<span>Entrar com o Google</span>
						</button> */}
						<div className="overflow-scroll max-w-[140px]">
							<GoogleLogin
								onSuccess={handleSuccess}
								onError={handleError}
								useOneTap
							/>
						</div>
					</div>
				</div>
			</div>
			<FooterComponent />
		</>
	)
}

