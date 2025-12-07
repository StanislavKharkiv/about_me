"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Fragment, useRef } from "react"

import styles from "./NeonLights.module.scss"

interface NeonLightsProps {
  linesData: Array<{ coordPaths: string; color: string }>
  animationDuration?: number
  animationPause?: number
}

export default function NeonLights(props: NeonLightsProps) {
  const { linesData, animationDuration = 3, animationPause = 5 } = props
  const groupRef = useRef<SVGGElement>(null)

  useGSAP(() => {
    if (!groupRef.current) return

    const paths = Array.from(groupRef.current.querySelectorAll("path"))

    // soft "pulsing" light
    paths.forEach((path) => {
      gsap.to(path, {
        display: "inline",
        opacity: 0.4 + Math.random() * 0.5,
        duration: 3 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    })

    // slow mowing group
    gsap.fromTo(
      groupRef.current,
      { y: -15 },
      {
        y: 15,
        duration: 30,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      },
    )

    const lineGroups = linesData.map((_, i) => paths.filter((p) => p.dataset.line === String(i)))
    const lineDelay = animationPause + animationDuration * 2 // two animations - show line and hide

    lineGroups.forEach((pathsGroup, groupIndex) => {
      pathsGroup.forEach((path) => {
        const length = path.getTotalLength()
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })
      })

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: lineDelay * (lineGroups.length - 1) + animationPause,
        delay: groupIndex * lineDelay,
      })

      tl.to(pathsGroup, {
        // show line
        strokeDashoffset: 0,
        duration: animationDuration,
        ease: "none",
      }).to(pathsGroup, {
        // hide line
        strokeDashoffset: -pathsGroup[0].getTotalLength(),
        duration: animationDuration,
        ease: "none",
        delay: animationPause,
      })
    })
  })

  return (
    <div className={styles.wrapper}>
      <svg data-testid="neon-svg" className={styles.svg} viewBox="0 0 1400 800" preserveAspectRatio="none">
        <defs>
          {/* further blur */}
          <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          {/* main blur */}
          <filter id="mediumBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
          {/* bright core */}
          <filter id="sharpGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g data-testid="neon-group" ref={groupRef} className={styles.group}>
          {linesData.map(({ coordPaths, color }, index) => (
            <Fragment key={index}>
              <g filter="url(#softBlur)">
                <path
                  data-testid="neon-path"
                  d={coordPaths}
                  data-line={index}
                  className={styles.glowFar}
                  stroke={color}
                />
              </g>
              <g filter="url(#mediumBlur)">
                <path
                  data-testid="neon-path"
                  d={coordPaths}
                  data-line={index}
                  className={styles.glowMid}
                  stroke={color}
                />
              </g>
              <path
                data-testid="neon-path"
                d={coordPaths}
                data-line={index}
                className={styles.core}
                filter="url(#sharpGlow)"
                stroke={color}
              />
            </Fragment>
          ))}
        </g>
      </svg>
    </div>
  )
}
