import { FONT } from "../constants/font"

export function QuranText(props: {
  verseText: string
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
      {props.verseText}
    </div>
  )
}
