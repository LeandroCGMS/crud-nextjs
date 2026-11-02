import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(request) {
	try {
		const { token } = await request.json();
		console.log('Token recebido do frontend:', token);
		// O Google valida se o token é legítimo e pertence ao seu Client ID
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
		});

		const payload = ticket.getPayload();
		const { sub: googleId, email, name, picture } = payload;

		// * VERIFICAÇÃO / CADASTRO NO BANCO DE DADOS *
		// Aqui você busca no seu banco se o usuário com esse 'email' já existe.
		// Se não existir, você cria a conta dele automaticamente.
		// Depois, gera a sessão ou o cookie de login da sua própria aplicação.

		return NextResponse.json({
			typeAccount: 'Google',
			success: true,
			user: { email, name, picture }
		});

	} catch (error) {
		console.error('Falha ao verificar o token do Google:', error);
		return NextResponse.json(
			{ error: 'Autenticação inválida.' },
			{ status: 401 }
		);
	}
}