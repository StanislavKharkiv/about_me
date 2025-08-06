"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState, ReactNode } from "react"

import { AboutIcon, ContactIcon, HomeIcon, WorksIcon } from "@/components/icons"

import styles from "./NavMenu.module.scss"

const MENU_ITEMS = [
  { href: "/", icon: HomeIcon, text: "Home" },
  { href: "/about", icon: AboutIcon, text: "About" },
  { href: "/contacts", icon: ContactIcon, text: "Contacts" },
  { href: "/works", icon: WorksIcon, text: "My works" },
]

export default function NavMenu() {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true) // TODO: put in state manager and sow loading all page

  return (
    <nav
      className={styles.menu}
      style={isLoading ? { visibility: "hidden", opacity: 0 } : { visibility: "visible", opacity: 1 }}
    >
      <ul className={styles.menuList}>
        {MENU_ITEMS.map(({ href, icon: Icon, text }) => (
          <MenuItem key={text} isLoading={isLoading} setIsLoading={setIsLoading}>
            <Link href={href}>
              <span className={styles.menuIconWrap}>
                <Icon color={pathname === href ? "darkorange" : "gray"} className={styles.icon} />
              </span>
              <span className={styles.menuText}>{text}</span>
            </Link>
          </MenuItem>
        ))}
      </ul>
    </nav>
  )
}

const DEFAULT_WIDTH = 48

interface MenuItemProps {
  children: ReactNode
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

function MenuItem({ children, isLoading, setIsLoading }: MenuItemProps) {
  const itemRef = useRef<HTMLLIElement>(null)
  const [width, setWidth] = useState<number | string>("auto")
  const [offsetWidth, setOffsetWidth] = useState(DEFAULT_WIDTH)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (itemRef.current) {
      setOffsetWidth(itemRef.current.offsetWidth)
      setWidth(DEFAULT_WIDTH)
    }
  }, [])

  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={isHovered ? { width: offsetWidth, borderRadius: 8 } : { width }}
      ref={itemRef}
      className={styles.menuListItem}
      onTransitionEnd={() => {
        if (isLoading) setIsLoading(false)
      }}
    >
      {children}
    </li>
  )
}
