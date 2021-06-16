import {getProducts} from '../api/Products'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {useAppContext} from '../contexts/AppContext';

import Header from '../components/header'
import Image from 'next/image'
import Article from '../components/article'

export default function Index(){
    const [products, setProducts]=useState([])
    const [totProducts, setTotProductos]=useState(0)
    const [fromPage, setFromPage]=useState(0)
    const [toPage, setToPage]=useState(16)
    const ref = useRef(null);
    const { redeem, setRedeem } = useAppContext();


useEffect(()=>{
    getProducts().then((res)=>{
        setTotProductos(res.data)
       var arrayRes=res.data.slice(fromPage,toPage)
        setProducts(arrayRes)
        document.getElementById('recent').focus()
    })
    import("@lottiefiles/lottie-player");
},[]) 

const fordwardPage = ()=>{
  if(toPage<=products.length){
    setFromPage(fromPage+16)
    setToPage(toPage+16)
        setProducts(totProducts.slice(fromPage+16,toPage+16))
  }
 
}
const reversePage = ()=>{
  if(fromPage>0){  
  setFromPage(fromPage-16)
  setToPage(toPage-16)
  setProducts(totProducts.slice(fromPage-16,toPage-16))

  }
}

const sort = (type)=>{
    if(type=='recent'){
        var productsSort=[...products].sort(function (a, b) {
            if (a._id > b._id) {
              return 1;
            }
            if (a._id < b._id) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });
    }

    if(type=='lowprice'){
    var productsSort=[...products].sort(function (a, b) {
        if (a.cost > b.cost) {
          return 1;
        }
        if (a.cost < b.cost) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    }
    if(type=='highprice'){
    var productsSort=[...products].sort(function (a, b) {
        if (a.cost < b.cost) {
          return 1;
        }
        if (a.cost > b.cost) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    }


        setProducts(productsSort)
}

    return(
        <div className='h-full relative'>
            {redeem &&
            <div className='w-full h-full bg-skyblue z-50 absolute py-10'>
                <span className='py-3 px-4 m-10 top-10 sticky bg-gray-200 text-gray-500 rounded-full cursor-pointer hover:bg-gray-700 hover:text-white' onClick={()=>setRedeem(null)}>X</span>
                <div className='flex flex-col w-full top-40 items-center align-center sticky'>
                    <p className='text-4xl text-white font-bold'>Congratulations!</p>
                    <lottie-player
                    autoplay                    
                    id="giftLottie"
                    ref={ref}
                    src='/animations/gift.json'
                    style={{ height: "300px", marginTop:'-8rem'}}
                  >
                  </lottie-player>
                    <p className='text-xl text-gray-100 -mt-7'>You have claim a</p>
                    {/* <img src={redeem.img.url} className='rounded-xl'/> */}
                    <p className='text-2xl text-gray-600 my-1 font-bold'>{redeem.name}</p>
                    <p className='text-sm text-gray-600 my-1 font-light'>To see the list of claimed products, access your 
                    <Link href='/account'>
                    <a className='text-blue-500 curor-pointer'> account</a>
                    </Link>
                    </p>
                </div>                
            </div>
            }
            <Header />
            <div>
                <Image src='/img/header-x1.png'  layout='responsive' width='100%' height='30%' />
                <p className='flex text-5xl font-bold md:px-20 px-5 text-white absolute -mt-20'>Electronics</p>
            </div>
            <div className='flex flex-col md:flex-row justify-between h-20 md:px-40 items-center mt-5 w-full' >
              <div className='flex flex-col items-center md:w-2/12'>
                <p className='text-gray-500 text-2xl'>{toPage} of {totProducts.length} products</p>
                <div className='flex md:w-10/12 w-full justify-between mt-3 items-center'>
                  <img src='/img/arrow-left.svg' className='hover:bg-skyblue rounded-full cursor-pointer' onClick={()=>reversePage()}/>
                  <img src='/img/arrow-right.svg' className='hover:bg-skyblue rounded-full cursor-pointer' onClick={()=>fordwardPage()}/>
                </div>
              </div>
                <div className='flex items-center md:w-6/12 mt-3'>
                <p className='text-gray-500 md:text-2xl mx-3 md:block hidden'>Sort by:</p>
                    <button id='recent' className='bg-gray-300 text-gray-500 focus:bg-skyblue focus:outline-none focus:text-white px-3 py-2 mx-1 rounded-xl md:text-xl cursor-pointer' onClick={()=>sort('recent')}>Most recent</button>
                    <button id='lowprice' className='bg-gray-300 text-gray-500 focus:bg-skyblue focus:outline-none focus:text-white px-3 py-2 mx-1 rounded-xl md:text-xl cursor-pointer' onClick={()=>sort('lowprice')}>Lowest Price</button>
                    <button id='highprice' className='bg-gray-300 text-gray-500 focus:bg-skyblue focus:outline-none focus:text-white px-3 py-2 mx-1 rounded-xl md:text-xl cursor-pointer' onClick={()=>sort('highprice')}>Highest Price</button>
                </div>
            </div>
            <div className='flex flex-col md:mt-5 mt-20 md:flex-row flex-wrap justify-center items-center py-5 md:px-5'>
            {products && products.map((item)=>
            <Article key={item._id} item={item} />
            )}
            </div>    
        </div>
    )
}