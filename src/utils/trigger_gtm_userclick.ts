import { TRACKING_EVENTS } from "../constants/tracking_events"

export function triggerGtmUserclick(action: string): boolean {
  if (window.dataLayer) {
    return window.dataLayer.push({
      event: TRACKING_EVENTS.USERCLICK,
      action
    })
  }
  return false
}
