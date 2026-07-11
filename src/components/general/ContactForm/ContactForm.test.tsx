import { render, screen, fireEvent, waitFor } from "@testing-library/react"

import "@testing-library/jest-dom"
import ContactScreen from "./ContactForm"

jest.mock("gsap", () => ({
  timeline: () => ({
    from: jest.fn().mockReturnThis(),
  }),
  fromTo: jest.fn(),
}))

jest.mock("@gsap/react", () => ({
  useGSAP: (callback: () => void) => callback(),
}))

const mockFetch = jest.fn()
global.fetch = mockFetch

describe("ContactScreen Component - Robust Integration Tests", () => {
  let consoleSpy: jest.SpyInstance

  beforeEach(() => {
    jest.clearAllMocks()
    // Suppress console.error inside tests to keep the terminal clean
    // when we intentionally trigger server errors
    consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {})
  })

  afterEach(() => {
    consoleSpy.mockRestore()
  })

  // Test 1: DOM Structure Integrity
  it("should render essential form controls independently of text labels", () => {
    render(<ContactScreen />)

    expect(screen.getByTestId("input-name")).toBeInTheDocument()
    expect(screen.getByTestId("input-email")).toBeInTheDocument()
    expect(screen.getByTestId("textarea-message")).toBeInTheDocument()
    expect(screen.getByTestId("submit-button")).toBeInTheDocument()
  })

  // Test 2: Successful State Workflow
  it("should handle successful submission lifecycle and clear inputs", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
    })

    render(<ContactScreen />)

    const nameInput = screen.getByTestId("input-name")
    const emailInput = screen.getByTestId("input-email")
    const messageInput = screen.getByTestId("textarea-message")
    const submitButton = screen.getByTestId("submit-button")

    fireEvent.change(nameInput, { target: { value: "Alex" } })
    fireEvent.change(emailInput, { target: { value: "alex@example.com" } })
    fireEvent.change(messageInput, { target: { value: "Secure payload content goes here." } })

    const form = screen.getByTestId("contact-form")
    fireEvent.submit(form)

    expect(submitButton).toBeDisabled()

    await waitFor(() => {
      expect(screen.getByTestId("success-message")).toBeInTheDocument()
    })

    expect(nameInput).toHaveValue("")
    expect(emailInput).toHaveValue("")
    expect(messageInput).toHaveValue("")
    expect(submitButton).toBeEnabled()
  })

  // Test 3: API Validation Failure Workflow
  it("should display server-driven error text when API responds with 400 Status", async () => {
    const apiErrorReason = "INVALID SECURE_EMAIL PROTOCOL."

    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 400,
        json: () => Promise.resolve({ error: apiErrorReason }),
      }),
    )

    render(<ContactScreen />)

    fireEvent.change(screen.getByTestId("input-name"), { target: { value: "Alex" } })
    fireEvent.change(screen.getByTestId("input-email"), { target: { value: "alex@valid-format.com" } })
    fireEvent.change(screen.getByTestId("textarea-message"), {
      target: { value: "Secure payload content length is sufficient." },
    })

    const form = screen.getByTestId("contact-form")
    fireEvent.submit(form)

    // Using findByTestId + toHaveTextContent to satisfy ESLint
    const errorContainer = await screen.findByTestId("error-message")
    expect(errorContainer).toHaveTextContent(apiErrorReason)

    // Verifies that console.error was indeed triggered by the component catch block
    expect(consoleSpy).toHaveBeenCalled()
  })
})
