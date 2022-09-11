import type { PropsWithChildren } from 'react'

type Props = PropsWithChildren & {
  onClick: () => void
  disabled?: boolean
  style?: React.CSSProperties
}

export const Button = (props: Props = { onClick: () => { }, disabled: false }) => {
  return (
    <button
      onClick={
        () => {
          if (!props.disabled) {
            props.onClick()
          }
        }
      }
      style={{
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        fontSize: '1em',
        color: props.disabled ? 'gray' : '',
        ...props.style,
      }}
    >
      <u>{props.children}</u>
    </button>
  )
}
