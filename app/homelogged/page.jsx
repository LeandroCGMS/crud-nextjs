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
/*
  {
    "email": "leandrocgms2015@gmail.com",
    "name": "Leandro Santos de Carvalho",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocKsvClylyK5RJ66jjZ_zpa-l44wWs59ilj1wtheAlVMnzH13nC6=s96-c"
  }
*/

export default function HomeLoggedComponent() {
  const router = useRouter()
  const [dataUser, setDataUser] = useState(null);
  const hasRedirected = useRef(false); // Trava de segurança
  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem('dataUser'));
    if (!currentUser) {
      toast.warning(`Usuário não autenticado. Redirecionando para login...
\nAs sessões autenticadas valem uma sessão, ou seja, enquanto esta aba ou esta janela estiver aberta, você estará autenticado. Por favor, faça login para acessar seu espaço de usuário.`,
        { duration: 7000, position: 'top-center' });
      router.push('/login')
    }
    setDataUser(currentUser);
  }, [])
  return (
    <>
      <HeaderComponent />
      <div className={`h-screen min-w-screen flex flex-row items-center justify-center bg-white text-black`}>
        <div className={`basis-1/3 h-screen border border-violet-700 ml-0 m-1 rounded-lg p-2 flex flex-col items-center justify-start gap-2`}>
          <div className="flex flex-col items-center justify-center p-8 bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-800 shadow-2xl max-w-sm mx-auto text-center transition-all hover:border-slate-700/60 hover:shadow-cyan-500/10">
            {/* Foto de Perfil com Anel Degradê e Efeito Hover */}
            <div className="relative mb-4 group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
              <img
                referrerPolicy="no-referrer"
                src={dataUser?.user?.picture?.replace(/=s\d+(-c)?$/, '=s0')}
                alt="Foto de Perfil do Usuário"
                className="relative rounded-full w-36 h-36 object-cover border-2 border-slate-900 shadow-md transform group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* Badge de Tipo de Conta */}
            <span className="px-3 py-1 mb-3 text-xs font-semibold tracking-wider uppercase text-cyan-400 bg-cyan-950/60 rounded-full border border-cyan-800/50">
              {dataUser?.typeAccount || 'Conta Padrão'}
            </span>

            {/* Nome do Usuário */}
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {dataUser?.user?.name}
            </h2>

            {/* Email */}
            <p className="mt-1 text-sm text-slate-400 font-medium">
              {dataUser?.user?.email}
            </p>
          </div>
        </div>
        <div className={`basis-2/3 h-screen border border-violet-700 ml-0 m-1 rounded-lg flex flex-col items-center justify-start gap-2`}>
          <h1>Usuário logado e essa é seu dashboard</h1>
        </div>
      </div>
      <FooterComponent />
    </>
  )
}