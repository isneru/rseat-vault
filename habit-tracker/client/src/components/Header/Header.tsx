import * as Dialog from "@radix-ui/react-dialog"
import { Plus, X } from "phosphor-react"
import { useState } from "react"
import { HabitModal } from "../HabitModal"

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  function handleOpenHabitModal() {
    setIsModalOpen(true)
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl items-center justify-between">
      <img src="/logo.svg" alt="Logo" />

      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Trigger
          onClick={handleOpenHabitModal}
          className="flex items-center gap-3 rounded-lg border border-violet-500 px-6 py-4 font-semibold ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 hover:border-violet-300">
          <Plus size={20} className="text-violet-500" />
          New Habit
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 h-screen w-screen bg-black/80" />

          <Dialog.Content className="absolute top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-zinc-900 p-10">
            <Dialog.Close className="absolute right-6 top-6 rounded-md text-zinc-400 ring-offset-zinc-900 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 hover:text-zinc-200">
              <X size={24} aria-label="Close" />
            </Dialog.Close>

            <Dialog.Title className="text-3xl font-extrabold leading-tight">New Habit</Dialog.Title>
            <HabitModal setIsModalOpen={setIsModalOpen} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
