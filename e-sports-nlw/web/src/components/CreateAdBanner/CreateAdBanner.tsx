import { MagnifyingGlassPlus } from "phosphor-react"
import * as Dialog from "@radix-ui/react-dialog"

export const CreateAdBanner = () => {
  return (
    <div className="bg-[#2A2634] border-gradient-nlw self-stretch mt-8 px-8 py-6 rounded-lg flex justify-between items-center">
      <div>
        <strong className="text-2xl text-white font-black block">Can't find your duo?</strong>
        <span className="text-zinc-400 block">Post an ad to find new players!</span>
      </div>
      <Dialog.Trigger className="px-4 py-3 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3">
        <MagnifyingGlassPlus size={24} /> Post Advertisement
      </Dialog.Trigger>
    </div>
  )
}
