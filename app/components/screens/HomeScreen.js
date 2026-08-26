'use client';
import React from 'react';

import Image from "next/image";
import { useEffect, useRef, useState, useId } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useRouter } from "next/navigation";
import styles from './page.module.css';

export default function HomeScreen() {
    const router = useRouter()
    const divMain = useId();
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
            </div>
        </GoogleReCaptchaProvider>
    )
}