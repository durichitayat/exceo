// TODO: create database migrations that talks to Vercel's Postgres database

import sql from "@/lib/db/db";

async function create(formData: FormData) {
  "use server";
  const comment = formData.get("comment");
  await sql`INSERT INTO comments (comment) VALUES (${comment})`;
}
