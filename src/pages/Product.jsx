import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../components/Modal'
import Input from '../components/Input'
import Button from '../components/Button'
import { createDataFunc, updateDataFunc } from '../redux/dataSlice.js'
import { modalFunc } from '../redux/modalSlice'
import { useLocation } from 'react-router-dom'

const Product = () => {
  const { modal } = useSelector(state => state.modal)
  const { data } = useSelector(state => state.data)
  console.log(modal, "modal")

  const dispatch = useDispatch()
  const location = useLocation()

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
        console.log(loc, "use effect içerisi loc degeri")
        const foundData = await data.find(dt => dt.id == loc)
        console.log(productInfo, "loc tıklaması sonrası")
        if (foundData) {
          console.log("asdasd")
          setProductInfo(foundData);
        }
      }
    };
  
    fetchData();
  }, [loc,data]);

  const buttonFuncUpdate = () => {
    console.log(loc, "buttonfuncupdate içerisi loc")
    dispatch(updateDataFunc({...productInfo, id: loc}))
    dispatch(modalFunc())
  }
  
  const buttonFunc = () => {
    console.log(loc, "buttonfunc içerisi loc")
    dispatch(createDataFunc({ ...productInfo, id: data.length + 1 }))
    console.log(productInfo.id, "dataid degeri buttonfuncici")
    console.log(productInfo, "create sonrası")
    dispatch(modalFunc())
  }

  const contentModal = (
    <>
      <Input value={productInfo.name} type={"text"} placeholder={"Ürün Ekle"} name={"name"} id={"1"} onChange={e => onChangeFunc(e, "name")} />
      <Input value={productInfo.price} placeholder={"Fiyat Ekle"} type={"text"} name={"price"} id={"2"} onChange={e => onChangeFunc(e, "price")} />
      <Input placeholder={"Resim Seç"} type={"file"} name={"url"} id={"3"} onChange={e => onChangeFunc(e, "url")} />
      <Button btnText={loc ? "Güncelle" : "Oluştur"} onClick={loc ? buttonFuncUpdate : buttonFunc}></Button>
    </>
  )

  return (
    <div>

      <div className='flex items-center flex-wrap'>
        {
          data?.map((dt, i) => (
            <ProductCard key={i} dt={dt} />
          ))
        }
      </div>

      {modal && <Modal content={contentModal} title={loc ? "Ürün Güncelle" : "Ürün Oluştur"} />}
    </div>
  )
}

export default Product

