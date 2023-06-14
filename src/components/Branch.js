import React from "react"
import { useQuery, QueryClient, useQueries, useMutation, useQueryClient } from "@tanstack/react-query"
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom'
import * as Loader from "react-loader-spinner"
import { EditBranch } from "../pages/Branch/EditBranch"
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { removeBranch } from "../pages/Branch/branchApi"

const Branch = ({fullAddress, id, address, cityId}) => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { mutateAsync } = useMutation(async (id) => {
        await removeBranch(id)
    },{
        onSuccess: () => {queryClient.invalidateQueries(['pagedbranchlist'])
            toast.success('ფილიალი წარმატებით წაიშალა!', {
                theme: 'colored'
            })},
        onError: () => {
            toast.error('ფილიალის წაშლისას მოხდა შეცდომა!', {
                theme: 'colored'
            })}
    })
    
    let editButtonclicked = false

    const editButtonHandlerClick = () => {
        editButtonclicked = true
    }

    const removeButtonHandlerClick = () => {
        const swl = Swal.fire({
            title: 'ნამდვილად გსურთ ფილიალის წაშლა?',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonColor: '#00cc66',
            confirmButtonText: "დიახ",
            cancelButtonText: "არა",
            icon: 'warning',
            // toast: true
            //showLoaderOnConfirm: true,
        }
        )
        .then((result) => {
            if (result.isConfirmed ) {
                mutateAsync(id)
            } 
            else if (result.isDismissed) {
                toast.warning('თქვენ არ წაშალეთ ფილიალი', {
                    theme: 'colored'
                })
            }
            else {
                toast.error('ფილიალის წაშლისას მოხდა შეცდომა', {
                    theme: 'colored'
                })
            }
        })
        //.then(() => navigate('/branchlist/'))
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
            
            <div>
                <button onClick={removeButtonHandlerClick}>
                    <AiFillDelete className='text-2xl text-gray-500' />
                </button>
                
            </div>
        </div>
    </div>
    )
}

export { Branch }
