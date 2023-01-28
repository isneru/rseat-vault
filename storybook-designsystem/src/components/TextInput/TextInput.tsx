import { Slot } from "@radix-ui/react-slot"
import { InputHTMLAttributes, ReactNode } from "react"

/*             ROOT              */
export interface TextInputRootProps {
  children: ReactNode
}
const TextInputRoot = (props: TextInputRootProps) => {
  return (
    <div className="flex items-center gap-3 py-4 px-3 h-12 rounded bg-gray-800 w-full focus-within:ring-2 ring-cyan-300">
      {props.children}
    </div>
  )
}
TextInputRoot.displayName = "TextInput.Root"
/*             END ROOT          */

/*             ICON              */
interface TextInputIconProps {
  children: ReactNode
}
const TextInputIcon = (props: TextInputIconProps) => {
  return <Slot className="w-6 h-6 text-gray-400">{props.children}</Slot>
}
TextInputIcon.displayName = "TextInput.Icon"
/*             END ICON          */

/*             INPUT             */
interface TextInputInputProps extends InputHTMLAttributes<HTMLInputElement> {}
const TextInputInput = (props: TextInputInputProps) => {
  return (
    <input className="bg-transparent flex-1 text-gray-100 text-xs outline-none placeholder:text-gray-400" {...props} />
  )
}
TextInputInput.displayName = "TextInput.Input"
/*            END INPUT         */

export const TextInput = {
  Root: TextInputRoot,
  Input: TextInputInput,
  Icon: TextInputIcon
}
