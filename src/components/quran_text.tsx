import { FONT } from "../constants/font"

export function QuranText(props: {
  text: string
}) {
  return (
    <div
      style={{
        fontFamily: FONT.QURAN_FONT_FAMILY,
        fontSize: FONT.QURAN_FONT_SIZE,
        textAlign: "right",
        lineHeight: FONT.QURAN_LINE_HEIGHT
      }}
    >
      {props.text}
    </div>
  )
}
