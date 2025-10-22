import { render, screen } from "@testing-library/react"

import NavMenu from "./NavMenu"

test("HTML code typing", async () => {
  render(<NavMenu />)

  const menuList = screen.getByRole("list")
  expect(menuList).toBeInTheDocument()

  const listItems = screen.getAllByRole("listitem")
  expect(listItems).toHaveLength(4)

  const homeLink = screen.getByRole("link", { name: /home/i })
  expect(homeLink).toBeInTheDocument()
  expect(homeLink).toHaveAttribute("href", "/")

  const aboutLink = screen.getByRole("link", { name: /about/i })
  expect(aboutLink).toBeInTheDocument()
  expect(aboutLink).toHaveAttribute("href", "/about")

  const contactsLink = screen.getByRole("link", { name: /contacts/i })
  expect(contactsLink).toBeInTheDocument()
  expect(contactsLink).toHaveAttribute("href", "/contacts")

  const worksLink = screen.getByRole("link", { name: /works/i })
  expect(worksLink).toBeInTheDocument()
  expect(worksLink).toHaveAttribute("href", "/works")
})
