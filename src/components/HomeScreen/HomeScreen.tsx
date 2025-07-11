"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"

import CodeRedactor from "../general/CodeRedactor"
import CodeTyping from "../general/CodeTyping"

import styles from "./HomeScreen.module.scss"

const codeLines = [
  { text: "<!DOCTYPE html>", indent: 0 },
  { text: '<html lang="en">', indent: 0 },
  { text: "<head>", indent: 1 },
  { text: '<meta charset="UTF-8" />', indent: 2 },
  { text: '<meta name="viewport" content="width=device-width" />', indent: 2 },
  { text: "<title>Web Development</title>", indent: 2 },
  { text: '<link rel="stylesheet" href="styles.css" />', indent: 2 },
  { text: "</head>", indent: 1 },
  { text: "<body>", indent: 1 },
  { text: '<div id="test">Test</div>', indent: 2 },
  { text: '<div id="__next">', indent: 2 },
  { text: '<main class="main">', indent: 3 },
  { text: "<h1>Web Development</h1>", indent: 4 },
  { text: "</main>", indent: 3 },
  { text: "</div>", indent: 2 },
  { text: '<script src="/bundle.js"></script>', indent: 2 },
  { text: "</body>", indent: 1 },
  { text: "</html>", indent: 0 },
]

export default function HomeScreen() {
  const header = useRef<HTMLHeadingElement>(null)
  useGSAP(() => {
    const tl = gsap.timeline()
    if (!header.current) return
    const firstPart = header.current.firstChild
    const lastPart = header.current.lastChild
    tl.fromTo(firstPart, { y: "-500%", opacity: -1 }, { y: "0%", opacity: 1, duration: 2, ease: "power3.out" })

    tl.fromTo(
      lastPart,
      { y: "500%", opacity: -1 },
      { y: "0%", opacity: 1, duration: 2, ease: "power3.out" },
      "<", // This starts the animation at the same time as the previous one
    )
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
