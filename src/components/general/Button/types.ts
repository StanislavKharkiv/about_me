import type { LucideIcon, LucideProps } from "lucide-react"
import Link from "next/link"
import type { ComponentProps, ReactNode } from "react"

export type ButtonCommonProps = {
  children: ReactNode
  className?: string
  icon?: LucideIcon
  hoverIcon?: LucideIcon
  iconPosition?: "left" | "right"
  iconProps?: LucideProps
}

export type ButtonElementProps = ButtonCommonProps &
  Omit<ComponentProps<"button">, keyof ButtonCommonProps> & {
    href?: never
    as?: never
  }

export type LinkElementProps = ButtonCommonProps &
  Omit<ComponentProps<typeof Link>, keyof ButtonCommonProps> & {
    href: ComponentProps<typeof Link>["href"]
    as: "link"
  }

export type AnchorProps = ButtonCommonProps &
  Omit<ComponentProps<"a">, keyof ButtonCommonProps> & {
    href: ComponentProps<"a">["href"]
    as: "a"
  }

export type ButtonContentProps = {
  children: ReactNode
  icon?: LucideIcon
  hoverIcon?: LucideIcon
  iconPosition: "left" | "right"
  iconProps?: LucideProps
}

export type ButtonProps = ButtonElementProps | LinkElementProps | AnchorProps
