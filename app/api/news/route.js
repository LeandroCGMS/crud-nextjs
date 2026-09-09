import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = '478dbbea24bd41e3b4a7326d85a44f5e';
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=*&language=pt&sortBy=publishedAt&apiKey=${apiKey}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0',
        },
        // Garante que não usará cache desatualizado se preferir dados recentes
        cache: 'no-store', 
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar notícias' }, { status: 500 });
  }
}