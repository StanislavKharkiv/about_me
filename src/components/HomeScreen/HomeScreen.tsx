"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"

import CodeRedactor from "../general/CodeRedactor"
import CodeTyping from "../general/CodeTyping"

import { codeLines } from "./constants"
import styles from "./HomeScreen.module.scss"

export default function HomeScreen() {
  const header = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline()
    if (!header.current) return

    const firstPart = header.current.firstChild
    const lastPart = header.current.lastChild

    tl.fromTo(firstPart, { y: "-500%", opacity: -1 }, { y: "0%", opacity: 1, duration: 2, ease: "power3.out" })
    tl.fromTo(lastPart, { y: "500%", opacity: -1 }, { y: "0%", opacity: 1, duration: 2, ease: "power3.out" }, "<")
  })

  return (
    <div className={styles.container}>
      <CodeRedactor className={styles.codeStyles}>
        <CodeTyping codeLines={codeLines} />
      </CodeRedactor>
      <section className={styles.background}>
        <h1 className={styles.mainHeader} ref={header}>
          <span>Web</span> <span className={styles.verticalLine} /> <span>Development</span>
        </h1>
      </section>
    </div>
  )
}
