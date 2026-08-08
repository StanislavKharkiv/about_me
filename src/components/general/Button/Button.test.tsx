// for access to icons inside Button disable these rules
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen } from "@testing-library/react"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import Button from "./Button"

describe("Button", () => {
  describe("button", () => {
    it("renders a button element by default", () => {
      render(<Button>Click me</Button>)

      const button = screen.getByRole("button", { name: "Click me" })

      expect(button).toBeInTheDocument()
      expect(button.tagName).toBe("BUTTON")
    })

    it("renders button children", () => {
      render(<Button>Submit</Button>)

      expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument()
    })

    it("passes native button props", () => {
      render(
        <Button type="submit" disabled aria-label="Submit form">
          Submit
        </Button>,
      )

      const button = screen.getByRole("button", { name: "Submit form" })

      expect(button).toHaveAttribute("type", "submit")
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute("aria-label", "Submit form")
    })

    it("applies custom className", () => {
      render(<Button className="custom-button">Click me</Button>)

      expect(screen.getByRole("button", { name: "Click me" })).toHaveClass("custom-button")
    })
  })

  describe("anchor", () => {
    it("renders an anchor when as='a'", () => {
      render(
        <Button as="a" href="https://example.com">
          External link
        </Button>,
      )

      const link = screen.getByRole("link", { name: "External link" })

      expect(link).toBeInTheDocument()
      expect(link.tagName).toBe("A")
      expect(link).toHaveAttribute("href", "https://example.com")
    })

    it("passes anchor props", () => {
      render(
        <Button as="a" href="https://example.com" target="_blank" rel="noopener noreferrer">
          Open
        </Button>,
      )

      const link = screen.getByRole("link", { name: "Open" })

      expect(link).toHaveAttribute("href", "https://example.com")
      expect(link).toHaveAttribute("target", "_blank")
      expect(link).toHaveAttribute("rel", "noopener noreferrer")
    })

    it("applies custom className to anchor", () => {
      render(
        <Button as="a" href="/about" className="custom-link">
          About
        </Button>,
      )

      expect(screen.getByRole("link", { name: "About" })).toHaveClass("custom-link")
    })
  })

  describe("Next.js Link", () => {
    it("renders a Next.js Link when as='link'", () => {
      render(
        <Button as="link" href="/projects">
          Projects
        </Button>,
      )

      const link = screen.getByRole("link", { name: "Projects" })

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute("href", "/projects")
    })

    it("passes Link props", () => {
      render(
        <Button as="link" href="/projects" target="_blank">
          Projects
        </Button>,
      )

      const link = screen.getByRole("link", { name: "Projects" })

      expect(link).toHaveAttribute("href", "/projects")
      expect(link).toHaveAttribute("target", "_blank")
    })

    it("applies custom className to Next.js Link", () => {
      render(
        <Button as="link" href="/projects" className="custom-link">
          Projects
        </Button>,
      )

      expect(screen.getByRole("link", { name: "Projects" })).toHaveClass("custom-link")
    })
  })

  describe("icons", () => {
    it("renders no icon when no icon props are provided", () => {
      const { container } = render(<Button>Click me</Button>)

      expect(container.querySelectorAll("svg")).toHaveLength(0)
    })

    it("renders the default icon", () => {
      const { container } = render(<Button icon={ArrowRight}>Click me</Button>)

      const icons = container.querySelectorAll("svg")

      expect(icons).toHaveLength(1)
      expect(icons[0]).toHaveAttribute("aria-hidden", "true")
    })

    it("renders only the hover icon when no default icon is provided", () => {
      const { container } = render(<Button hoverIcon={ArrowUpRight}>Click me</Button>)

      const icons = container.querySelectorAll("svg")

      expect(icons).toHaveLength(1)
      expect(icons[0]).toHaveAttribute("aria-hidden", "true")
    })

    it("renders both icons when icon and hoverIcon are provided", () => {
      const { container } = render(
        <Button icon={ArrowRight} hoverIcon={ArrowUpRight}>
          Click me
        </Button>,
      )

      expect(container.querySelectorAll("svg")).toHaveLength(2)
    })

    it("marks both icons as aria-hidden", () => {
      const { container } = render(
        <Button icon={ArrowRight} hoverIcon={ArrowUpRight}>
          Click me
        </Button>,
      )

      const icons = container.querySelectorAll("svg")

      expect(icons).toHaveLength(2)

      icons.forEach((icon) => {
        expect(icon).toHaveAttribute("aria-hidden", "true")
      })
    })

    it("passes iconProps to the icon", () => {
      const { container } = render(
        <Button
          icon={ArrowRight}
          iconProps={{
            size: 32,
            strokeWidth: 3,
          }}
        >
          Click me
        </Button>,
      )

      const icon = container.querySelector("svg")

      expect(icon).toHaveAttribute("width", "32")
      expect(icon).toHaveAttribute("height", "32")
      expect(icon).toHaveAttribute("stroke-width", "3")
    })
  })

  describe("icon position", () => {
    it("renders the icon after the text by default", () => {
      const { container } = render(<Button icon={ArrowRight}>Click me</Button>)

      const button = screen.getByRole("button", { name: "Click me" })
      const icon = container.querySelector("svg")

      expect(button).toBeInTheDocument()
      expect(icon).toBeInTheDocument()
      expect(button.lastChild).toBe(icon)
    })

    it("renders the icon before the text when iconPosition='left'", () => {
      const { container } = render(
        <Button icon={ArrowRight} iconPosition="left">
          Click me
        </Button>,
      )

      const button = screen.getByRole("button", { name: "Click me" })
      const icon = container.querySelector("svg")

      expect(button).toBeInTheDocument()
      expect(icon).toBeInTheDocument()
      expect(button.firstChild).toBe(icon)
    })
  })

  describe("hover icons", () => {
    it("wraps both icons in an aria-hidden wrapper", () => {
      const { container } = render(
        <Button icon={ArrowRight} hoverIcon={ArrowUpRight}>
          Click me
        </Button>,
      )

      const icons = container.querySelectorAll("svg")

      expect(icons).toHaveLength(2)
      const wrapper = icons[0].parentElement

      expect(wrapper).toHaveAttribute("aria-hidden", "true")
      expect(wrapper).toContainElement(icons[0])
      expect(wrapper).toContainElement(icons[1])
    })

    it("renders the default and hover icons inside the wrapper", () => {
      const { container } = render(
        <Button icon={ArrowRight} hoverIcon={ArrowUpRight}>
          Click me
        </Button>,
      )

      const icons = container.querySelectorAll("svg")

      expect(icons).toHaveLength(2)
      expect(icons[0].parentElement).toBe(icons[1].parentElement)
    })
  })
})
