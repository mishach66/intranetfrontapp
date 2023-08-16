import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, QueryClient, useQueries, useMutation, useQueryClient } from "@tanstack/react-query"
import Moment from 'react-moment'
import { Button } from './Button'
import Swal from 'sweetalert2'
import { Tooltip } from "@material-tailwind/react"
import * as Loader from "react-loader-spinner"
import { toast } from 'react-toastify'
import { configure } from '@testing-library/react'
import Timeout from "await-timeout"

export const NewsItemclamped = (props) => {
    const {id} = props
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    let editButtonclicked = false
    
    const { mutateAsync, isLoading: isMutatingNewsDelete } = useMutation(async (id) => {
        const response = await fetch(`https://localhost:7071/api/News/deleteNews/${id}`, {method: "DELETE"})
    
        if(!response.ok) {
        throw new Error(response.json().message)
        }

        return true
    },{
        onSuccess: () => queryClient.invalidateQueries(['allnews']),
    })

    const editButtonHandlerClick = () => {
        editButtonclicked = true
    }

    const removeButtonHandlerClick = () => {
        const sw = Swal.fire({
            title: 'ნამდვილად გსურთ სიახლის წაშლა?',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonColor: '#00cc66',
            confirmButtonText: "დიახ",
            cancelButtonText: "არა",
            icon: 'warning',
            //toast: true
            //showLoaderOnConfirm: true,
        }
        )
        .then((result) => {
            // const removeResult = mutateAsync(id)
    
            if (result.isConfirmed ) {
                mutateAsync(id)
                toast('სიახლე წარმატებით წაიშალა')
                //Swal.fire('ჩანაწერი წარმატებით წაიშალა', '', 'success');
                // Swal.fire({toast: true, text: 'წარმატებით წაიშალა!'});
            } 
            // else if (!result.isConfirmed) {
            //     Swal.fire('მონაცემი არ წაიშალა', '', 'error')
            // } 
            else {
                // Swal.fire('მოხდა შეცდომა', '', 'error')
            }
        })
        .then(() => navigate('/'))
    }


    return (
            <>
                <div className='border-b-2 rounded-2xl border-red-300 my-2'>
                    <div key={props.id} className='line-clamp-4'>
                        <div className="font-bold  m-1 py-1 px-2 bg-[#ff4e4e] opacity-100 border rounded-t-lg text-white">{props.author}</div>
                        <div className="font-semibold py-1 pl-2 text-gray-900">{props.title}</div>
                        <Tooltip className='bg-indigo-800 text-white text-md p-2' content="გაიგე მეტი...">
                            <Link to={`/newsById/${id}`} state={{title: props.title, author: props.author, content: props.content}} >
                                {/* <span className="inline-block px-2 italic text-justify ">{props.content}</span> */}
                                <div >
                                    <div className="text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-300 px-2 italic text-justify hover:text-[#f56a6a] line-clamp-4">{props.content}</div>
                                </div>
                                {/* <div className="px-2 italic text-justify hover:text-[#f56a6a] line-clamp-6 ">{props.content}</div> */}
                            </Link>
                        </Tooltip>
                        {/* <Link to={`/newsById/${props.id}`} >
                            <span className="italic">{props.content}</span>
                        </Link> */}
                    </div>
                    <div className='flex justify-between'>
                        <div className='w-1/3 '>
                            <Button onClick={editButtonHandlerClick} >
                                <Link to={`/EditNews/${id}`} state={{title: props.title, author: props.author, content: props.content}} className='hover:text-lg hover:text-inherit'>
                                    <div className=''>
                                        { editButtonclicked ? <Loader.ThreeDots color="red" height={10} /> : "რედაქტირება" }
                                    </div>
                                </Link>
                            </Button>
                        </div>

                        <div className='w-1/3 '>
                            <Button onClick={removeButtonHandlerClick} >
                                <div >
                                    { isMutatingNewsDelete ? <Loader.ThreeDots color="red" height={10} /> : "წაშლა" }
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </>
    )
}
