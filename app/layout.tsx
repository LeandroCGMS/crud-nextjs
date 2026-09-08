import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Full Cycle e Corretor de Imóveis, Leandro S. Carvalho, CRECI-MS 18329",
  description: "Aqui, meu portfólio de desenvolvedor full cycle, com projetos de front-end, back-end e mobile. Além disso, também atuo como corretor de imóveis, oferecendo serviços de compra, venda e aluguel de imóveis.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      style={{ width: 'fit-content' }}
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} w-x-full h-full antialiased fit-content`}
    >
      <body className="flex flex-col w-full max-w-full overflow-x-hidden">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
