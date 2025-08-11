import { neon } from '@netlify/neon';

export async function handler() {
  try {
    const sql = neon();
    const rows = await sql/*sql*/`
      SELECT id, child_id, child_name, date, minutes, book_id, book_title, mood, note
      FROM sessions
      ORDER BY date DESC
      LIMIT 50
    `;
    return { statusCode: 200, body: JSON.stringify(rows) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
}
