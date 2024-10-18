import { promises as fs } from "fs";

export async function getQuestions() {
  const file = await fs.readFile(
    process.cwd() + "/app/data/questions.json",
    "utf8"
  );
  const questions = JSON.parse(file);

  return questions;
}
