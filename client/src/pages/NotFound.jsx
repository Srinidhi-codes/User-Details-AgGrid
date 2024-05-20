import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <>
            <div className='flex flex-col gap-10 justify-center items-center bg-primary/30 h-[100vh]'>
                <h1 className='text-primary text-[2.5rem]'><span className='text-red-500'>404</span> : This Page is not found, please try other page.</h1>
                <Link to={'/'} className='bg-secondary text-white text-[1.5rem] p-5 rounded-[15rem]'>Go Back</Link>
            </div>
        </>
    )
}

export default NotFound