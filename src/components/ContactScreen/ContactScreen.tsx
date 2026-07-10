import ContactForm from "@/components/general/ContactForm"

import styles from "./ContactScreen.module.scss"

export default function ContactScreen() {
  return (
    <section className={styles.container}>
      <h2 className={styles.header}>Get in Touch</h2>
      <ContactForm />
    </section>
  )
}
