'use server'

import sql from '@/lib/db/db';

export async function addEmail(formData: FormData) {
  const subject = formData.get('subject') as string;
  const body = formData.get('body') as string;
  const sender = formData.get('sender') as string;

  try {
    const result = await sql`
      INSERT INTO emails (subject, body, sender)
      VALUES (${subject}, ${body}, ${sender})
      RETURNING id
    `;
    return { success: true, id: result[0].id };
  } catch (error) {
    console.error('Failed to add email:', error);
    return { success: false, error: 'Failed to add email' };
  }
}