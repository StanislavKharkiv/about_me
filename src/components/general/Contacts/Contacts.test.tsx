import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import { contactsData } from "./constants"
import Contacts from "./Contacts"

jest.mock("@gsap/react", () => ({
  useGSAP: (callback: () => void) => {
    callback()
  },
}))

jest.mock("gsap", () => ({
  __esModule: true,
  default: {
    timeline: () => ({
      from: jest.fn(),
    }),
  },
}))

jest.mock("./Contacts.module.scss", () => ({
  __esModule: true,
  default: {
    contacts: "contacts",
    list: "list",
    item: "item",
    iconWrap: "iconWrap",
    icon: "icon",
    title: "title",
    link: "link",
  },
}))

describe("Contacts Component", () => {
  it("renders correctly and displays all contact information from contactsData", () => {
    render(<Contacts />)

    expect(screen.getByText("Phone:")).toBeInTheDocument()
    expect(screen.getByText("Email:")).toBeInTheDocument()
    expect(screen.getByText("Location:")).toBeInTheDocument()

    expect(screen.getByText(contactsData.phone)).toBeInTheDocument()
    expect(screen.getByText(contactsData.email)).toBeInTheDocument()
    expect(screen.getByText(contactsData.location)).toBeInTheDocument()
  })

  it("contains correct interactive links matching the contactsData values", () => {
    render(<Contacts />)

    const phoneLink = screen.getByRole("link", { name: `Call me at ${contactsData.phone}` })
    expect(phoneLink).toHaveAttribute("href", `tel:${contactsData.phone}`)

    const emailLink = screen.getByRole("link", { name: `Email me at ${contactsData.email}` })
    expect(emailLink).toHaveAttribute("href", `mailto:${contactsData.email}`)

    const mapLink = screen.getByRole("link", { name: /Open my location/i })
    expect(mapLink).toHaveAttribute("href", "https://maps.app.goo.gl/5JW2GsnZYBrR7BZd6")
  })

  it("opens map link in a new tab with secure attributes", () => {
    render(<Contacts />)

    const mapLink = screen.getByRole("link", { name: /Open my location/i })

    expect(mapLink).toHaveAttribute("target", "_blank")
    expect(mapLink).toHaveAttribute("rel", "noopener noreferrer")
  })
})
