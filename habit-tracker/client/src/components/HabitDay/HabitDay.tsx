import * as Popover from "@radix-ui/react-popover"
import clsx from "clsx"
import dayjs from "dayjs"
import { useState } from "react"
import { HabitsList } from "../HabitsList"
import { ProgressBar } from "../ProgressBar"

interface HabitDayProps {
  disabled?: boolean
  defaulCompleted?: number
  amount?: number
  date?: Date
}

export const HabitDay = ({ disabled = false, defaulCompleted, amount, date }: HabitDayProps) => {
  return disabled ? (
    <DisabledHabitDay />
  ) : (
    <EnabledHabitDay defaulCompleted={defaulCompleted} date={date} amount={amount} />
  )
}

const DisabledHabitDay = () => {
  return <div className="h-10 w-10 cursor-not-allowed rounded-lg border-2 border-zinc-800 bg-zinc-900 opacity-40" />
}

const EnabledHabitDay = ({ defaulCompleted = 0, amount = 0, date }: HabitDayProps) => {
  const [completed, setCompleted] = useState<number>(defaulCompleted)
  const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0
  const dayAndMonth = dayjs(date).format("DD/MM")
  const dayOfWeek = dayjs(date).format("dddd")

  function handleCompletedChange(completed: number) {
    setCompleted(completed)
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          "h-10 w-10 rounded-lg border-2 ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2",
          {
            "border-zinc-800 bg-zinc-900": completedPercentage === 0,
            "border-violet-700 bg-violet-900": completedPercentage > 0 && completedPercentage < 20,
            "border-violet-600 bg-violet-800": completedPercentage >= 20 && completedPercentage < 40,
            "border-violet-500 bg-violet-700": completedPercentage >= 40 && completedPercentage < 60,
            "border-violet-500 bg-violet-600": completedPercentage >= 60 && completedPercentage < 80,
            "border-violet-400 bg-violet-500": completedPercentage >= 80
          }
        )}
      />

      <Popover.Portal>
        <Popover.Content className="flex min-w-[320px] flex-col rounded-2xl bg-zinc-900 p-6">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 text-3xl font-extrabold leading-tight">{dayAndMonth}</span>

          <ProgressBar progress={completedPercentage} />
          <HabitsList onChangeComplete={handleCompletedChange} date={date!} />
          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
