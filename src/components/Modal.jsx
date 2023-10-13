import React from 'react'
import {AiOutlineCloseCircle} from "react-icons/ai"
import { modalFunc } from '../redux/modalSlice'
import { useDispatch } from 'react-redux'
const Modal = ({title, content, btnText, btnFunc}) => {

    const dispatch = useDispatch()
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-screen flex items-center justify-center'>
        <div className='w-1/4 bg-white shadow-lg rounded-md p-4'>
            <div className='border-b py-3 flex items-center justify-between'>
                <div className='text-2xl'>{title}</div>
                <AiOutlineCloseCircle className='cursor-pointer' onClick={() => dispatch(modalFunc())} size={24}></AiOutlineCloseCircle>
            </div>
            {content}
        </div> 
    </div>
  )
}

export default Modal