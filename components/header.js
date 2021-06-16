import {useAppContext} from '../contexts/AppContext';
import Link from 'next/link'
import Image from 'next/image'
export default function Header(){
    const { user } = useAppContext();

    return(
        <div className='flex justify-between items-center bg-skyblue h-20 sticky top-0 z-40 px-7 py-3 absolute'>
            <Link href='/'>
                <a>
                    <Image width={40} height={40} src='/img/aerolab-logo.svg'/>
                </a>
            </Link>
            <div className='flex items-center'>
            <Link href='/account'>
                <a className='text-2xl text-gray-500 mx-3 hover:text-white'>
                {user.name}
                </a>
            </Link>
            <p className='flex text-2xl text-gray-500 bg-gray-200 py-2 px-4 rounded-3xl'>{user.points}
            <Image width={35} height={20} src='/img/coin.svg' className='ml-2 -mr-1 mt-1'/>
            </p>
            </div>
           
        </div>
    )
}