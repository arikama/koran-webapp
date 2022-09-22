import type { PropsWithChildren } from 'react'

type Props = PropsWithChildren & {
  onClick: () => void
  style?: React.CSSProperties
  isLoading?: boolean
}

export const Button = (props: Props = { onClick: () => { }, isLoading: false }) => {
  return (
    <button
      onClick={
        () => {
          if (!props.isLoading) {
            props.onClick()
          }
        }
      }
      style={{
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        fontSize: '1em',
        textDecoration: !props.isLoading ? "underline" : "",
        ...props.style,
      }}
    >
      {props.children}
    </button>
  )
}
