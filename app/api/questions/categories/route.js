import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "questions.json");
  const file = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(file);

  return NextResponse.json(Object.keys(data));
}
