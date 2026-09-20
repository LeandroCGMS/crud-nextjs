import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateGoogleToken } from './app/api/utils/functions';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Ignora a verificação para a rota /api/news (e subrotas de /api/news/)
  if (pathname === '/api/news' || pathname.startsWith('/api/news/')) {
    return NextResponse.next();
  }

  // 2. Executa a validação normal do googleToken para as demais rotas
  const googleToken = request.headers.get('googleToken');
  console.warn('Middleware: googleToken recebido:', googleToken);

  const validation = await validateGoogleToken(googleToken);

  if (!googleToken || !validation.success) {
    return NextResponse.json(
      { error: 'Access denied; check the credentials sent in the header.' },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api', '/api/:path*'],
};