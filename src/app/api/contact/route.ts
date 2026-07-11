import { NextResponse } from "next/server"

import { processContactForm } from "@/services/contact"

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const result = await processContactForm(payload)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: result.status })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: "INTERNAL DATALINK FAILURE." }, { status: 500 })
  }
}
