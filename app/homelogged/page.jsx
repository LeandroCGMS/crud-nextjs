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
\nAs sessões autenticadas duram enquanto esta aba ou esta janela estiver aberta. Faça login para acessar seu espaço de usuário novamente.`,
        { duration: 14000, position: 'top-center' });
      router.push('/login')
    }
    setDataUser(currentUser);
  }, [])
  return (
    <>
      <HeaderComponent />
      <div className={`h-screen min-w-screen flex flex-row items-center justify-center bg-white text-black`}>
        <aside className="basis-1/3 h-full bg-slate-900/80 backdrop-blur-xl border-r border-slate-800 p-6 flex flex-col justify-between">
          {/* Perfil do Usuário */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
              <img
                referrerPolicy="no-referrer"
                src={dataUser?.user?.picture?.replace(/=s\d+(-c)?$/, '=s0') || 'https://via.placeholder.com/150'}
                alt="Foto de Perfil"
                className="relative w-28 h-28 rounded-full object-cover border-2 border-slate-900 shadow-xl transform group-hover:scale-105 transition duration-300"
              />
            </div>

            <span className="px-3 py-1 mb-2 text-xs font-semibold tracking-wider text-cyan-400 bg-cyan-950/60 rounded-full border border-cyan-800/50">
              {'Tipo de Conta: ' + dataUser?.typeAccount || 'Conta Padrão'}
            </span>

            <h2 className="text-xl font-bold text-white tracking-tight">
              {dataUser?.user?.name || 'Leandro Santos'}
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              {dataUser?.user?.email || 'leandrocgms2015@gmail.com'}
            </p>

            {/* Status On-line */}
            <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Sessão Ativa
            </div>
          </div>

          {/* Navegação Secundária */}
          <nav className="mt-8 space-y-2">
            <a href="#overview" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-cyan-400 bg-slate-800/60 border border-slate-700/50 rounded-xl transition">
              <span>📊</span> Visão Geral
            </a>
            <a href="#analytics" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/40 rounded-xl transition">
              <span>📈</span> Métricas
            </a>
            <a href="#settings" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/40 rounded-xl transition">
              <span>⚙️</span> Configurações
            </a>
          </nav>

          {/* Rodapé da Sidebar */}
          <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
            <p>© 2026 Leandro Carvalho</p>
          </div>
        </aside>

        <main className="basis-2/3  h-full bg-slate-950 p-8 overflow-y-auto space-y-6">
          {/* Cabeçalho */}
          <div className="flex justify-between items-center pb-4 border-b border-slate-800">
            <div>
              <h1 className="text-2xl font-bold text-white">Painel de Controle</h1>
              <p className="text-sm text-slate-400">Bem-vindo de volta! Aqui está o resumo de hoje.</p>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-sm rounded-xl shadow-lg shadow-cyan-500/20 transition">
              + Novo Projeto
            </button>
          </div>

          {/* Cards de Estatísticas rápidos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Usuários Ativos</p>
              <h3 className="text-2xl font-bold text-white mt-1">1,248</h3>
              <span className="text-xs text-emerald-400 font-medium">↑ +12% este mês</span>
            </div>

            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Requisições API</p>
              <h3 className="text-2xl font-bold text-white mt-1">84.2k</h3>
              <span className="text-xs text-emerald-400 font-medium">↑ +5% nas últimas 24h</span>
            </div>

            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tempo Médio</p>
              <h3 className="text-2xl font-bold text-white mt-1">142 ms</h3>
              <span className="text-xs text-cyan-400 font-medium">⚡ Resposta excelente</span>
            </div>
          </div>

          {/* Área Principal / Gráfico ou Tabela */}
          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-white">Atividade Recente</h2>
              <span className="text-xs text-slate-400">Atualizado agora</span>
            </div>
            <div className="h-64 flex items-center justify-center border border-dashed border-slate-800 rounded-xl text-slate-500 text-sm">
              [ Área reservada para gráficos Chart.js / Recharts ]
            </div>
          </div>
        </main>
      </div>
      <FooterComponent />
    </>
  )
}