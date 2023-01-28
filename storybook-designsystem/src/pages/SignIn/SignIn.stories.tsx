import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { userEvent, waitFor, within } from "@storybook/testing-library"
import { rest } from "msw"
import { SignIn } from "./SignIn"

export default {
  title: "Pages/Sign in",
  component: SignIn,
  args: {},
  argTypes: {},
  parameters: {
    msw: {
      handlers: [
        rest.post("/sessions", (req, res, ctx) => {
          return res(
            ctx.json({
              message: "Logged in"
            })
          )
        })
      ]
    }
  }
} as Meta

export const Default: StoryObj = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    userEvent.type(canvas.getByPlaceholderText("johndoe@gmail.com"), "isneru@gmail.com")
    userEvent.type(canvas.getByPlaceholderText(""), "isnerusupersecretpassword")

    userEvent.click(canvas.getByRole("button"))

    await waitFor(() => {
      expect(canvas.getByText("Login successful")).toBeInTheDocument()
    })
  }
}
