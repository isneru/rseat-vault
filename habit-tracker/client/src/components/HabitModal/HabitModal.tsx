import * as Checkbox from "@radix-ui/react-checkbox"
import { Check } from "phosphor-react"
import { Dispatch, FormEvent, SetStateAction, useContext, useState } from "react"
import { api } from "../../lib"
import { ToastContext } from "../../utils"

interface HabitModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

export const HabitModal = ({ setIsModalOpen }: HabitModalProps) => {
  const allWeekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const [title, setTitle] = useState("")
  const [weekDays, setWeekDays] = useState<number[]>([])
  const { toast } = useContext(ToastContext)
  async function handleCreateNewHabit(e: FormEvent) {
    e.preventDefault()

    if (!title || weekDays.length === 0) {
      return
    }

    await api.post("/habits", {
      title,
      weekDays
    })

    setTitle("")
    setWeekDays([])
    setIsModalOpen(false)
    toast("Habit created successfully!")
  }

  function handleToggleWeekday(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemovedItem = weekDays.filter(day => day !== weekDay)
      setWeekDays(weekDaysWithRemovedItem)
    } else {
      const weekDaysWithAddedItem = [...weekDays, weekDay]
      setWeekDays(weekDaysWithAddedItem)
    }
  }

  return (
    <form onSubmit={handleCreateNewHabit} className="mt-6 flex w-full flex-col">
      <label className="font-semibold leading-tight" htmlFor="title">
        Give your new habit a name!
      </label>
      <input
        className="mt-3 rounded-lg bg-zinc-800 p-4 text-white ring-offset-zinc-900 transition-colors placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2"
        autoFocus
        id="title"
        value={title}
        onChange={e => setTitle(e.currentTarget.value)}
        placeholder="ie: Workout, Drink water..."
      />

      <label className="mt-4 font-semibold leading-tight" htmlFor="">
        Weekly Occurrence
      </label>

      <div className="mt-3 flex flex-col gap-2">
        {allWeekDays.map((day, idx) => (
          <Checkbox.Root
            key={day}
            checked={weekDays.includes(idx)}
            className="group flex items-center gap-3 focus:outline-none"
            onCheckedChange={() => handleToggleWeekday(idx)}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-zinc-800 bg-zinc-900 ring-offset-zinc-900 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-data-[state=checked]:border-green-500 group-data-[state=checked]:bg-green-500">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>
            <span className="leading-tight text-white">{day}</span>
          </Checkbox.Root>
        ))}
      </div>
      <button
        type="submit"
        className="mt-6 flex items-center justify-center gap-3 rounded-lg bg-green-600 p-4 font-semibold ring-offset-zinc-900 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 hover:bg-green-500">
        <Check size={20} weight="bold" /> Confirm
      </button>
    </form>
  )
}
