import * as Checkbox from "@radix-ui/react-checkbox"
import dayjs from "dayjs"
import { Check } from "phosphor-react"
import { useEffect, useState } from "react"
import { api } from "../../lib"

interface HabitsListProps {
  date: Date
  onChangeComplete: (completed: number) => void
}

interface HabitsInfo {
  possibleHabits: {
    id: string
    title: string
    createdAt: string
  }[]
  completedHabits: string[]
}

export const HabitsList = ({ date, onChangeComplete }: HabitsListProps) => {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()

  useEffect(() => {
    api
      .get("/day", {
        params: {
          date: date.toISOString()
        }
      })
      .then(response => setHabitsInfo(response.data))
  }, [])

  const hasDatePassed = dayjs(date).endOf("day").isBefore(new Date())

  async function handleToggleHabit(habitId: string) {
    await api.patch(`/habits/${habitId}/toggle`)

    const isHabitChecked = habitsInfo?.completedHabits.includes(habitId)

    let completedHabits: string[] = []

    if (isHabitChecked) {
      completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId]
    }
    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits
    })

    onChangeComplete(completedHabits.length)
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.map(habit => {
        return (
          <Checkbox.Root
            checked={habitsInfo.completedHabits.includes(habit.id)}
            key={habit.id}
            disabled={hasDatePassed}
            onCheckedChange={() => handleToggleHabit(habit.id)}
            className="group flex items-center gap-3 focus:outline-none disabled:cursor-not-allowed">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-zinc-800 bg-zinc-900 ring-offset-background transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-data-[state=checked]:border-green-500 group-data-[state=checked]:bg-green-500">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>
            <span className="text-xl font-semibold leading-tight text-white decoration-white group-data-[state=checked]:text-zinc-400 group-data-[state=checked]:line-through">
              {habit.title}
            </span>
          </Checkbox.Root>
        )
      })}
    </div>
  )
}
