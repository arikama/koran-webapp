import React from 'react'

type Props = {
  title: string
  onClick?: () => void
}

export const Button = (props: Props) => {
  return (
    <h3
      style={{
        margin: 0,
        cursor: 'pointer',
        height: '32px'
      }}
      onClick={props.onClick}
    >
      {props.title}
    </h3>
  )
}
