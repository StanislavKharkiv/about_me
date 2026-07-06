import { render, screen } from "@testing-library/react"

import AboutScreen from "./AboutScreen"
import { history } from "./constants"

beforeAll(() => {
  const originalWarn = console.warn
  console.warn = (...args) => {
    if (args[0]?.includes?.("Image with src") && args[0]?.includes?.("fill")) return
    originalWarn(...args)
  }
})

jest.mock("@gsap/react", () => ({
  useGSAP: (callback: () => void) => {
    callback()
  },
}))

jest.mock("gsap", () => {
  const mockTimeline = {
    to: jest.fn().mockImplementation((target, vars) => {
      if (target && vars?.text?.value) {
        target.textContent = vars.text.value
      }
      return mockTimeline
    }),
  }
  return {
    exportRoot: () => mockTimeline,
    timeline: () => mockTimeline,
    to: jest.fn(),
    registerPlugin: jest.fn(),
  }
})

jest.mock("@/components/general/NeonLights", () => {
  return function DummyNeonLights() {
    return <div data-testid="neon-lights" />
  }
})

jest.mock("@/components/general/Accordion", () => {
  return function DummyAccordion({ items }: { items: Record<string, string>[] }) {
    return (
      <div data-testid="accordion">
        {items.map((item, index) => (
          <div key={index} data-testid="accordion-item">
            {item.title}
          </div>
        ))}
      </div>
    )
  }
})

describe("AboutScreen Component", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should render static elements correctly", () => {
    render(<AboutScreen />)

    expect(screen.getByRole("heading", { name: /about me/i })).toBeInTheDocument()
    expect(screen.getByAltText("Cyber Portrait")).toBeInTheDocument()
    expect(screen.getByTestId("neon-lights")).toBeInTheDocument()
  })

  it("should instantly execute animation and display the final summary text from constants", () => {
    render(<AboutScreen />)

    const summary = screen.getByTestId("summary")
    expect(summary).toHaveTextContent(/\S+/)
  })

  it("should render all history items from constants inside the Accordion", () => {
    render(<AboutScreen />)

    const accordionItems = screen.getAllByTestId("accordion-item")

    accordionItems.forEach((item, index) => {
      expect(item).toHaveTextContent(history[index].title.position)
      expect(item).toHaveTextContent(history[index].title.company)
    })
  })
})
