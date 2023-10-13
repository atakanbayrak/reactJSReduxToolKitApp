import React, { useState } from 'react'
import {HiOutlineDotsHorizontal} from 'react-icons/hi'
import { useDispatch } from 'react-redux';
import { deleteDataFunc, updateDataFunc } from '../redux/dataSlice';
import { modalFunc } from '../redux/modalSlice';
import {useNavigate} from 'react-router-dom'
const ProductCard = ({dt}) => {
  
  const [openEdit, setOpenEdit] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const updateFunc =() => {
    dispatch(modalFunc())
    setOpenEdit(false)
    navigate(`/?update=${dt?.id}`)
    //dispatch(updateDataFunc(dt))

  }
  return (
    <div className='w-[200px] h-[200px] relative m-2 rounded-md'>
      
      <img src={dt?.url} className='w-full h-full rounded-md' alt=''></img>
      <div className='absolute left-0 bottom-0 bg-indigo-600 text-white w-full px-2'>
        <div className='text-lg font-semibold'>{dt?.name}</div>
        <div className='text-lg'>{dt?.price}£</div>
      </div>
      <div onClick={() => setOpenEdit(!openEdit)} className='absolute right-2 top-0 cursor-pointer'>
        <HiOutlineDotsHorizontal color='white' size={30}/>
      </div>
      {
        openEdit && 
        (
          <div className='bg-black border border-white text-white absolute top-6 right-2 p-2 text-sm'>
            <div onClick={() => dispatch(deleteDataFunc(dt?.id))} className='cursor-pointer'>Sil</div>
            <div onClick={updateFunc} className='cursor-pointer'>Güncelle</div>
          </div>
        )
      }
    </div>
  )
}

export default ProductCard