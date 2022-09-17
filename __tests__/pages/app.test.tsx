import { render, screen } from "@testing-library/react"

import App from "../../src/pages/app"

const useRouter = jest.spyOn(require("next/router"), "useRouter")

describe("App", () => {
  test("render", () => {
    useRouter.mockImplementation(() => ({
      router: jest.fn()
    }))
    render(
      <App />
    )
    expect(screen.getByText("Koran")).toBeInTheDocument()
    expect(screen.getByText("Bookmark")).toBeInTheDocument()
    expect(screen.getByText("Login")).toBeInTheDocument()
  })
})
