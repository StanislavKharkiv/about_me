import { Metadata } from "next"

import AboutScreen from "@/components/AboutScreen"

export const metadata: Metadata = {
  title: "About me",
}

export default function About() {
  return <AboutScreen />
}
