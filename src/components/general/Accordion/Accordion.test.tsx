import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import Accordion from "./Accordion"

const items = [
  {
    title: "Frontend",
    content: "React content",
  },
  {
    title: "Backend",
    content: "Node content",
  },
]

describe("Accordion", () => {
  it("renders all accordion items", () => {
    render(<Accordion items={items} />)

    expect(screen.getByRole("button", { name: "Frontend" })).toBeInTheDocument()

    expect(screen.getByRole("button", { name: "Backend" })).toBeInTheDocument()
  })

  it("renders all accordion contents", () => {
    render(<Accordion items={items} />)

    expect(screen.getByText("React content")).toBeInTheDocument()
    expect(screen.getByText("Node content")).toBeInTheDocument()
  })

  it("is collapsed by default", () => {
    render(<Accordion items={items} />)

    expect(screen.getByRole("button", { name: "Frontend" })).toHaveAttribute("aria-expanded", "false")

    expect(screen.getByRole("button", { name: "Backend" })).toHaveAttribute("aria-expanded", "false")
  })

  it("opens accordion item after click", async () => {
    const user = userEvent.setup()

    render(<Accordion items={items} />)

    const button = screen.getByRole("button", {
      name: "Frontend",
    })

    await user.click(button)

    expect(button).toHaveAttribute("aria-expanded", "true")
  })

  it("closes accordion after second click", async () => {
    const user = userEvent.setup()

    render(<Accordion items={items} />)

    const button = screen.getByRole("button", {
      name: "Frontend",
    })

    await user.click(button)
    await user.click(button)

    expect(button).toHaveAttribute("aria-expanded", "false")
  })

  it("closes previous accordion when opening another", async () => {
    const user = userEvent.setup()

    render(<Accordion items={items} />)

    const first = screen.getByRole("button", {
      name: "Frontend",
    })

    const second = screen.getByRole("button", {
      name: "Backend",
    })

    await user.click(first)
    await user.click(second)

    expect(first).toHaveAttribute("aria-expanded", "false")
    expect(second).toHaveAttribute("aria-expanded", "true")
  })
})
