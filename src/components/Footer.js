import React from 'react'

export const Footer = () => {
    return (
        <div className='bg-dark p-3'>
           <h5 className='text-white text-center font-weight-bolder'>Bimms  © {(new Date).getFullYear()}</h5> 
        </div>
    )
}
