'use client';

import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

// Recomenda-se colocar a chave em variáveis de ambiente, mas você pode usar diretamente aqui se preferir.
const RECAPTCHA_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LfUDVQeAAAAAAfI1-Hf3Sz9ZT56MMr-PDQO5vaG";

export default function ReCaptchaProvider({ children }) {
    return (
        <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
            {children}
        </GoogleReCaptchaProvider>
    );
}