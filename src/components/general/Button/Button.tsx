import clsx from "clsx"
import Link from "next/link"

import styles from "./Button.module.scss"
import type { ButtonProps, ButtonElementProps, LinkElementProps, AnchorProps, ButtonContentProps } from "./types"

export default function Button(props: ButtonProps) {
  if (props.as === "a" || props.as === "link") {
    return <ButtonLink {...props} />
  }

  return <ButtonElement {...props} />
}

function ButtonElement({
  children,
  className,
  icon: Icon,
  hoverIcon: HoverIcon,
  iconPosition = "right",
  iconProps,
  ...buttonProps
}: ButtonElementProps) {
  return (
    <button {...buttonProps} className={clsx(styles.button, className)}>
      <ButtonContent icon={Icon} hoverIcon={HoverIcon} iconPosition={iconPosition} iconProps={iconProps}>
        {children}
      </ButtonContent>
    </button>
  )
}

function ButtonLink(props: LinkElementProps | AnchorProps) {
  if (props.as === "a") {
    const {
      children,
      className,
      icon: Icon,
      hoverIcon: HoverIcon,
      iconPosition = "right",
      iconProps,
      as: _,
      ...anchorProps
    } = props

    return (
      <a {...anchorProps} className={clsx(styles.button, className)}>
        <ButtonContent icon={Icon} hoverIcon={HoverIcon} iconPosition={iconPosition} iconProps={iconProps}>
          {children}
        </ButtonContent>
      </a>
    )
  }

  const {
    children,
    className,
    icon: Icon,
    hoverIcon: HoverIcon,
    iconPosition = "right",
    iconProps,
    as: _,
    ...LinkElementProps
  } = props

  return (
    <Link {...LinkElementProps} className={clsx(styles.button, className)}>
      <ButtonContent icon={Icon} hoverIcon={HoverIcon} iconPosition={iconPosition} iconProps={iconProps}>
        {children}
      </ButtonContent>
    </Link>
  )
}

function ButtonContent({ children, icon: Icon, hoverIcon: HoverIcon, iconPosition, iconProps }: ButtonContentProps) {
  const renderIcon = () => {
    if (!Icon && !HoverIcon) return null

    if (!HoverIcon) {
      return Icon ? (
        <Icon {...iconProps} className={clsx(styles.icon, iconProps?.className)} aria-hidden="true" />
      ) : null
    }

    return (
      <span className={styles.iconWrapper} aria-hidden="true">
        {Icon && <Icon {...iconProps} className={clsx(styles.icon, styles.defaultIcon, iconProps?.className)} />}

        <HoverIcon {...iconProps} className={clsx(styles.icon, styles.hoverIcon, iconProps?.className)} />
      </span>
    )
  }

  return (
    <>
      {iconPosition === "left" && renderIcon()}
      {children}
      {iconPosition === "right" && renderIcon()}
    </>
  )
}
