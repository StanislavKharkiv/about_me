import { screen, render, fireEvent } from "@testing-library/react"
import { Observer } from "gsap/Observer"
import React, { useEffect } from "react"

import Slider from "../Slider"

import { SliderProps } from "./types"

// 1. Create isolated spies with strict types
const mockObserverCreate = jest.fn().mockReturnValue({
  kill: jest.fn(),
})

interface GsapToVars {
  onUpdate?: () => void
  onComplete?: () => void
  [key: string]: unknown
}

const mockGsapTo = jest.fn((_target: unknown, vars: GsapToVars) => {
  if (vars.onUpdate) vars.onUpdate()
  if (vars.onComplete) vars.onComplete()
  return { kill: jest.fn() }
})

// 2. Mock gsap/Observer module
jest.mock("gsap/Observer", () => ({
  Observer: {
    create: (...args: unknown[]) => mockObserverCreate(...args),
  },
}))

// 3. Mock core gsap module
jest.mock("gsap", () => {
  const originalGsap = jest.requireActual("gsap") as { gsap?: { utils?: Record<string, unknown> } }
  return {
    gsap: {
      registerPlugin: jest.fn(),
      to: (...args: unknown[]) => mockGsapTo(...(args as [unknown, GsapToVars])),
      set: jest.fn(),
      utils: {
        ...originalGsap.gsap?.utils,
        wrap: jest.fn((min: number, max: number, value: number) => {
          if (value < min) return max - 1
          if (value >= max) return min
          return value
        }),
      },
    },
  }
})

// 4. Mock @gsap/react using standard top-level React import
jest.mock("@gsap/react", () => ({
  useGSAP: jest.fn((callback: () => void | (() => void)) => {
    useEffect(() => {
      const cleanup = callback()
      return () => {
        if (typeof cleanup === "function") {
          cleanup()
        }
      }
    }, [callback])
  }),
}))

// 5. Mock next/image to render a standard <img> tag
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean }) => {
    const { ...rest } = props
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...rest} alt={props.alt || ""} />
  },
}))

// Updated mock dataset corresponding to real props structure
const mockItems: SliderProps["items"] = [
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
    image: "/images/chat_bot.png",
    name: "Chatbot",
    link: "https://mayabot.ai/",
  },
  {
    id: 4,
    image: "/images/quantumobile.png",
    name: "Corporate website",
    link: "https://quantumobile.com/",
  },
  {
    id: 5,
    image: "/images/usa_cars.png",
    repo: "https://github.com/StanislavKharkiv/usa-cars",
    name: "American Cars",
    link: "https://usa-car.netlify.app/",
  },
]

describe("Slider Component", () => {
  beforeEach(() => {
    mockObserverCreate.mockClear()
    mockGsapTo.mockClear()
  })

  test("should render all cards and navigation controls successfully", () => {
    render(<Slider items={mockItems} />)

    expect(screen.getByText("Geoap")).toBeInTheDocument()
    expect(screen.getByText("Mine free")).toBeInTheDocument()
    expect(screen.getByText("Chatbot")).toBeInTheDocument()
    expect(screen.getByText("Corporate website")).toBeInTheDocument()
    expect(screen.getByText("American Cars")).toBeInTheDocument()

    expect(screen.getByRole("button", { name: /previous/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument()
  })

  test("should render conditional external links (VIEW PROJECT and SOURCE CODE)", () => {
    render(<Slider items={mockItems} />)

    // Geoap has only repo link
    const geoapRepoLink = screen.getByRole("link", { name: /open live demo of geoap/i })
    expect(geoapRepoLink).toHaveAttribute("href", "https://github.com/QuantuMobileSoftware/geoap")

    // American Cars has both repo and live link
    const usaCarsLinks = screen.getAllByRole("link", { name: /open live demo of american cars/i })
    expect(usaCarsLinks).toHaveLength(2)
  })

  test("should trigger GSAP animation when navigation buttons are clicked", () => {
    render(<Slider items={mockItems} />)

    const nextButton = screen.getByRole("button", { name: /next/i })
    fireEvent.click(nextButton)

    expect(mockGsapTo).toHaveBeenCalled()
  })

  test("should correctly register the Observer plugin on mount", () => {
    render(<Slider items={mockItems} />)

    expect(mockObserverCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        type: expect.stringContaining("touch"),
        tolerance: expect.any(Number),
      }),
    )
  })

  test("should clean up Observer resources on unmount to prevent memory leaks", () => {
    const mockKill = jest.fn()
    mockObserverCreate.mockReturnValueOnce({ kill: mockKill } as unknown as ReturnType<typeof Observer.create>)

    const { unmount } = render(<Slider items={mockItems} />)
    unmount()

    expect(mockKill).toHaveBeenCalled()
  })
})
