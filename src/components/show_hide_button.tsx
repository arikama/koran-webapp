import { Button } from "./button"

export const ShowHideButton = (props: {
  show: string
  hide: string
  isHiding: boolean
  onClick: () => void
}) => {
  return (
    <Button
      onClick={props.onClick}
    >
      {props.isHiding ? props.show : props.hide}
    </Button>
  )
}
