import "@testing-library/jest-dom"

jest.mock("gsap")
jest.mock("gsap/TextPlugin", () => ({}))
jest.mock("next/dynamic", () => ({
  __esModule: true,
  default: (...props: unknown[]) => {
    const dynamicModule = jest.requireActual("next/dynamic")
    const dynamicActualComp = dynamicModule.default
    const RequiredComponent = dynamicActualComp(props[0])
    
    if (RequiredComponent.preload) RequiredComponent.preload()
    else RequiredComponent.render?.preload()
    return RequiredComponent
  },
}))
