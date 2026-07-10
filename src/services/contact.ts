export interface ContactPayload {
  name: unknown
  email: unknown
  message: unknown
}

export async function processContactForm(payload: ContactPayload) {
  const { name, email, message } = payload

  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return { success: false, status: 400, error: "INVALID DATA TYPES PROVIDED." }
  }

  if (name.trim().length < 2 || name.length > 50) {
    return { success: false, status: 400, error: "IDENT_NAME MUST BE BETWEEN 2 AND 50 CHARACTERS." }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email) || email.length > 254) {
    return { success: false, status: 400, error: "SECURE_EMAIL FORMAT IS INVALID." }
  }

  if (message.trim().length < 10 || message.length > 3000) {
    return { success: false, status: 400, error: "ENCRYPTED_MESSAGE MUST BE BETWEEN 10 AND 3000 CHARACTERS." }
  }

  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    const telegramText = `🔔 *New Contact Request*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n📝 *Message:* ${message}`

    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramText,
        parse_mode: "Markdown",
      }),
    })

    if (!telegramResponse.ok) {
      return { success: false, status: 500, error: "FAILED TO FORWARD TELEGRAM PACKET." }
    }

    return { success: true, status: 200 }
  } catch {
    return { success: false, status: 500, error: "INTERNAL DATALINK FAILURE." }
  }
}
