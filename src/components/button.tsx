import type { PropsWithChildren } from 'react'

type Props = PropsWithChildren & {
  onClick: () => void
  disabled?: boolean
  style?: React.CSSProperties
}

export const Button = (props: Props = { onClick: () => { }, disabled: false }) => {
  return (
    <u
      onClick={
        () => {
          if (!props.disabled) {
            props.onClick()
          }
        }
      }
      style={{
        ...props.style,
        userSelect: 'none',
        cursor: 'pointer',
        color: props.disabled ? 'gray' : ''
      }}
    >
      {props.children}
    </u>
  )
}
