export interface SliderCard {
  id: number
  name: string
  image: string
  repo?: string
  link?: string
}

export interface SliderProps {
  items: SliderCard[]
  currentCard?: number
  setCurrentCard?: (card: number) => void
}

export interface SliderControl {
  next: () => void
  prev: () => void
  moveTo: (index: number) => void
}
