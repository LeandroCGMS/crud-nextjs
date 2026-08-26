'use client';
import React from 'react';
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useRouter } from "next/navigation";

export default function CreateUserComponent() {
    const router = useRouter()
    return (
        <div>
            CREATE User Component
            <button onClick={() => {
                router.push('/delete-user')
            }}>
                Ir para outra página
            </button>
        </div>
    )
}