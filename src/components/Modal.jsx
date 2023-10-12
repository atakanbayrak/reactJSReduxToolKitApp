import React, { useState } from 'react'
import {AiOutlineCloseCircle} from "react-icons/ai"
import { useDispatch } from 'react-redux'
import { modalFunc } from '../redux/modalSlice'
import Input from './Input'
const Modal = ({title, content, btnText, btnFunc}) => {
    const dispatch = useDispatch()

    const [productInfo, setProductInfo] = useState({name:"",price:"",url:""})
    const onChangeFunc = (e,type) => {
        if(type === "url"){
            setProductInfo(prev =>({...prev, [e.target.name]: URL.createObjectURL(e.target.files[0])}))
        }else {
            setProductInfo(prev =>({...prev, [e.target.name]: e.target.value}))
        }
    }
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-screen flex items-center justify-center'>
        <div className='w-1/3 bg-white shadow-lg rounded-md p-4'>
            <div className='border-b py-3 flex items-center justify-between'>
                <div className='text-2xl'>{title}</div>
                <AiOutlineCloseCircle onClick={() => dispatch(modalFunc())} size={24}></AiOutlineCloseCircle>
            </div>
            <Input placeholder={"Ürün Ekle"} type={"text"} name={"name"} id={"1"} onChange={e => onChangeFunc(e, "name")} />
            <Input placeholder={"Fiyat Ekle"} type={"text"} name={"price"} id={"2"} onChange={e => onChangeFunc(e, "price")} />  
            <Input placeholder={"Resim Seç"} type={"file"} name={"url"} id={"3"} onChange={e => onChangeFunc(e, "url")} />
      
        </div>
    </div>
  )
}

export default Modal