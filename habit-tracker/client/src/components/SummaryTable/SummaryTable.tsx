import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { api } from "../../lib/axios"
import { getDateRange } from "../../utils"
import { HabitDay } from "../HabitDay"

type Summary = {
  id: string
  date: string
  amount: number
  completed: number
}[]

export const SummaryTable = () => {
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"]
  const summaryDates = getDateRange()
  const minimumSummaryDatesSize = 18 * 7
  const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length
  const [summary, setSummary] = useState<Summary>([])

  useEffect(() => {
    api.get("/summary").then(response => setSummary(response.data))
  }, [])

  return (
    <div className="flex w-full">
      <div className="grid grid-flow-row grid-rows-7 gap-3">
        {weekDays.map((weekDay, idx) => (
          <div key={idx} className="flex h-10 w-10 items-center justify-center text-xl font-bold text-zinc-400">
            {weekDay}
          </div>
        ))}
      </div>

      <div className="grid grid-flow-col grid-rows-7 gap-3">
        {summary.length > 0 &&
          summaryDates.map(date => {
            const dayInSummary = summary.find(day => dayjs(date).isSame(day.date, "day"))

            return (
              <HabitDay
                amount={dayInSummary?.amount}
                defaulCompleted={dayInSummary?.completed}
                date={date}
                key={date.toDateString()}
              />
            )
          })}
        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, idx) => <HabitDay key={idx} disabled />)}
      </div>
    </div>
  )
}
