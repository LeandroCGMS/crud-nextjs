import pool from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const { rows } = await pool.query('SELECT id, nome, email FROM APIAngular_customeruser');
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({error: error}, {status: 500});
    }
}