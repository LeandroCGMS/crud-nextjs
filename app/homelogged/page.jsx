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
  const [dataUser, setDataUser] = useState(null);
  useEffect(() => {
    setDataUser(JSON.parse(sessionStorage.getItem('dataUser')))
  }, [])
  return (
    <>
      <HeaderComponent />
      <div className={`h-screen min-w-screen flex flex-row items-center justify-center gap-2 bg-black text-white`}>
        <div className={`basis-1/3 h-screen`}>
          <div>
            <img referrerPolicy="no-referrer" src={dataUser?.user?.picture} alt="Foto de Perfil do Usuário" className="rounded-full w-24 h-24" />
            <small>Tipo de Conta: {dataUser?.typeAccount}</small>
            <h2>{dataUser?.user?.name}</h2>
            <p>{dataUser?.user?.email}</p>
          </div>
        </div>
        <div className={`basis-2/3 h-screen`}>
          <h1>Usuário logado e essa é seu dashboard</h1>
        </div>
      </div>
      <FooterComponent />
    </>
  )
}