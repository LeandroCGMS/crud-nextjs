'use client';
import React from 'react';
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useRouter } from "next/navigation";

export default function LoginComponent() {
    const router = useRouter()
    return (
        <div className={`min-h-screen min-w-screen flex items-center justify-center gap-2`}>
            <h1>Tela de Login</h1>
            <h1>Tela de Login</h1>
            <h1>Tela de Login</h1>
            <h1>Tela de Login</h1>
        </div>
    )
}

