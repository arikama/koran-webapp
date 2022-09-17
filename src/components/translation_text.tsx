import { FONT } from "../constants/font"

export function TranslationText(props: {
  text: string
}) {
  return (
    <div
      style={{
        fontSize: FONT.FONT_SIZE
      }}
    >
      {props.text}
    </div>
  )
}
