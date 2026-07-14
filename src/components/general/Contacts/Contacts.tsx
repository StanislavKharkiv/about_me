"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Phone, Mail, MapPin } from "lucide-react"
import { useRef } from "react"

import { contactsData } from "./constants"
import styles from "./Contacts.module.scss"

export default function Contacts() {
  const listRef = useRef<HTMLUListElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.from(`.${styles.item}`, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
      })
    },
    { scope: listRef },
  )
  return (
    <address className={styles.contacts}>
      <ul className={styles.list} ref={listRef}>
        <li className={styles.item}>
          <div className={styles.iconWrap}>
            <Phone className={styles.icon} size={18} aria-hidden="true" />
          </div>
          <div>
            <span className={styles.title}>Phone: </span>
            <a
              href={`tel:${contactsData.phone}`}
              className={styles.link}
              aria-label={`Call me at ${contactsData.phone}`}
            >
              {contactsData.phone}
            </a>
          </div>
        </li>
        <li className={styles.item}>
          <div className={styles.iconWrap}>
            <Mail className={styles.icon} size={18} aria-hidden="true" />
          </div>
          <div>
            <span className={styles.title}>Email: </span>
            <a
              href={`mailto:${contactsData.email}`}
              className={styles.link}
              aria-label={`Email me at ${contactsData.email}`}
            >
              {contactsData.email}
            </a>
          </div>
        </li>
        <li className={styles.item}>
          <div className={styles.iconWrap}>
            <MapPin className={styles.icon} size={18} aria-hidden="true" />
          </div>
          <div>
            <span className={styles.title}>Location: </span>
            <a
              href="https://maps.app.goo.gl/5JW2GsnZYBrR7BZd6"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              aria-label="Open my location on Google Maps"
            >
              {contactsData.location}
            </a>
          </div>
        </li>
      </ul>
    </address>
  )
}
