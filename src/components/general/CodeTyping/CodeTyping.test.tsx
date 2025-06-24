import { render, screen, within } from "@testing-library/react"

import CodeTyping from "."

jest.mock("gsap")
jest.mock("gsap/TextPlugin")

test("HTML code typing", async () => {
  const codeLines = [
    { text: "<div>Hello</div>", indent: 1 },
    { text: "<p>World</p>", indent: 2 },
  ]

  render(<CodeTyping codeLines={codeLines} />)

  const container = screen.getByTestId("code-container")
  expect(within(container).getByRole("code")).toBeInTheDocument()
})
