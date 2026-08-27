'use client';
import React from 'react';

import Image from "next/image";
import { useEffect, useRef, useState, useId } from "react";
// import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import ReCaptchaProvider from './GoogleRecaptchaProvider'
import { useRouter } from "next/navigation";
import styles from './page.module.css';
// Importe apenas os ícones desejados das sub-bibliotecas:
// 'io5' = Ionicons v5 | 'fa6' = FontAwesome v6 | 'tb' = Tabler Icons | 'md' = Material Design
import { IoClose } from 'react-icons/io5';
import { FaXmark } from 'react-icons/fa6';
import { TbX } from 'react-icons/tb';
import meuLogo from '@/assets/images/my-logo.jpg'; // ou da pasta de assets
// Ícone que remete a aplicativo/desenvolvimento mobile (Tabler Icons)
import { TbDeviceMobileCode } from 'react-icons/tb';
import Link from 'next/link';

export default function HomeScreen() {
    const router = useRouter()
    const divMain = useId();
    const divLocalStorage = useId()
    const [showAdvise, setShowAdvise] = useState(false);
    const [showLogoFullScreen, setShowLogoFullScreen] = useState(false)

    useEffect(() => {
        // Executado apenas no navegador!
        const item = localStorage.getItem('acceptLocalStorage');
        item == null ? localStorage.setItem('acceptLocalStorage', 'false') : null
        console.warn(item)
        setShowAdvise(item === 'false'); // converte string para boolean, se necessário
    }, []);
    return (
        <ReCaptchaProvider>
            <div id={divMain} className={styles.container}>
                {/* <h1>Home Screen</h1> */}
                <div className={`${styles.flex1} color-black bg-violet-700 rounded-lg p-[2em] m-2`}>
                    <div className={`${styles.rounded} cursor-pointer`}
                        onClick={() => { setShowLogoFullScreen(true) }}> {/* fixed inset-0 */}
                        <Image
                            src={meuLogo}
                            alt="Logo da Empresa"
                            width={150}  /* Obrigatório informar width e height para imagens da pasta public */
                            height={150}
                        />
                    </div>
                    {showLogoFullScreen && <div className={`cursor-pointer fixed inset-0 p-[2em] border-white border-[0.1em] flex flex-col items-center justify-center text-center bg-violet-700`} onClick={() => { setShowLogoFullScreen(false) }}>
                        <h1 className={`text-black`}>Clique ou toque na tela para fechar essa visualização.</h1>
                        <small>Se estiver no celular, melhor girar o celular, com giro de tela ativado, para exibir com largura maior.</small>
                        <div className={`w-[100%] h-[100%] relative`}>
                            <Image
                                className={`w-[100%] h-[100%] relative rounded-lg`}
                                src={meuLogo}
                                alt="Logo da Empresa"
                            // width={600}
                            // height={600}
                            />
                        </div>
                    </div>}
                    <h1 className={`text-black bg-violet mt-1`}>Leandro Santos de Carvalho</h1>
                    <h2 className={`text-black bg-violet`}>Corretor de Imóveis - CRECI/MS 18329</h2>
                    <h2 className={`text-black bg-violet text-center`}>Programador Web e Mobile, Full Stack / Full Cycle</h2>
                    <Link
                        href="https://bit.ly/43xMhI1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block" /* Garante o tamanho correto do container */>
                        <button
                            className="
        /* Layout e Alinhamento */
        group relative inline-flex items-center gap-3
        w-fit px-6 py-3.5
        
        /* Cores e Degradê */
        bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600
        hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500
        text-white
        
        /* Tipografia */
        font-medium text-sm sm:text-base tracking-wide
        
        /* Formato e Bordas */
        rounded-2xl
        border border-violet-400/30
        
        /* Sombras estilizadas */
        shadow-lg shadow-violet-500/25
        hover:shadow-xl hover:shadow-violet-500/40
        
        /* Efeitos de Transição e Clique Tátil */
        transition-all duration-200 ease-in-out
        active:scale-95
        
        /* Cursor */
        cursor-pointer
      "
                        >
                            {/* Container do Ícone com destaque visual */}
                            <span className="
        flex items-center justify-center 
        p-2 bg-white/10 rounded-xl 
        backdrop-blur-sm 
        group-hover:bg-white/20 
        transition-colors duration-200
      ">
                                <TbDeviceMobileCode className="w-6 h-6 text-violet-200 group-hover:text-white transition-colors" />
                            </span>

                            {/* Texto do Botão */}
                            <span>Uma base de um dos nossos aplicativos móveis</span>
                        </button>
                    </Link>
                </div>

                <div className={`${styles.flex1} border border-violet-700 rounded-lg p-[1em] m-2 mt-0 border-4 bg-white text-black overflow-scroll`}>
                    <p className={styles.p}>
                        Você contará com um servidor e site protegido contra ataques de força bruta, negação de serviço (DDOS), SQL Injection, entre outras ameaças. Também contará com certificado SSL de criptografia grátis ou pago dependendo do seu objetivo. Desenvolvemos sites, com responsividade, visando, em primeiro lugar, os celulares (mobile first). Você terá a sua disposição nossas habilidades em SEO, Cloud Computing, WebSockets, Gateway de Pagamentos, conceito SPA, APIs, SOAs, arquitetura REST, proxy reverso – com NGINX – containerização – com docker – e clusters – com Kubernetes. No frontend, CSS Flexible Box Layout, Grid Layout, além de frameworks CSS. A escolha de todas as ferramentas ou parte delas depende do seu objetivo e condições.
                    </p>
                    <p className={styles.p}>
                        Visamos, sempre, as melhores práticas, como código limpo e as melhores ferramentas (clean code / best practices), as mais eficientes e eficazes, prezando pelo o que há de mais atual em desenvolvimento de software. Um exemplo é usar ferramentas de plataformas colaborativas que atualizam o código em seu servidor, a cada implementação, ao invés de acesso FTP ou mesmo SSH manualmente.
                    </p>
                    <div className={`justify-start w-[100%]`}>
                        <p className={`${styles.p}`}>
                            Me peça um orçamento sem compromisso.
                        </p>
                    </div>
                    <div className="w-full max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow-lg">
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/NFKLWOIu7G8"
                            title="Vídeo do YouTube"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
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
        </ReCaptchaProvider>
    )
}