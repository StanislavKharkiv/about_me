"use client"
import clsx from "clsx"
import { House, Info, Contact, BriefcaseBusiness } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState, ReactNode } from "react"

import styles from "./NavMenu.module.scss"

const MENU_ITEMS = [
  { href: "/", icon: House, text: "Home" },
  { href: "/about", icon: Info, text: "About" },
  { href: "/contacts", icon: Contact, text: "Contacts" },
  { href: "/works", icon: BriefcaseBusiness, text: "My works" },
]

const ICON_SIZE = 26
const PADDING = 8
const BORDER_WIDTH = 1

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
            <Link href={href} style={{ borderWidth: BORDER_WIDTH, padding: PADDING, gap: PADDING }}>
              <span className={clsx(styles.menuIconWrap, pathname === href && styles.activeIcon)}>
                <Icon strokeWidth={1.6} size={ICON_SIZE} />
              </span>
              <span className={styles.menuText}>{text}</span>
            </Link>
          </MenuItem>
        ))}
      </ul>
    </nav>
  )
}

const DEFAULT_WIDTH = ICON_SIZE + PADDING * 2 + BORDER_WIDTH * 2

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
