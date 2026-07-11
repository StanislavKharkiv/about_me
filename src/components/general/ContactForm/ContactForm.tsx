"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useState, useRef } from "react"

import styles from "./ContactForm.module.scss"

export default function ContactScreen() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const containerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.from(`.${styles.header}`, { y: -30, opacity: 0, duration: 0.8 })
        .from(`.${styles.statusBadge}`, { scale: 0.8, opacity: 0, duration: 0.5 }, "-=0.4")
        .from(`.${styles.inputWrapper}`, { y: 20, opacity: 0, stagger: 0.15, duration: 0.6 }, "-=0.3")
        .from(`.${styles.submitBtn}`, { y: 15, opacity: 0, duration: 1 }, "-=0.2")
    },
    { scope: containerRef },
  )
  const handleFormInput = () => {
    if (status !== "idle") setStatus("idle")
    if (errorMessage) setErrorMessage("")
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formElement = e.currentTarget
    setStatus("loading")
    setErrorMessage("")

    const payload = {
      name: new FormData(formElement).get("name"),
      email: new FormData(formElement).get("email"),
      message: new FormData(formElement).get("message"),
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const message = response.status === 400 ? errorData.error : "CONNECTION FAILED. SERVER ERROR."

        throw new Error(message)
      }

      setStatus("success")
      formElement.reset()

      if (formRef.current) {
        gsap.fromTo(formRef.current, { opacity: 0.5 }, { opacity: 1, duration: 0.5 })
      }
    } catch (error: unknown) {
      console.error("Contact form submission failed:", error)

      const actualMessage = error instanceof Error ? error.message : "CONNECTION FAILED. RETRY TIMEOUT."

      setErrorMessage(actualMessage)
      setStatus("error")
    }
  }
  return (
    <div ref={containerRef} className={styles.container}>
      <main className={styles.wrapper}>
        <div className={styles.metaContainer}>
          <h1 className={styles.header}>Establish Connection</h1>
          <div className={styles.statusBadge}>
            <span className={styles.pulseDot}></span>
            <span className={styles.statusText}>AVAILABLE FOR HIRE</span>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          onInput={handleFormInput}
          className={styles.form}
          data-testid="contact-form"
        >
          <div className={styles.inputWrapper}>
            <input
              id="name"
              name="name"
              type="text"
              data-testid="input-name"
              required
              placeholder=" "
              className={styles.input}
              minLength={2}
              maxLength={50}
            />
            <label htmlFor="name" className={styles.label}>
              IDENT_NAME
            </label>
            <div className={styles.bar}></div>
          </div>

          <div className={styles.inputWrapper}>
            <input
              id="email"
              name="email"
              type="email"
              data-testid="input-email"
              required
              placeholder=" "
              className={styles.input}
              maxLength={254}
            />
            <label htmlFor="email" className={styles.label}>
              SECURE_EMAIL
            </label>
            <div className={styles.bar}></div>
          </div>

          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              name="message"
              data-testid="textarea-message"
              required
              placeholder=" "
              className={styles.textarea}
              minLength={10}
              maxLength={3000}
            />
            <label htmlFor="message" className={styles.label}>
              ENCRYPTED_MESSAGE
            </label>
            <div className={styles.bar}></div>
          </div>

          <button
            type="submit"
            data-testid="submit-button"
            disabled={status === "loading"}
            className={styles.submitBtn}
          >
            <span className={styles.btnText}>{status === "loading" ? "TRANSMITTING..." : "SEND PACKET"}</span>
          </button>

          {status === "success" && (
            <p className={`${styles.systemMessage} ${styles.success}`} data-testid="success-message">
              &gt; STATUS 200: MESSAGE TRANSMITTED SUCCESSFULLY.
            </p>
          )}
          {status === "error" && (
            <p className={`${styles.systemMessage} ${styles.error}`} data-testid="error-message">
              &gt; ERROR: {errorMessage.toUpperCase()}
            </p>
          )}
        </form>
      </main>
    </div>
  )
}
