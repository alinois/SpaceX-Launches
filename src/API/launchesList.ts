import type { Launch } from '../types'

export async function fetchLaunches2020(): Promise<Launch[]> {
  const res = await fetch('https://api.spacexdata.com/v3/launches?launch_year=2020');
  if (!res.ok) {
    throw new Error('Ошибка при загрузке');
  }
  const data: Launch[] = await res.json();
  return data;
}