import React from "react"
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom'
import * as Loader from "react-loader-spinner"
import { EditBranch } from "../pages/Branch/EditBranch"

const Branch = ({fullAddress, id, address, cityId}) => {
    
    let editButtonclicked = false

    const editButtonHandlerClick = () => {
        editButtonclicked = true
    }

    return (
        <div className='flex justify-between items-center p-2 my-2 border-[1px] border-red-500 rounded-lg'>
        <div>{fullAddress}</div>
        <div className='flex flex-col '>
            <div >
                <Link to={`/EditBranch/${id}`} state={{ fullAddress, id, address, cityId }} className='hover:text-lg hover:text-inherit'>
                    <AiFillEdit className='text-2xl text-gray-500' >
                        {/* <div className=''>
                            { editButtonclicked ? <Loader.ThreeDots color="red" height={10} /> : "რედაქტირება" }
                        </div> */}
                    </AiFillEdit>
                </Link>
            </div>
            
            <div><AiFillDelete className='text-2xl text-gray-500' /></div>
        </div>
    </div>
    )
}

export { Branch }
