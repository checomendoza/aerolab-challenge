import Header from '../components/header'
import {useAppContext} from '../contexts/AppContext';
import {postPoints} from '../api/User'
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
export default function Account(){
    const { user, getDataUser, setRedeem } = useAppContext();
    const [loadingPoints, setLoadingPoints]=useState(false)
    const ref = useRef(null);

    const handlePostPoints = ()=>{
        
    setLoadingPoints(true)
    postPoints().then((res)=>{
        getDataUser()
        setLoadingPoints(false)
    })
}
useEffect(()=>{
    setRedeem(false)
    import("@lottiefiles/lottie-player");

}, [])
    return(
        <div className='h-full relative'>
            <Header />
            <div className='flex flex-col items-center w-full'>
                <div className='flex flex-col md:flex-row justify-around items-center md:w-1/2 w-full md:mt-3 bg-white rounded-xl px-5 shadow'>
                    <p className='text-2xl text-gray-700 py-3 text-center'>My Account: </p>
                    <p className='text-xl text-gray-500 ml-5'>{user.name} </p>
                    <p className='text-xl text-gray-500 ml-2'>{user.points}pts</p>
                    <div className='flex justify-center mb-1'>
                        {loadingPoints 
                        ?
                        <p className='text-xs p-3 bg-gray-400 text-white cursor-pointer w-28 rounded-3xl text-center'>Loading...</p>
                        :
                        <p className='text-xs p-3 bg-indigo-300 text-gray-700 cursor-pointer w-28 rounded-3xl text-center hover:bg-indigo-800 hover:text-white' onClick={()=>handlePostPoints()}>+1000 points</p>
                        }
                    </div>
                </div>
                <div>
             {user.redeemHistory
             ?
             <>
             <lottie-player
                    autoplay                    
                    id="womanLottie"
                    loop
                    ref={ref}
                    src='/animations/delivery.json'
                    style={{ height: "250px", marginTop:'1rem'}}
                  >
            </lottie-player>
            <p className='text-md text-gray-500 text-center my-2'>This is the list of your claimed products. We are already shipping.</p>
            </>
            :
            <>
            <lottie-player
                    autoplay                    
                    id="searchingLottie"
                    loop
                    ref={ref}
                    src='/animations/searching-women.json'
                    style={{ height: "250px", marginTop:'2rem'}}
                  >
                  </lottie-player>
                  <div className='flex flex-col text-center'>
                  <p className='text-lg text-gray-500 text-center my-2'>Hey! There are no products claimed by you</p>
                  <p className='text-md text-gray-500 text-center my-2'>Check out here</p>
                  <Link href='/'>
                  <a className='bg-skyblue px-5 py-3 rounded-xl text-white hover:bg-skyblue-dark'>Products</a>
                  </Link>
                  </div>
                </>
             } 
                
                </div>
                <div className='flex flex-col md:flex-row flex-wrap justify-center md:w-8/12 md:m-5'>
                    {/* <p className='text-2xl text-gray-500 py-3 text-center'>Redeem History</p> */}
                    {user.redeemHistory && user.redeemHistory.map((item, key)=>
                        <div key={key} className='flex bg-white m-3 md:w-5/12 rounded-xl'>
                            <div>
                                <img className='text-xl text-gray-900 md:ml-5' src={item.img.url} />
                            </div>
                            <div className='p-2 w-7/12'>
                            <p className='text-xl text-gray-800 md:ml-5'>{item.name}</p>
                            <p className='text-sm text-gray-600 md:ml-5'>{item.cost} points</p>
                            <p className='text-xs text-gray-400 md:ml-5 mt-14 font-light'>{item.createDate.slice(0,10)} | {item.createDate.slice(11,16)} Hs</p>
                            
                            </div>
                     
                        </div>
                    )}
                 
                </div>
            </div>
        </div>   
    )
}