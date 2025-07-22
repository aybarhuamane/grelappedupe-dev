export function getValueByScore(score: number | null): string {
  switch (score) {
    case 0:
      return 'INADECUADA'
    case 1:
      return 'ADECUADA'
    case 2:
      return 'OMITIDA'
    case 3:
      return 'NPC'
    default:
      return 'INADECUADA'
  }
}

export function getScore(value: string): number {
  switch (value) {
    case 'INADECUADA':
      return 0
    case 'ADECUADA':
      return 1
    case 'OMITIDA':
      return 2
    case 'NPC':
      return 3
    default:
      return 0
  }
}
