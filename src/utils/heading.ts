const DIRECTIONS = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
] as const;

export function normalizeHeading(heading: number) {
  return ((heading % 360) + 360) % 360;
}

export function formatHeading(heading: number) {
  const degrees = Math.round(normalizeHeading(heading)) % 360;
  return degrees.toString().padStart(3, '0');
}

export function headingToCardinal(heading: number) {
  const index = Math.round(normalizeHeading(heading) / 22.5) % DIRECTIONS.length;
  return DIRECTIONS[index];
}
