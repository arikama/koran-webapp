import { TRACKING_EVENTS } from "../constants/tracking_events"

export function triggerGtmPageview(): boolean {
  if (window.dataLayer) {
    return window.dataLayer.push({
      event: TRACKING_EVENTS.PAGEVIEW
    })
  }
  return false
}
