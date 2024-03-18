//export const dynamic = 'force-dynamic' // defaults to auto

import { Pool, QueryResultRow } from 'pg'

//const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'

const connectionString = process.env.POSTGRES_URL

// Creates a global connection pool
const pool = new Pool({
connectionString
})

export async function POST(req: Request) {
  const query = 'UPDATE clickcounter SET clicks = clicks + 1 RETURNING clicks';
  const { rows } = await pool.query(query);

  const clicks = rows[0].clicks
  return Response.json({
    clicks: clicks
  });
}

export async function GET(req: Request) {
  const query = 'SELECT clicks FROM clickcounter';
  const { rows } = await pool.query(query);

  const clicks = rows[0].clicks
  return Response.json({
    clicks: clicks
  });
}
