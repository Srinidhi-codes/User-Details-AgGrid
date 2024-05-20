import React from 'react'
import { logout } from '../redux/auhSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import Logo from '../assets/logo.png'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout());
        toast.success('Logged Out Successfully')
    };
    return (
        <>
            <div className='flex justify-around items-center px-[5rem]'>
                <Link to='/'><img src={Logo} alt="" /></Link >
                <ul className='w-full h-[5rem] flex justify-center items-center gap-x-[5rem] text-[2rem] font-medium'>
                    <li className='hover:text-black/60 hover:underline cursor-pointer'>Home</li>
                    <li onClick={handleLogout} className='hover:text-black/60 hover:underline cursor-pointer'>Logout</li>
                </ul>
            </div >
        </>
    )
}

export default Navbar