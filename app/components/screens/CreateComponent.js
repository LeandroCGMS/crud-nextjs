"use client";
import React from 'react';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useRouter } from "next/navigation";
import styles from './page.module.css';

export default function CreateComponent() {
    const router = useRouter();
    async function hideDivMarketing() {
        setShowDivMarketing(false)
    }
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            // Mensagem padrão para a maioria dos navegadores (alguns podem ignorar)
            e.preventDefault();
            // Necessário para Chrome e alguns outros navegadores
            e.returnValue = '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        // Limpeza: remove o event listener quando o componente é desmontado
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []); // O array vazio garante que o efeito só rode uma vez ao montar
    return (
        <GoogleReCaptchaProvider reCaptchaKey="6LfUDVQeAAAAAAfI1-Hf3Sz9ZT56MMr-PDQO5vaG">
            <div>
                <h1>Create Component</h1>
                <button onClick={goToAnotherPage}>
            Ir para outra página
        </button>
            </div>
        </GoogleReCaptchaProvider>
    );
}

async function redirectToHome() {
    const location = window.location.host.split(/[\.]/gmi)
    const length = location.length
    const protocol = window.location.protocol
    if (window != undefined) {
        window.location.href = `${protocol}//${location[length - 2]}.${location[length - 1]}`
    }
}
