"use client"

import clsx from "clsx"
import { ReactNode } from "react"

import styles from "./CodeRedactor.module.scss"

interface CodeRedactorProps {
  children: ReactNode
  className?: string
}

export default function CodeRedactor({ children, className = "" }: CodeRedactorProps) {
  return (
    <section className={clsx(styles.redactor, className)}>
      <div className={styles.header}>
        <div className={styles.buttonWrapper}>
          <span className={styles.headerButton}>&#x2212;</span>
          <span className={styles.headerButton}>&#x25FB;</span>
          <span className={styles.headerButton}>&#x2715;</span>
        </div>
      </div>
      <div>{children}</div>
    </section>
  )
}
