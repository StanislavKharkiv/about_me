import { Metadata } from "next"

import ContactScreen from "@/components/ContactScreen"

export const metadata: Metadata = {
  title: "Contact me",
}

export default function About() {
  return <ContactScreen />
}
