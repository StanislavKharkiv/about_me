"use client"

import { useState } from "react"

import Slider from "@/components/general/Slider"

import styles from "./PortfolioScreen.module.scss"

const projects = [
  {
    id: 1,
    image: "/images/geoap.png",
    repo: "https://github.com/QuantuMobileSoftware/geoap",
    name: "Geoap",
  },
  {
    id: 2,
    image: "/images/mine_free.png",
    name: "Mine free",
    link: "https://www.weareukraine.info/mine-safety-mobile-app-launched-in-ukraine/",
  },
  {
    id: 3,
    image: "/images/usa_cars.png",
    repo: "https://github.com/StanislavKharkiv/usa-cars",
    name: "American Cars",
    link: "https://usa-car.netlify.app/",
  },
  {
    id: 4,
    image: "/images/chat_bot.png",
    name: "Chatbot",
    link: "https://mayabot.ai/",
  },
  {
    id: 5,
    image: "/images/quantumobile.png",
    name: "Corporate website",
    link: "https://quantumobile.com/",
  },
]

export default function PortfolioScreen() {
  const [currentCard, setCurrentCard] = useState<number>(2)

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Portfolio</h1>
      <Slider items={projects} currentCard={currentCard} setCurrentCard={setCurrentCard} />
      {/* TODO add description component */}
      {/* <h3>Current card: {currentCard}</h3> */}
    </div>
  )
}
