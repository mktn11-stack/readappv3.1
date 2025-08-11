import { neon } from '@netlify/neon';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try {
    const body = JSON.parse(event.body || '{}');
    const sql = neon();
    const [row] = await sql/*sql*/`
      INSERT INTO sessions (id, child_id, child_name, date, minutes, book_id, book_title, mood, note)
      VALUES (${body.id}, ${body.childId}, ${body.childName}, ${body.date}, ${body.minutes},
              ${body.bookId}, ${body.bookTitle}, ${body.mood}, ${body.note})
      RETURNING *
    `;
    return { statusCode: 200, body: JSON.stringify(row) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
}
