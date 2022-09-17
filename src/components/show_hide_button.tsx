import { Button } from "./button"

export const ShowHideButton = (props: {
  what: string
  isHiding: boolean
  onClick: () => void
}) => {
  return (
    <Button
      onClick={props.onClick}
    >
      {props.isHiding ? "show" : "hide"}&nbsp;{props.what}
    </Button>
  )
}
