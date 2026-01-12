import { render, screen } from "@testing-library/react"

import NeonLights from "../NeonLights"

const totalPathsPerLine = 2

describe("NeonLights component", () => {
  const linesData = [
    { coordPaths: "M0 0 L100 0", color: "#ff0000" },
    { coordPaths: "M0 50 L100 50", color: "#00ff00" },
  ]

  test("renders SVG and group", async () => {
    render(<NeonLights linesData={linesData} />)
    const svg = screen.getByTestId("neon-svg")
    const group = screen.getByTestId("neon-group")

    expect(svg).toBeInTheDocument()
    expect(group).toBeInTheDocument()
  })

  test("renders correct number of <path> elements", () => {
    render(<NeonLights linesData={linesData} />)

    const expected = linesData.length * totalPathsPerLine

    const paths = screen.getAllByTestId("neon-path")

    expect(paths.length).toBe(expected)
  })

  test("each path has correct d and stroke color", () => {
    render(<NeonLights linesData={linesData} />)

    const paths = screen.getAllByTestId("neon-path")

    // cycle every 3 paths (far/mid/core)
    paths.forEach((path, index) => {
      const lineIndex = Math.floor(index / totalPathsPerLine)
      expect(path).toHaveAttribute("d", linesData[lineIndex].coordPaths)
      expect(path).toHaveAttribute("stroke", linesData[lineIndex].color)
    })
  })

  test("paths grouped by data-line correctly", () => {
    render(<NeonLights linesData={linesData} />)

    const group0 = screen.getAllByTestId("neon-path").filter((p) => p.dataset.line === "0")
    const group1 = screen.getAllByTestId("neon-path").filter((p) => p.dataset.line === "1")

    expect(group0.length).toBe(totalPathsPerLine)
    expect(group1.length).toBe(totalPathsPerLine)
  })
})
