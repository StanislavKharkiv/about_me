const timelineMock = {
  to: jest.fn().mockImplementation((el, vars) => {
    if (el && vars?.text) {
      el.innerHTML = vars.text // ← imitate TextPlugin
    }
    return timelineMock
  }),
  kill: jest.fn(),
  add: jest.fn(),
}

const contextMock = {
  add: jest.fn(),
  revert: jest.fn(),
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  registerPlugin: jest.fn(),
  timeline: jest.fn(() => timelineMock),
  context: jest.fn((fn) => {
    fn()
    return contextMock
  }),
}
