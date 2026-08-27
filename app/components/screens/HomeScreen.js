'use client';
import React from 'react';

import Image from "next/image";
import { useEffect, useRef, useState, useId } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useRouter } from "next/navigation";
import styles from './page.module.css';
// Importe apenas os ícones desejados das sub-bibliotecas:
// 'io5' = Ionicons v5 | 'fa6' = FontAwesome v6 | 'tb' = Tabler Icons | 'md' = Material Design
import { IoClose } from 'react-icons/io5';
import { FaXmark } from 'react-icons/fa6';
import { TbX } from 'react-icons/tb';

export default function HomeScreen() {
    const router = useRouter()
    const divMain = useId();
    const divLocalStorage = useId()
    const [showAdvise, setShowAdvise] = useState(false);

    useEffect(() => {
        // Executado apenas no navegador!
        const item = localStorage.getItem('acceptLocalStorage');
        item == null ? localStorage.setItem('acceptLocalStorage', 'false') : null
        console.warn(item)
        setShowAdvise(item === 'false'); // converte string para boolean, se necessário
    }, []);
    return (
        <GoogleReCaptchaProvider reCaptchaKey="6LfUDVQeAAAAAAfI1-Hf3Sz9ZT56MMr-PDQO5vaG">
            <div id={divMain} className={styles.container}>
                {/* <h1>Home Screen</h1> */}
                <div className={styles.flex1}>
                    <h1>algo</h1>
                </div>

                <div className={styles.flex1}>
                    <h1>outro</h1>
                </div>

                <div className={styles.flex1}>
                    <h1>eita</h1>
                </div>
                {showAdvise && <div id={divLocalStorage} className={styles.divLocalStorage}>
                    <div className={styles.right}>
                        <div className={`${styles.buttonClose} transition-all duration-150 active:scale-95 active:shadow-inner cursor-pointer`}
                            onClick={() => {
                                setShowAdvise(false)
                            }}
                        >
                            <IoClose size={24} color="#000000" />
                        </div>
                    </div>
                    <p>
                        Como prática comum dos sites, utilizamos armazenamento local.
                    </p>

                    <p>
                        Não entregamos ou expomos suas informações pessoais e de acesso a nenhuma pessoa sem autorização para tal.
                    </p>
                    <p>
                        Caso não aceite cookies e outras tecnologias de armazenamento local, não prossiga com o acesso a este site.
                    </p>
                    <div className={styles.center}>
                        <button className="
      /* Layout e Dimensionamento */
      w-fit
      px-6 py-2.5 
      
      /* Cores e Fundo */
      bg-violet-800 text-white 
      
      /* Tipografia */
      font-semibold text-sm 
      
      /* Bordas e Formato */
      rounded-full 
      
      /* Sombra e Efeitos */
      shadow-md 
      
      /* Efeitos de Hover (Ao passar o mouse) */
      hover:bg-violet-900 
      hover:shadow-lg 
      
      /* Efeitos de Active (Ao clicar) */
      active:scale-95 
      
      /* Animação suave para as mudanças */
      transition-all duration-200 
      cursor-pointer
    " onClick={() => {
                        localStorage.setItem('acceptLocalStorage', 'true')
                        console.warn(localStorage.getItem('acceptLocalStorage'))
                        setShowAdvise(false)
                    }
                            }>
                            Aceito
                        </button>
                    </div>
                </div>}
            </div>
        </GoogleReCaptchaProvider>
    )
}