"use client"

import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import React, { useRef } from "react"

import styles from "./ProjectDetails.module.scss"

export interface ProjectDetailsProps {
  index: number
  total: number
  name: string
  description: string
  tags: string[]
  link?: string
  repo?: string
}

const GLYPHS = "X$#@!&%?*0189"

export default function ProjectDetails({ index, total, name, description, tags, link, repo }: ProjectDetailsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  const prevDescRef = useRef(description)

  const formattedIndex = String(index + 1).padStart(2, "0")
  const formattedTotal = String(total).padStart(2, "0")

  const scrambleTag = (targetText: string, progress: number) => {
    const revealedLength = Math.floor(targetText.length * progress)
    return targetText
      .split("")
      .map((char, i) => {
        if (char === " ") return char
        if (i < revealedLength) return char
        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      })
      .join("")
  }

  useGSAP(
    () => {
      const timeline = gsap.timeline()
      const targetTitle = `[ ${name.toUpperCase()} ]`
      const glitchObj = { step: 0 }

      timeline.to(glitchObj, {
        step: 6,
        duration: 0.35,
        ease: "steps(6)",
        onUpdate: () => {
          if (!titleRef.current) return
          if (glitchObj.step < 6) {
            const randomGlitch = targetTitle
              .split("")
              .map((ch) =>
                ch === "[" || ch === "]" || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
              )
              .join("")
            titleRef.current.textContent = randomGlitch
          } else {
            titleRef.current.textContent = targetTitle
          }
        },
      })

      if (descRef.current) {
        const oldText = prevDescRef.current
        const newText = description
        const eraseObj = { length: oldText.length }
        const typeObj = { length: 0 }

        timeline.to(
          eraseObj,
          {
            length: 0,
            duration: Math.min(oldText.length * 0.012, 0.2),
            ease: "none",
            onUpdate: () => {
              if (descRef.current) {
                const currentText = oldText.slice(0, Math.ceil(eraseObj.length))
                descRef.current.textContent = currentText ? `${currentText}|` : "|"
              }
            },
          },
          "-=0.15",
        )

        timeline.to(typeObj, {
          length: newText.length,
          duration: Math.min(newText.length * 0.018, 0.5),
          ease: "none",
          onUpdate: () => {
            if (descRef.current) {
              const currentText = newText.slice(0, Math.ceil(typeObj.length))
              const isDone = Math.ceil(typeObj.length) >= newText.length
              descRef.current.textContent = isDone ? currentText : `${currentText}|`
            }
          },
          onComplete: () => {
            prevDescRef.current = newText
          },
        })
      }

      if (tagsRef.current) {
        const tagElements = Array.from(tagsRef.current.children) as HTMLElement[]

        tagElements.forEach((el, i) => {
          const targetTag = tags[i]
          if (!targetTag) return

          const tagProgress = { value: 0 }
          timeline.to(
            tagProgress,
            {
              value: 1,
              duration: 0.3,
              ease: "power1.out",
              onUpdate: () => {
                el.textContent = scrambleTag(targetTag, tagProgress.value)
              },
            },
            i === 0 ? "-=0.25" : "-=0.2",
          )
        })
      }

      if (linksRef.current?.children.length) {
        timeline.fromTo(
          linksRef.current.children,
          { opacity: 0, y: 10, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.3,
            stagger: 0.08,
            ease: "back.out(1.7)",
          },
          "-=0.2",
        )
      }
    },
    { dependencies: [index, name, description, tags, link, repo], scope: containerRef },
  )

  return (
    <div ref={containerRef} className={styles.infoContainer}>
      <div className={styles.hudHeader}>
        <div className={styles.counter}>
          <span className={styles.activeNum}>{formattedIndex}</span>
          <span className={styles.totalNum}> / {formattedTotal}</span>
        </div>
        <div className={styles.dividerLine} />
        <div ref={titleRef} className={styles.projectTag}>
          [ {name.toUpperCase()} ]
        </div>
      </div>

      <div className={styles.content}>
        <div ref={tagsRef} className={styles.tagList}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div>
          <p ref={descRef} className={styles.description}>
            {description}
          </p>
          {(link || repo) && (
            <div ref={linksRef} className={styles.actionLinks}>
              {link && (
                <a href={link} target="_blank" rel="noopener noreferrer" className={styles.btnLink}>
                  <span>LIVE DEMO</span>
                  <span className={styles.arrow}>↗</span>
                </a>
              )}

              {repo && (
                <a href={repo} target="_blank" rel="noopener noreferrer" className={styles.btnLink}>
                  <span>SOURCE CODE</span>
                  <span className={styles.arrow}>↗</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
