import { processContactForm } from "@/services/contact"

const mockFetch = jest.fn()
global.fetch = mockFetch

const originalEnv = process.env

describe("Contact Service - Core Business Logic Full Coverage", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    process.env = {
      ...originalEnv,
      TELEGRAM_BOT_TOKEN: "mock_token",
      TELEGRAM_CHAT_ID: "mock_chat_id",
    }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  // 1. Success Path
  it("should return success when data is correct and Telegram responds OK", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true })

    const payload = {
      name: "Alex",
      email: "alex@example.com",
      message: "This is a legitimate message with correct length.",
    }

    const result = await processContactForm(payload)
    expect(result).toEqual({ success: true, status: 200 })
  })

  // 2. Data Type Validation
  it("should return 400 when name is not a string", async () => {
    const payload = {
      name: 12345,
      email: "alex@example.com",
      message: "This is a legitimate message with correct length.",
    }

    const result = await processContactForm(payload)
    expect(result.status).toBe(400)
    expect(result.error).toBe("INVALID DATA TYPES PROVIDED.")
  })

  // 3. Name Validation (Too short)
  it("should return 400 when name is less than 2 characters", async () => {
    const payload = {
      name: "A",
      email: "alex@example.com",
      message: "This is a legitimate message with correct length.",
    }

    const result = await processContactForm(payload)
    expect(result.status).toBe(400)
    expect(result.error).toBe("IDENT_NAME MUST BE BETWEEN 2 AND 50 CHARACTERS.")
  })

  // 4. Name Validation (Too long)
  it("should return 400 when name is more than 50 characters", async () => {
    const payload = {
      name: "a".repeat(51),
      email: "alex@example.com",
      message: "This is a legitimate message with correct length.",
    }

    const result = await processContactForm(payload)
    expect(result.status).toBe(400)
  })

  // 5. Email Validation (Invalid Format)
  it("should return 400 when email format is invalid", async () => {
    const payload = {
      name: "Alex",
      email: "invalid-email-format",
      message: "This is a legitimate message with correct length.",
    }

    const result = await processContactForm(payload)
    expect(result.status).toBe(400)
    expect(result.error).toBe("SECURE_EMAIL FORMAT IS INVALID.")
  })

  // 6. Email Validation (Too long)
  it("should return 400 when email is more than 254 characters", async () => {
    const payload = {
      name: "Alex",
      email: `${"a".repeat(250)}@test.com`,
      message: "This is a legitimate message with correct length.",
    }

    const result = await processContactForm(payload)
    expect(result.status).toBe(400)
  })

  // 7. Message Validation (Too short)
  it("should return 400 when message is less than 10 characters", async () => {
    const payload = {
      name: "Alex",
      email: "alex@example.com",
      message: "Short",
    }

    const result = await processContactForm(payload)
    expect(result.status).toBe(400)
    expect(result.error).toBe("ENCRYPTED_MESSAGE MUST BE BETWEEN 10 AND 3000 CHARACTERS.")
  })

  // 8. Message Validation (Too long)
  it("should return 400 when message is more than 3000 characters", async () => {
    const payload = {
      name: "Alex",
      email: "alex@example.com",
      message: "a".repeat(3001),
    }

    const result = await processContactForm(payload)
    expect(result.status).toBe(400)
  })

  // 9. Telegram API Failure
  it("should return 500 when Telegram API responds with failure status", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false })

    const payload = {
      name: "Alex",
      email: "alex@example.com",
      message: "This is a legitimate message with correct length.",
    }

    const result = await processContactForm(payload)
    expect(result.status).toBe(500)
    expect(result.error).toBe("FAILED TO FORWARD TELEGRAM PACKET.")
  })

  // 10. Global Exception Catch
  it("should return 500 when fetch throws an unhandled crash", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network dead"))

    const payload = {
      name: "Alex",
      email: "alex@example.com",
      message: "This is a legitimate message with correct length.",
    }

    const result = await processContactForm(payload)
    expect(result.status).toBe(500)
    expect(result.error).toBe("INTERNAL DATALINK FAILURE.")
  })
})
