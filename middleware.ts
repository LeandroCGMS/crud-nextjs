import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateGoogleToken } from './app/api/utils/functions';


export async function middleware(request: NextRequest) {
  // O método .get() busca o cabeçalho de forma case-insensitive
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