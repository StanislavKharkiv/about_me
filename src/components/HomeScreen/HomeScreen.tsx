"use client"

import { useGSAP } from "@gsap/react"
import cslx from "clsx"
import gsap from "gsap"
import { useRef } from "react"

import CodeRedactor from "../general/CodeRedactor"
import CodeTyping from "../general/CodeTyping"

import { codeLines } from "./constants"
import styles from "./HomeScreen.module.scss"

const defaultTextTechnologies = "IT technologies"

export default function HomeScreen() {
  const header = useRef<HTMLHeadingElement>(null)
  const subHeader = useRef<HTMLHeadingElement>(null)
  const technologies = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline()
    if (!header.current) return

    const firstPart = header.current.firstChild
    const lastPart = header.current.lastChild

    tl.fromTo(firstPart, { y: "-500%", opacity: -1 }, { y: "0%", opacity: 1, duration: 2, ease: "power3.out" })
    tl.fromTo(lastPart, { y: "500%", opacity: -1 }, { y: "0%", opacity: 1, duration: 2, ease: "power3.out" }, "<")
    tl.fromTo(subHeader.current, { opacity: 0 }, { opacity: 1, duration: 2 })

    if (!technologies.current) return
    const tl2 = gsap.timeline({ repeat: -1, delay: 4, repeatRefresh: true })
    const tl2Settings = { duration: 1.6, ease: "none" }

    tl2
      .to(technologies.current, { duration: 4, opacity: 1 })
      .to(technologies.current, { text: "< HTML />, CSS", ...tl2Settings }, "+=2")
      .to(technologies.current, { text: "JavaScript, TypeScript", ...tl2Settings }, "+=2")
      .to(technologies.current, { text: "Node.js, Python, PHP", ...tl2Settings }, "+=2")
      .to(technologies.current, { text: "jQuery, React.js, Next.js", ...tl2Settings }, "+=2")
      .to(technologies.current, { text: defaultTextTechnologies, ...tl2Settings }, "+=4")
  })

  return (
    <div className={styles.container}>
      <CodeRedactor className={styles.codeStyles}>
        <CodeTyping codeLines={codeLines} />
      </CodeRedactor>
      <section className={styles.textBlock}>
        <h1 className={cslx(styles.mainHeader, styles.headers)} ref={header}>
          <span>Web</span> <span className={styles.verticalLine} /> <span>Development</span>
        </h1>
        <h2 className={cslx(styles.headers, styles.title)} ref={subHeader}>
          By Stanislav Iosyfov
        </h2>
        <div className={styles.technologies} ref={technologies}>
          {defaultTextTechnologies}
        </div>
      </section>
    </div>
  )
}
