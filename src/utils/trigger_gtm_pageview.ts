declare global {
  interface Window { dataLayer?: {
    push: (data: Object) => boolean
  } }
}

export function triggerGtmPageview(): boolean {
  if (window.dataLayer) {
    return window.dataLayer.push({
      event: 'pageview'
    })
  }
  return false
}
