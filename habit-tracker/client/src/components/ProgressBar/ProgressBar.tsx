interface ProgressBarProps {
  progress: number
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="mt-4 h-3 w-full rounded-xl bg-zinc-700">
      <div
        role="progressbar"
        aria-label="Progress of this day's completed habits"
        aria-valuenow={progress}
        style={{ width: `${progress}%` }}
        className="h-3 rounded-xl bg-violet-600 transition-all"></div>
    </div>
  )
}
