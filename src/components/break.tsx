import { DIMENSIONS } from "../constants/dimensions"

export function Break(props: { size?: number }) {
  let size = DIMENSIONS.SZ_4
  if (props.size !== undefined) {
    size = props.size
  }
  return (
    <div
      style={{
        height: `${size}px`
      }}
    />
  )
}
