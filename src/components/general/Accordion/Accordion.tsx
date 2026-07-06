"use client"

import clsx from "clsx"
import { useState, ReactNode } from "react"

import styles from "./Accordion.module.scss"

type AccordionNode = Exclude<ReactNode, null | undefined | boolean>

interface AccordionProps {
  items: { title: AccordionNode; content: AccordionNode }[]
  className?: string
}

export default function Accordion({ items, className = "" }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleAccordionClick = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section className={className}>
      {items.map((item, i) => (
        <div className={styles.accordionItemWrapper} key={i}>
          <button
            className={styles.accordionTitle}
            onClick={() => handleAccordionClick(i)}
            type="button"
            id={`accordion-button-${i}`}
            aria-expanded={openIndex === i}
            aria-controls={`accordion-panel-${i}`}
          >
            {item.title}
          </button>
          <div
            className={clsx(styles.accordionContent, openIndex !== i && styles.accordionContentClosed)}
            id={`accordion-panel-${i}`}
            aria-labelledby={`accordion-button-${i}`}
            aria-hidden={openIndex !== i}
          >
            <div className={styles.accordionInner}>{item.content}</div>
          </div>
        </div>
      ))}
    </section>
  )
}
