import { triggerGtmPageview } from "../../src/utils/trigger_gtm_pageview"

describe('triggerGtmPageview', () => {
  test('data layer installed', () => {
    const mockPushFn = jest.fn()
    window.dataLayer = {
      push: mockPushFn
    }

    triggerGtmPageview()
    expect(mockPushFn).toBeCalledTimes(1)
  })

  test('data layer not installed', () => {
    const mockPushFn = jest.fn()
    window.dataLayer = undefined

    triggerGtmPageview()
    expect(mockPushFn).toBeCalledTimes(0)
  })
})
