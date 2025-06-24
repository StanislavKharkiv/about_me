"use client"

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
  return (
    <div className={styles.container}>
      <CodeTyping codeLines={codeLines} className={styles.codeStyles} />
      <section className={styles.background}>
        <h1 className={styles.mainHeader}>Web Development</h1>
      </section>
    </div>
  )
}
