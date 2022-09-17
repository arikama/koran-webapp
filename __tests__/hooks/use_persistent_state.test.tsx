import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { usePersistentState } from "../../src/hooks/use_persistent_state"

describe("usePersistentState", () => {
  test("changing state & storage", async () => {
    const Dummy = () => {
      const [state, setState] = usePersistentState<{ count: number }>("testkey", { count: -1 })
      return (
        <div
          onClick={() => {
            setState({ count: state.count + 1 })
          }}
        >
          {state.count}
        </div>
      )
    }

    window.localStorage.setItem("testkey", `{"count":0}`)

    render(
      <Dummy />
    )

    const div = screen.getByText("0")
    expect(screen.queryByText("1")).not.toBeInTheDocument()
    expect(window.localStorage.getItem("testkey")).toEqual(`{"count":0}`)

    userEvent.click(div)
    await waitFor(() => {
      expect(screen.queryByText("1")).toBeInTheDocument()
      expect(window.localStorage.getItem("testkey")).toEqual(`{"count":1}`)
    })
  })
})
