import Image from "next/image"

import ContactForm from "@/components/general/ContactForm"

import Contacts from "../general/Contacts"

import styles from "./ContactScreen.module.scss"

export default function ContactScreen() {
  return (
    <section className={styles.pageContainer}>
      <h1 className={styles.header}>Get in Touch</h1>
      <div className={styles.flexContainer}>
        <section className={styles.contactInfo}>
          <div className={styles.imageContainer}>
            <Image
              src="/images/message_in_phone.png"
              alt="Phone in hand"
              fill
              priority
              sizes="(max-width: 300px) 100vw, 250px"
              className={styles.cyberImage}
            />
          </div>
          <h2 className={styles.contactInfoHeader}>Let&apos;s connect</h2>
          <p className={styles.contactInfoText}>
            I&apos;m currently open to new opportunities and interesting projects. Whether you have a question or just
            want to say hi, I&apos;ll try my best to get back to you!
          </p>
          <Contacts />
        </section>
        <ContactForm className={styles.form} />
      </div>
    </section>
  )
}
