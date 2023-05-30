import React from "react"
import { AiFillEdit } from "react-icons/ai"
import { AiFillDelete } from "react-icons/ai"

const Branch = ({fullAddress}) => {
    return (
        <div className='flex justify-between items-center p-2 my-2 border-[1px] border-red-500 rounded-lg'>
        <div>{fullAddress}</div>
        <div className='flex flex-col '>
            <div ><AiFillEdit className='text-2xl text-gray-500' /></div>
            <div><AiFillDelete className='text-2xl text-gray-500' /></div>
        </div>
    </div>
    )
}

export { Branch }
