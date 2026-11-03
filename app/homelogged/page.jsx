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
      <div className={`h-screen min-w-screen flex flex-row items-center justify-center bg-white text-black`}>
        <div className={`basis-1/3 h-screen border border-violet-700 ml-0 m-1 rounded-lg p-2 flex flex-col items-center justify-start gap-2`}>
          <div className={`flex flex-col items-center justify-center gap-1`}>
            <img referrerPolicy="no-referrer" src={dataUser?.user?.picture?.replace(/=s\d+(-c)?$/, '=s0')} alt="Foto de Perfil do Usuário" className="rounded-full w-48 h-48" />
            <small>Tipo de Conta: {dataUser?.typeAccount}</small>
            <h2>{dataUser?.user?.name}</h2>
            <p>{dataUser?.user?.email}</p>
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