import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../components/Modal'
import Input from '../components/Input'
import Button from '../components/Button'
import { createDataFunc, updateDataFunc } from '../redux/dataSlice.js'
import { modalFunc } from '../redux/modalSlice'
import { useLocation, useNavigate } from 'react-router-dom'

const Product = () => {
  const { modal } = useSelector(state => state.modal)
  const { data, keyword } = useSelector(state => state.data)
  console.log(modal, "modal")

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  let loc = location?.search.split('=')[1]
  const [productInfo, setProductInfo] = useState({ name: "", price: "", url: ""})

  const onChangeFunc = (e, type) => {
    if (type === "url") {
      setProductInfo(prev => ({ ...prev, [e.target.name]: URL.createObjectURL(e.target.files[0]) }))
    } else {
      setProductInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
  }
  
  useEffect(() => {
    const fetchData = async () => {
      if (loc) {
        const foundData = await data.find(dt => dt.id == loc)
        if (foundData) {
          setProductInfo(foundData);
        }
      }
    };
  
    fetchData();
  }, [loc,data]);

  useEffect(() => {
    setProductInfo("/")
  }, [modal]);

  const buttonFuncUpdate = () => {
    dispatch(updateDataFunc({...productInfo, id: loc}))
    dispatch(modalFunc())
    //setProductInfo("")
    navigate("/")
  }
  
  const buttonFunc = () => {
    dispatch(createDataFunc({ ...productInfo, id: data.length + 1 }))
    dispatch(modalFunc())
    //setProductInfo("")
  }

  const contentModal = (
    <>
      <Input value={productInfo.name} type={"text"} placeholder={"Ürün Ekle"} name={"name"} id={"1"} onChange={e => onChangeFunc(e, "name")} />
      <Input value={productInfo.price} placeholder={"Fiyat Ekle"} type={"text"} name={"price"} id={"2"} onChange={e => onChangeFunc(e, "price")} />
      <Input placeholder={"Resim Seç"} type={"file"} name={"url"} id={"3"} onChange={e => onChangeFunc(e, "url")} />
      <Button btnText={loc ? "Güncelle" : "Oluştur"} onClick={loc ? buttonFuncUpdate : buttonFunc}></Button>
    </>
  )

  const filteredItems = data.filter(dt => dt.name.toLowerCase().includes(keyword.toLowerCase()))
  return (
    <div>

      <div className='flex items-center flex-wrap'>
        {
          filteredItems?.map((dt, i) => (
            <ProductCard key={i} dt={dt} />
          ))
        }
      </div>

      {modal && <Modal content={contentModal} title={loc ? "Ürün Güncelle" : "Ürün Oluştur"} />}
    </div>
  )
}

export default Product

