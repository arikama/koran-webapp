import React from 'react'

type Props = {
  title: string
  onClick?: () => void
}

export const Button = (props: Props) => {
  return (
    <h2
      style={{
        margin: 0,
        cursor: 'pointer'
      }}
      onClick={props.onClick}
    >
      {props.title}
    </h2>
  )
}
