export async function validateGoogleToken(googleToken) {
    try {
        // // 3. Valida o ID Token junto ao servidor do Google
        // const googleResponse = await fetch(
        //     `https://oauth2.googleapis.com/tokeninfo?id_token=${googleToken}`
        // );

        const googleResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded" // ⚠️ NÃO use JSON!
            },
            body: new URLSearchParams({
                secret: process.env.RECAPTCHA_SECRET_KEY,   // ← Secret Key, NÃO a Site Key
                response: googleToken // ← token vindo do frontend
            })
        })

        // Se o Google responder com status diferente de 200 (token expirado, inválido ou adulterado)
        console.warn('Google Response:\n', googleResponse);
        if (!googleResponse.ok) {
            throw new Error('Acesso negado: googleToken inválido ou expirado.');
        }

        const tokenPayload = await googleResponse.json();
        return { success: true, payload: tokenPayload };
    } catch (error) {
        return { success: false, error: error }
    }
}