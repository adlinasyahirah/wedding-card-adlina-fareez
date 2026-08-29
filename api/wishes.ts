import { neon } from '@neondatabase/serverless'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const MAX_NAME_LENGTH = 80
const MAX_WISH_LENGTH = 500

function loadLocalEnvironment(): void {
  if (process.env.DATABASE_URL || process.env.VERCEL_ENV === 'production') return

  try {
    process.loadEnvFile('.env.local')
  } catch {
    // Vercel deployments inject DATABASE_URL without a local env file.
  }
}

function getDatabaseUrl(): string {
  loadLocalEnvironment()

  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) throw new Error('DATABASE_URL is not configured')

  return databaseUrl
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
): Promise<void> {
  response.setHeader('Cache-Control', 'no-store')

  try {
    const sql = neon(getDatabaseUrl())

    if (request.method === 'GET') {
      const wishes = await sql`
        SELECT id, guest_name, wishes, created_at
        FROM guest_wishes
        ORDER BY created_at DESC
        LIMIT 200
      `

      response.status(200).json(wishes)
      return
    }

    if (request.method === 'POST') {
      const body = request.body

      if (!body || typeof body !== 'object') {
        response.status(400).json({ error: 'Invalid request body' })
        return
      }

      const { guestName, wishes } = body as Record<string, unknown>
      const cleanName = typeof guestName === 'string' ? guestName.trim() : ''
      const cleanWish = typeof wishes === 'string' ? wishes.trim() : ''

      if (!cleanName || !cleanWish) {
        response.status(400).json({ error: 'Nama dan ucapan diperlukan' })
        return
      }

      if (cleanName.length > MAX_NAME_LENGTH || cleanWish.length > MAX_WISH_LENGTH) {
        response.status(400).json({ error: 'Nama atau ucapan terlalu panjang' })
        return
      }

      const [createdWish] = await sql`
        INSERT INTO guest_wishes (guest_name, wishes)
        VALUES (${cleanName}, ${cleanWish})
        RETURNING id, guest_name, wishes, created_at
      `

      response.status(201).json(createdWish)
      return
    }

    response.setHeader('Allow', 'GET, POST')
    response.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error('Guest wishes API error:', error)
    response.status(500).json({ error: 'Ucapan tidak dapat diproses buat masa ini' })
  }
}
