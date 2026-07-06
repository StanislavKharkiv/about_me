"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { TextPlugin } from "gsap/TextPlugin"
import Image from "next/image"
import { useRef, useMemo } from "react"

import Accordion from "@/components/general/Accordion"
import NeonLights from "@/components/general/NeonLights"

import styles from "./AboutScreen.module.scss"
import { lines, history, summary } from "./constants"

if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin)
}

export default function AboutScreen() {
  const summaryRef = useRef<HTMLParagraphElement>(null)

  const accordionItems = useMemo(
    () =>
      history.map(({ title, content }) => ({
        title: (
          <>
            <span className={styles.accordionTitleWrapper}>
              <span>{title.position}</span>
              <span>{title.date}</span>
            </span>
            <span className={styles.accordionCompany}>{title.company}</span>
          </>
        ),
        content: (
          <ul className={styles.accordionList}>
            {content.map((text, i) => (
              <li className={styles.accordionListItem} key={i}>
                {text}
              </li>
            ))}
          </ul>
        ),
      })),
    [],
  )

  useGSAP(() => {
    if (!summaryRef.current) return

    const tl = gsap.timeline()
    tl.to(summaryRef.current, {
      text: {
        value: summary,
        delimiter: "", // remove letter
      },
      duration: 4,
      ease: "power1.in",
      delay: 1,
    })
  })

  return (
    <div className={styles.container}>
      <NeonLights linesData={lines} />
      <h1 className={styles.header}>About me</h1>
      <section className={styles.wrapper}>
        <div>
          <div className={styles.imageContainer}>
            <Image
              src="/images/me_2.png"
              alt="Cyber Portrait"
              fill
              priority
              sizes="(max-w-7xl) 350px, 100vw"
              className={styles.cyberImage}
            />
          </div>
          <p className={styles.summary} ref={summaryRef} data-testid="summary">
            HTML, CSS, JavaScript, TypeScript, Node.js, Python, PHP, SQL, Docker, Git, CI/CD, Agile, etc.
          </p>
        </div>

        <Accordion items={accordionItems} className={styles.accordion} />
      </section>
    </div>
  )
}
