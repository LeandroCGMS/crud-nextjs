'use client';

import { useCallback } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export function useGoogleToken() {
	const { executeRecaptcha } = useGoogleReCaptcha();

	// Função para gerar o token quando necessário
	const getGoogleToken = useCallback(async (action = 'submit_form') => {
		if (!executeRecaptcha) {
			console.warn('reCAPTCHA ainda não carregou/está pronto.');
			return null;
		}

		try {
			const token = await executeRecaptcha(action);
			if (!token) {
				console.error('Falha ao gerar o token do reCAPTCHA');
				return null;
			}
			return token;
		} catch (error) {
			console.error('Erro ao executar reCAPTCHA:', error);
			return null;
		}
	}, [executeRecaptcha]);

	// Retorna a função e o status de prontidão
	return {
		getGoogleToken,
		isReady: !!executeRecaptcha,
	};
}