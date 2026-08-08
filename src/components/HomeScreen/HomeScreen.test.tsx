import { render, screen } from "@testing-library/react"

import HomeScreen from "."

jest.mock("gsap")
jest.mock("gsap/TextPlugin")

describe("HomeScreen", () => {
  it("renders main header with correct text", () => {
    render(<HomeScreen />)

    const header = screen.getByRole("heading", { level: 1 })
    expect(header).toBeInTheDocument()
    expect(header.textContent?.trim().length).toBeGreaterThan(0)

    const subHeader = screen.getByRole("heading", { level: 2 })
    expect(subHeader).toBeInTheDocument()
    expect(header.textContent?.trim().length).toBeGreaterThan(0)
  })
})
