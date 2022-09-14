import { connected } from "process"

export function getUrl(path: string): string {
  let base = process.env.NEXT_PUBLIC_BASE_API
  if (base?.endsWith("/")) {
    base = base.substring(0, base.length - 1)
  }
  if (path.startsWith("/")) {
    return base + path
  } else {
    return base + "/" + path
  }
}
