export function getSurahShortcuts(verses: number): number[] {
  const set = new Set<number>([
    Math.round(verses * 0.5),
    Math.round(verses * 1.0),
    Math.round(verses * 0.75),
    Math.round(verses * 0.25),
  ])
  const shortcuts = Array.from(set)
    .filter(value => value > 0)
    .sort((a, b) => {
      if (a < b) {
        return -1
      } else {
        return 1
      }
    })
  return shortcuts
}
