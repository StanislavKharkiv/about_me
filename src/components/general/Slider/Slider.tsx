"use client"

import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { Observer } from "gsap/Observer"
import { ArrowBigRight, ArrowBigLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React, { useRef } from "react"

import {
  CARD_SPACING,
  SCALE_STEP,
  OPACITY_STEP,
  SWIPE_TOLERANCE,
  ANIMATION_DURATION,
  controlsDefaultState,
} from "./constants"
import styles from "./Slider.module.scss"
import { SliderProps, SliderControl } from "./types"

gsap.registerPlugin(Observer, useGSAP)

export default function Slider({ items, currentCard, setCurrentCard }: SliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<HTMLDivElement[]>([])

  const animationState = useRef({ position: currentCard || 0 })
  const controlsRef = useRef<SliderControl>(controlsDefaultState)

  useGSAP(
    () => {
      if (!containerRef.current || !cardsContainerRef.current) return

      const cards = cardRefs.current
      if (!cards.length) return

      const totalCards = cards.length

      const state = {
        // isAnimating: false,
        isDragging: false,
      }

      const updatePositions = () => {
        const currentPos = animationState.current.position

        cards.forEach((card, i) => {
          const diff = gsap.utils.wrap(-totalCards / 2, totalCards / 2, i - currentPos)
          const distance = Math.abs(diff)
          const thickness = Math.round(2 + distance * 2)
          const shadow = Math.round(4 + distance * 2)
          let boxShadow = ""

          const moveToCard = (index: number) => {
            const current = animationState.current.position
            let diff = index - current
            diff = gsap.utils.wrap(-totalCards / 2, totalCards / 2, diff)
            animateToPosition(current + diff)
          }

          controlsRef.current.moveTo = moveToCard

          if (distance > 0.1) {
            boxShadow = `
              ${diff > 0 ? -thickness : thickness}px 1px 1px 1px #111735,
              ${diff > 0 ? -shadow : shadow}px 1px 4px rgb(0 0 0 / 0.4)
            `
          }

          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            x: Math.sin((diff * 25 * Math.PI) / 180) * CARD_SPACING,
            rotationY: Math.sign(diff) * Math.min(distance * 12, 25),
            filter: `blur(${distance * 0.3}px)`,
            scale: 1 - distance * SCALE_STEP,
            opacity: 1 - distance * OPACITY_STEP,
            zIndex: Math.round((totalCards - distance) * 10),
            overwrite: "auto",
            boxShadow,
          })
        })
      }

      let activeTween: gsap.core.Tween | null = null

      const animateToPosition = (target: number) => {
        // if (state.isAnimating) return
        // i can just exit if animation is already running or kill this tween and start a new one like in code below
        activeTween?.kill()
        // state.isAnimating = true
        activeTween = gsap.to(animationState.current, {
          position: target,
          duration: ANIMATION_DURATION,
          ease: "power2.out",
          onUpdate: updatePositions,
          onComplete: () => {
            animationState.current.position = gsap.utils.wrap(0, totalCards, animationState.current.position)
            // state.isAnimating = false
            setCurrentCard?.(gsap.utils.wrap(0, totalCards, Math.round(animationState.current.position)))
            activeTween = null
          },
        })
      }

      const goNext = () => {
        animateToPosition(Math.round(animationState.current.position) + 1)
      }

      const goPrev = () => {
        animateToPosition(Math.round(animationState.current.position) - 1)
      }

      controlsRef.current.next = goNext
      controlsRef.current.prev = goPrev

      updatePositions()

      const observer = Observer.create({
        target: cardsContainerRef.current,
        type: "wheel,touch,pointer",
        tolerance: SWIPE_TOLERANCE,
        preventDefault: true,
        onPress() {
          state.isDragging = true
        },
        onRelease() {
          state.isDragging = false
        },
        onLeft() {
          goNext()
        },
        onRight() {
          goPrev()
        },
        onUp() {
          goPrev()
        },
        onDown() {
          goNext()
        },
      })

      return () => {
        activeTween?.kill() // delete if use isAnimating
        observer.kill()
      }
    },
    { scope: containerRef },
  )

  return (
    <div ref={containerRef} className={styles.sliderContainer}>
      <div className={styles.sliderWrapper}>
        <div ref={cardsContainerRef} className={styles.cardsContainer}>
          {items.map((project, i) => (
            <div
              key={project.id}
              className={styles.card}
              ref={(el) => {
                if (el) cardRefs.current[i] = el
              }}
              onClick={() => controlsRef.current.moveTo(i)}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.projectTitle}>{project.name}</h3>
                  <div className={styles.packetId}>PROJECT ID: 0{project.id}</div>
                </div>
                <div className={styles.imageArea}>
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 480px) 100vw, 280px"
                    draggable={false}
                    className={styles.projectImage}
                    priority={i === Math.floor(items.length / 2)}
                  />
                </div>
                <Link
                  href={`/portfolio/${project.id}`} // TODO: add this route
                  className={styles.cardButton}
                  aria-label={`Open source code of ${project.name}`}
                >
                  EXPLORE CASE
                </Link>
                <div className={styles.cardFooter}>
                  {project.link && (
                    <a
                      href={project.link}
                      className={styles.footerLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open live demo of ${project.name}`}
                    >
                      VIEW PROJECT
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      className={styles.footerLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open live demo of ${project.name}`}
                    >
                      SOURCE CODE
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className={`${styles.arrowButton} ${styles.prev}`}
          aria-label="Previous"
          onClick={() => controlsRef.current.prev()}
        >
          <ArrowBigLeft className={styles.arrowIcon} size={28} strokeWidth={2} />
        </button>
        <button
          className={`${styles.arrowButton} ${styles.next}`}
          aria-label="Next"
          onClick={() => controlsRef.current.next()}
        >
          <ArrowBigRight className={styles.arrowIcon} size={28} strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}
