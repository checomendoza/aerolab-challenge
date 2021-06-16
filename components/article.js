import {useState} from 'react'
import { useAppContext} from '../contexts/AppContext';
import {postRedeem} from '../api/Products'


export default function Article(props){
    const [buy, setBuy]=useState(false)
    const [iconbuy, setIconBuy]=useState('/img/buy-blue.svg')
    const { user, setRedeem } = useAppContext();

    const showBuy = ()=>{
            setBuy(true)
            setIconBuy('/img/buy-white.svg')
    }
    const hideBuy = ()=>{
        setBuy(false)
        setIconBuy('/img/buy-blue.svg')
    }

    const handlePostRedeem =(item)=>{
        try{
        postRedeem(item._id).then((resp)=>{
            setRedeem(item)
            console.log(resp)
        })
        }
        catch(e)
        {
            console.log('===ERROR', e)
        }
    }

    return(
        <div className='md:w-1/5 w-80 flex flex-col justify-center bg-white mx-3  my-3 rounded-2xl py-3 relative cursor-pointer' onMouseOver={()=>showBuy()} onMouseLeave={()=>hideBuy()}>
           {(props.item.cost<user.points && buy )&& <div className='flex rounded-xl flex-col justify-center items-center bg-skyblue h-full w-full absolute bg-opacity-90'>
                <div className='flex'>
                    <p className='text-3xl text-white'>{props.item.cost}</p><img src='/img/coin.svg' className='ml-1 w-6' />
                </div>
                <div className='flex px-10 py-2 mt-2 bg-gray-200 rounded-2xl text-gray-500 cursor-pointer hover:bg-indigo-600 hover:text-white hover:shadow-lg' onClick={()=>handlePostRedeem(props.item)}>
                    <p>Redeem Now</p>
                </div>
            </div>}
            <span className='absolute right-0 top-0 mx-3 my-3 cursor-pointer'>
                {props.item.cost>user.points ? 
                <div className='flex items-center bg-gray-900 text-white px-2 py-2 rounded-xl bg-opacity-60'>
                    <p>You need {props.item.cost}</p><img src='/img/coin.svg' className='ml-1 w-6' />
                </div>
                :
                <img src={iconbuy}/>
                }
            </span>
            <img src={props.item.img.url} />
            <div className='flex flex-col align-center border-t border-gray-300 px-5 py-3'>
                <p className='text-gray-400'>{props.item.category}</p>
                <p className='text-gray-500 text-xl'>{props.item.name}</p>
            </div>
        </div>
    )
}