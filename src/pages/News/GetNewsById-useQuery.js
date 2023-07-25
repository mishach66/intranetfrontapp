import React, { useState, useEffect } from 'react';
import { useQuery, QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Moment from 'react-moment'
import { Button } from '../../components/Button';
import Swal from 'sweetalert2'

const newsById = async ({ queryKey }) => {
    const [_key, { id }] = queryKey
    const response = await fetch(`https://mhrp2.azurewebsites.net/api/News/newsById/${id}`);
    
    if (!response.ok) {
      throw new Error("Something went wrong.");
    }

    return await response.json()
}

// const removeNews = async (id) => {
//     const response = await fetch(`https://mhrp2.azurewebsites.net/api/News/deleteNews/${id}`, {method: "DELETE"})
  
//     if(!response.ok) {
//       throw new Error(response.json().message)
//     }

//     return true
// }

function GetNewsById() {
    const {id} = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { data, error, isLoading, isError } = useQuery(["newsById", {id}], newsById)
    // const { mutateAsync, isLoading } = useMutation(removeNews) //გავასწორო isLoading redeclaration-ის შეცდომა
    
    //const { mutateAsync } = useMutation(removeNews)
    const { mutateAsync } = useMutation(async (id) => {
        const response = await fetch(`https://mhrp2.azurewebsites.net/api/News/deleteNews/${id}`, {method: "DELETE"})
      
        if(!response.ok) {
          throw new Error(response.json().message)
        }
    
        return true
    })

    const editButtonHandlerClick = () => {

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
            // toast: true
            //showLoaderOnConfirm: true,
        }
        )
        .then((result) => {
            // const removeResult = mutateAsync(id)
    
            if (result.isConfirmed ) {
                const removeResult = mutateAsync(id)
                Swal.fire('ჩანაწერი წარმატებით წაიშალა', '', 'success');
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
            <div className="font-semibold">
                {/* data?.date.toLocaleDateString() */}
                <Moment date={data?.date} format='D MMM YYYY' />
            </div>
            <div className="font-bold">
                {data?.title}
            </div>
            <div className="italic bg-neutral-700 text-white p-2 text-justify">
                {data?.content}
            </div>

            <div className='flex'>
                <div className='w-1/3'>
                    <Button onClick={editButtonHandlerClick}>რედაქტირება</Button>
                </div>
                <div className='w-1/3'>
                    <Button onClick={removeButtonHandlerClick}>წაშლა</Button>
                </div>
            </div>
        </>
    );
}

export { GetNewsById };
