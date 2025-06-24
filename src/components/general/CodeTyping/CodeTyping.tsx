"use client"

import { useGSAP } from "@gsap/react"
import clsx from "clsx"
import gsap from "gsap"
import TextPlugin from "gsap/TextPlugin"
import { useRef } from "react"

import styles from "./CodeTyping.module.scss"

interface CodeTypingProps {
  codeLines: {
    text: string
    indent: number
  }[]
  className?: string
}

const ease = ["none", "slow(0.9,0.1,false)", "bounce.in", "bounce.out", "sine.in", "sine.inOut"]

gsap.registerPlugin(TextPlugin)

export default function CodeTyping({ codeLines, className = "" }: CodeTypingProps) {
  const codeRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!codeRef.current) return
    const lines = codeRef.current.querySelectorAll(`.${styles.line}`)

    const tl = gsap.timeline()
    codeLines
      .map((line) => {
        return {
          ...line,
          text: line.text.replace(/<\/|\/>|<|>/g, (match) => {
            const escaped = match.replace("<", "&lt;").replace(">", "&gt;")
            return `<span class="${styles.brackets}">${escaped}</span>`
          }),
          // Add styles for attributes, tag and text but animation works by span parts
          // text: line.text.replace(/(<[^>]+>)|([^<]+)/g, (match, tagPart, textPart) => {
          //   if (tagPart) {
          //     const tag = tagPart.replace(/</g, "&lt;").replace(/>/g, "&gt;") as string
          //     const isClosing = tag.startsWith("&lt;/")
          //     const isSelfClosing = tag.endsWith("/&gt;")

          //     const content = tag
          //       .replace(/^&lt;\/?/, "")
          //       .replace(/\/?&gt;$/, "")
          //       .trim()

          //     const [tagName, ...attrParts] = content.split(/\s+/)
          //     const attrs = attrParts.map((attr) => `<span class="${styles.attribute}">${attr}</span>`).join(" ")
          //     const openSymbol = isClosing ? "&lt;/" : "&lt;"
          //     const closeSymbol = isSelfClosing ? "/&gt;" : "&gt;"

          //     return (
          //       `<span class="${styles.brackets}">${openSymbol}</span>` +
          //       `<span class="${styles.tagName}">${tagName}</span>` +
          //       (attrs ? " " + attrs : "") +
          //       `<span class="${styles.brackets}">${closeSymbol}</span>`
          //     )
          //   } else if (textPart && textPart.trim()) {
          //     return `<span class="${styles.innerText}">${textPart}</span>`
          //   } else {
          //     return textPart
          //   }
          // }),
        }
      })

      .forEach(({ text }, i) => {
        tl.to(lines[i], {
          duration: text.length * 0.02,
          text,
          ease: ease[Math.floor(Math.random() * ease.length)] ?? ease[0],
          delay: i === 0 ? 0 : 0.2,
        })
      })

    return () => tl.kill()
  }, [])

  return (
    <div className={clsx(styles.container, className)} ref={codeRef} data-testid="code-container">
      <pre>
        <code>
          {codeLines.map(({ indent }, index) => (
            <div key={index} className={styles.line} style={{ paddingLeft: `${indent * 2}ch` }}></div>
          ))}
        </code>
      </pre>
    </div>
  )
}
