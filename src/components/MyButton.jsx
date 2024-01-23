import React from 'react'

const MyButton = ({onClick, children}) => {
  return (
    <button className='button' onClick={onClick}>
      {children}
    </button>
  )
}

export default MyButton

