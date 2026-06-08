import { Exercise } from "../types/exercise";

const BASE_URL = "https://exercisedb.p.rapidapi.com";

const headers = {
  "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY ?? "",
  "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
};

export async function fetchBodyParts(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/exercises/bodyPartList`, { headers });
  if (!res.ok) throw new Error(`Failed to fetch body parts: ${res.status}`);
  return res.json();
}

export async function fetchExercisesByBodyPart(
  bodyPart: string,
  limit = 20
): Promise<Exercise[]> {
  const res = await fetch(
    `${BASE_URL}/exercises/bodyPart/${encodeURIComponent(bodyPart)}?limit=${limit}&offset=0`,
    { headers }
  );
  if (!res.ok) throw new Error(`Failed to fetch exercises: ${res.status}`);
  return res.json();
}
