import { Metadata } from "next"

import PortfolioScreen from "@/components/PortfolioScreen"

export const metadata: Metadata = {
  title: "Portfolio",
}

export default function Portfolio() {
  return <PortfolioScreen />
}
