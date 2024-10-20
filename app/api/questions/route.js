import { promises as fs } from "fs";
import { NextResponse } from "next/server";

export async function GET() {
  const file = await fs.readFile(process.cwd() + "/app/questions.json", "utf8");
  const data = JSON.parse(file);
  return NextResponse.json({ ...data });
}
