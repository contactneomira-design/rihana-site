import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const cars = await prisma.car.findMany({ orderBy: { name: 'asc' } })
    return NextResponse.json(cars)
  } catch (error) {
    console.error('GET /api/cars', error)
    return NextResponse.json({ error: 'Failed to fetch cars' }, { status: 500 })
  }
}
