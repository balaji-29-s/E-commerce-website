import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
const HomePage = () => {
  const [products,setProducts]=useState([]);
  useEffect(()=>{
    axios.get('http://localhost:1234/products')
    .then((res)=>{
      setProducts(()=>res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  }, [])
  return (
    <div>
      <ProductList products={products}/>
    </div>
  )
}

export default HomePage
