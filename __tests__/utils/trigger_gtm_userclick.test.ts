import { triggerGtmUserclick } from "../../src/utils/trigger_gtm_userclick"

describe('triggerGtmUserclick', () => {
  test('data layer installed', () => {
    const mockPushFn = jest.fn()
    window.dataLayer = {
      push: mockPushFn
    }

    triggerGtmUserclick("action")
    expect(mockPushFn).toBeCalledWith({ "action": "action", "event": "userclick" })
  })

  test('data layer not installed', () => {
    const mockPushFn = jest.fn()
    window.dataLayer = undefined

    triggerGtmUserclick("action")
    expect(mockPushFn).toBeCalledTimes(0)
  })
})
