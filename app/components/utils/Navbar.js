import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Importa os ícones de Menu e Fechar (X)
import '../css/Navbar.css'; // Importa o arquivo CSS para estilização do Navbar
import { ComponentContacts } from '../screens/HeaderComponent'; // Importa o componente de contatos

export default function Navbar() {
    // Estado para controlar se o menu está aberto ou fechado
    const [menuAberto, setMenuAberto] = useState(false);

    // Função para alternar o estado do menu
    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    // Função para fechar o menu ao clicar em um link
    const fecharMenu = () => {
        setMenuAberto(false);
    };

    return (
        <header className="header">
            <div className="logo">Menu</div>

            {/* Botão do Hamburguer (só aparece em telas menores via CSS) */}
            <button
                className="hamburger-btn"
                onClick={toggleMenu}
                aria-label="Toggle Menu"
            >
                {menuAberto ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Links de Navegação */}
            <nav className={`nav-menu ${menuAberto ? 'active' : ''}`}>
                <ul>
                    <li className="nav-item bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white font-bold py-2 px-4 rounded-full cursor-pointer">Fale Conosco</li>
                    <li className="nav-item bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white font-bold py-2 px-4 rounded-full cursor-pointer">Área de Testes</li>
                    <ComponentContacts rowOrColumn="column" />
                </ul>
            </nav>
        </header>
    );
}