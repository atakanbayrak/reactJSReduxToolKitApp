import React from 'react'

const Button = ({onClick, btnText}) => {
  return (
    <button className='w-full h-12 bg-indigo-600 text-white flex items-center justify-center mt-3 rounded-lg border-transparent shadow-lg cursor-pointer font-bold' onClick={onClick}>{btnText}</button>
  )
}

export default Button