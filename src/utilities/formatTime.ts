export function secondsToTimeString(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  const paddedHours = hours.toString().padStart(2, '0')
  const paddedMinutes = minutes.toString().padStart(2, '0')
  const paddedSeconds = remainingSeconds.toString().padStart(2, '0')

  return hours === 0
    ? `${paddedMinutes}:${paddedSeconds}`
    : `${paddedHours}:${paddedMinutes}:${paddedSeconds}`
}
