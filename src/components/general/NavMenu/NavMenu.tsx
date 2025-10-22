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
  const [isReady, setIsReady] = useState(true) // TODO: add animation for show menu

  const handleReadyToRender = () => setIsReady(false)

  return (
    <nav
      className={styles.menu}
      style={isReady ? { visibility: "hidden", opacity: 0 } : { visibility: "visible", opacity: 1 }}
    >
      <ul className={styles.menuList}>
        {MENU_ITEMS.map(({ href, icon: Icon, text }, i) => (
          <MenuItem key={text} onReadyToRender={i === 0 ? handleReadyToRender : undefined}>
            <Link href={href}>
              <span className={styles.menuIconWrap}>
                <Icon className={pathname === href ? styles.activeIcon : styles.icon} />
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
  onReadyToRender?: () => void
}

function MenuItem({ children, onReadyToRender }: MenuItemProps) {
  const itemRef = useRef<HTMLLIElement>(null)
  const [width, setWidth] = useState<number | string>("auto")
  const [offsetWidth, setOffsetWidth] = useState(DEFAULT_WIDTH)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (itemRef.current) {
      setOffsetWidth(itemRef.current.offsetWidth)
      setWidth(DEFAULT_WIDTH)
    }
    onReadyToRender?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={isHovered ? { width: offsetWidth, borderRadius: 8 } : { width }}
      ref={itemRef}
      className={styles.menuListItem}
    >
      {children}
    </li>
  )
}
