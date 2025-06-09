"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { TextPlugin } from "gsap/TextPlugin"
import { useRef } from "react"

import styles from "./homeScreen.module.scss"

gsap.registerPlugin(TextPlugin)

const codeLines = [
  { text: "&lt;!DOCTYPE html&gt;", indent: 0 },
  { text: '&lt;html lang="en"&gt;', indent: 0 },
  { text: "&lt;head&gt;", indent: 1 },
  { text: '&lt;meta charset="UTF-8" /&gt;', indent: 2 },
  { text: '&lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;', indent: 2 },
  { text: "&lt;title&gt;Web Development&lt;/title&gt;", indent: 2 },
  { text: '&lt;link rel="stylesheet" href="styles.css" /&gt;', indent: 2 },
  { text: "&lt;/head&gt;", indent: 1 },
  { text: "&lt;body&gt;", indent: 1 },
  { text: '&lt;div id="__next"&gt;', indent: 2 },
  { text: '&lt;main class="main"&gt;', indent: 3 },
  { text: "&lt;h1&gt;Web Development&lt;/h1&gt;", indent: 4 },
  { text: "&lt;/main&gt;", indent: 3 },
  { text: "&lt;/div&gt;", indent: 2 },
  { text: '&lt;script src="/bundle.js"&gt;&lt;/script&gt;', indent: 2 },
  { text: "&lt;/body&gt;", indent: 1 },
  { text: "&lt;/html&gt;", indent: 0 },
]

export default function HomeScreen() {
  const codeRef = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    if (!codeRef.current) return

    const lines = Array.from(codeRef.current.querySelectorAll(`.${styles.line}`))

    const textSpans = lines.map((line) => line.querySelector(`.${styles.text}`))

    textSpans.forEach((el) => {
      if (el) el.textContent = ""
    })

    const tl = gsap.timeline()

    codeLines.forEach(({ text }, i) => {
      tl.to(textSpans[i], {
        duration: text.length * 0.04,
        text,
        ease: "none",
        delay: i === 0 ? 0 : 0.2,
      })
    })

    return () => tl.kill()
  }, [])

  return (
    <div className={styles.container}>
      <div ref={codeRef} className={styles.codeBackground}>
        <pre>
          <code>
            {codeLines.map(({ indent }, index) => (
              <div key={index} className={styles.line} style={{ paddingLeft: `${indent * 2}ch` }}>
                <span className={styles.text}></span>
              </div>
            ))}
          </code>
        </pre>
      </div>

      <h1 className={styles.mainHeader}>Web Development</h1>
    </div>
  )
}
