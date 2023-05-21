import React, { useState, useEffect } from 'react'
import { useQuery, QueryClient, useQueries, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom'
import Moment from 'react-moment'
import { Button } from '../../components/Button'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import * as Loader from "react-loader-spinner"
import Timeout from "await-timeout";
import { getNewsById } from '../../newsApi'

// const getNewsById = async ({ id }) => {
    
//     const response = await fetch(`https://localhost:7071/api/News/newsById/${id}`)
    
//     if (!response.ok) {
//       throw new Error("Something went wrong.")
//     }

//     return await response.json()
// }

function GetNewsById() {
    //const {id} = useParams()
    const {id} = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    let editButtonclicked = false

    // const [ newsByIdQuery ] = useQueries({
    //     queries: [
    //         {
    //             queryKey: ["newsById"],
    //             // queryFn: async () => {
    //             //     const rst = await Timeout.set(3000).then(() => getNewsById({id}))
    //             //     //console.log(rst)
    //             //     return rst
    //             // },
    //             queryFn: () => getNewsById({id})
    //         },
    //     ]
    // })

    //const newsByIdQuery = useQuery({queryKey: ["newsById", {id}], queryFn: () => getNewsById({id}) })
    const useNewsById = () => useQuery({queryKey: ["newsById", {id}], queryFn: () => getNewsById({id}) })
    const newsByIdQuery = useNewsById()

    // const { mutateAsync, isLoading: isMutation } = useMutation(removeNews) //გავასწორო isLoading redeclaration-ის შეცდომა
    
    //const { mutateAsync } = useMutation(removeNews)
    const { mutateAsync } = useMutation(async (id) => {
        const response = await fetch(`https://localhost:7071/api/News/deleteNews/${id}`, {method: "DELETE"})
      
        if(!response.ok) {
          throw new Error(response.json().message)
        }
    
        return true
    },{
        onSuccess: () => {queryClient.invalidateQueries(['allnews'])
            toast.success('სიახლე წარმატებით წაიშალა', {
                theme: 'colored'
            })},
        onError: () => {
            toast.error('წაშლისას მოხდა შეცდომა!', {
                theme: 'colored'
            })}
    })


    const { data, error, isLoading, isError } = newsByIdQuery
    if(isLoading) {
        return (
            <div className="flex justify-center">
                <Loader.ThreeCircles color="red" height="100" width="100" />
            </div>
    )}
    if(isError) {
        return <span>Error: {error.message}</span>
    }

    const editButtonHandlerClick = () => {
        editButtonclicked = true
        console.log('editButton CLICKED from GetNewsById !!!')
    }

    const removeButtonHandlerClick = () => {
        const swl = Swal.fire({
            title: 'ნამდვილად გსურთ სიახლის წაშლა?',
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
            // const removeResult = mutateAsync(id)
            if (result.isConfirmed ) {
                mutateAsync(id)
                
                // Swal.fire('ჩანაწერი წარმატებით წაიშალა', '', 'success');
                // Swal.fire({toast: true, text: 'წარმატებით წაიშალა!'});
            } 
            else if (result.isDismissed) {
                //Swal.fire('მონაცემი არ წაიშალა', '', 'error')
                toast.warning('თქვენ არ წაშალეთ სიახლე', {
                    theme: 'colored'
                })
            }
            else {
                // Swal.fire('მოხდა შეცდომა', '', 'error')
                toast.error('წაშლისას მოხდა შეცდომა', {
                    theme: 'colored'
                })
            }
        })
        .then(() => navigate('/'))
    }

    return (
        <div className='min-h-[calc(100vh-259px)]'>
            <div className="font-semibold">
                {/* data?.date.toLocaleDateString() */}
                <Moment date={newsByIdQuery.data?.date} format='D MMM YYYY' />
            </div>
            <div className="font-bold">
                {newsByIdQuery.data?.title}
            </div>
            <div className="italic bg-neutral-700 text-blue-gray-900 p-2 text-justify">
                {newsByIdQuery.data?.content}
            </div>

            <div className='flex justify-between'>
                <div className='w-1/3'>
                    <Button onClick={editButtonHandlerClick}>
                        <Link to={`/EditNews/${id}`} className='hover:text-lg hover:text-inherit'>
                            <div className=''>
                                { editButtonclicked ? <Loader.ThreeDots color="red" height={10} /> : "რედაქტირება" }
                            </div>
                        </Link>
                    </Button>
                </div>
                <div className='w-1/3'>
                    <Button onClick={removeButtonHandlerClick}>წაშლა</Button>
                </div>
            </div>
        </div>
    );
}

export { GetNewsById };
