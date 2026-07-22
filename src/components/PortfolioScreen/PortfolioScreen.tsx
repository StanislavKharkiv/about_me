"use client"

import { useState } from "react"

import Slider from "@/components/general/Slider"

import ProjectDetails from "../general/ProjectDetails"

import { projects } from "./constants"
import styles from "./PortfolioScreen.module.scss"

export default function PortfolioScreen() {
  const [currentCard, setCurrentCard] = useState<number>(2)

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Portfolio</h1>
      <Slider items={projects} currentCard={currentCard} setCurrentCard={setCurrentCard} />
      <ProjectDetails
        index={currentCard}
        total={projects.length}
        name={projects[currentCard].name}
        description={projects[currentCard].description}
        tags={projects[currentCard].tags}
        link={projects[currentCard].link}
        repo={projects[currentCard].repo}
      />
    </div>
  )
}
