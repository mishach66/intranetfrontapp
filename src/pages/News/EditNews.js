import React, { useState, useEffect } from 'react'
import { Card, Input, Checkbox, Button as MTButton, Typography, Textarea} from "@material-tailwind/react"
import { Button } from '../../components/Button'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import * as Loader from "react-loader-spinner"
import { useQuery, QueryClient, useQueries, useMutation, useQueryClient } from "@tanstack/react-query"

function EditNews() {
    const {id} = useParams()
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const newsById = async ({ queryKey }) => {
        const [_key, { id }] = queryKey
        const response = await fetch(`https://mhrp2.azurewebsites.net/api/News/newsById/${id}`);
        
        if (!response.ok) {
          throw new Error("Something went wrong.");
        }
    
        return await response.json()
    }

    const { data, error, isLoading, isError } = useQuery(["editNewsById", {id}], newsById, { })
    queryClient.invalidateQueries(['editNewsById'])

    const { mutateAsync, isLoading: isMutatingNewsEdit } = useMutation(
        async (data) => {
            const response = await fetch(`https://mhrp2.azurewebsites.net/api/News/editNews/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
        
          if(!response.ok) {
            throw new Error(response.json().message)
          }
          return response.json()
        },{
            onSuccess: () => Promise.all([
                //queryClient.invalidateQueries(['allnews']),
                //queryClient.invalidateQueries(['editNewsById']),
            ]),
        }
    )

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        //setValue, // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    } = useForm()

    const onSubmit = async (data) => {
        const currentDate = new Date()
        //setValue() // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        await mutateAsync({
            "id": id,
            "title": data.title,
            "author": data.author,
            "date": currentDate.toJSON(),
            "content": data.content,
            "hyperlink": "unnecessary hyperlink"
        })
        reset()
        navigate('/')
    }

    // return (
    //     <div>Edit News</div>
    // )
    return (
        <div className='mx-auto w-4/5 min-h-[calc(100vh-267px)]'>
            <Card color="transparent" shadow={false} className='mt-2'>
                <Typography variant="h4" color="blue-gray">
                    სიახლის რედაქტირება
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 mb-2 w-100 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-6">
                        <Input size="lg" name='title' label="სათაური" defaultValue={data?.title} {...register('title', {
                            required: true,
                            minLength: 10,
                        })} />
                        {errors.title && errors.title.type === 'required' && (
                            <p className='text-red-500 font-bold'>გთხოვთ, მიუთითოთ სათაური</p>
                        )}
                        {errors.title && errors.title.type === 'minLength' && (
                            <p className='text-red-500 font-bold'>სათაური უნდა იყოს 10 სიმბოლოზე მეტი</p>
                        )}

                        <Input size="lg" name='author' label="ავტორი" defaultValue={data?.author} {...register('author', {
                            required: true,
                        })} />
                        {errors.author && errors.author.type === 'required' && (
                            <p className='text-red-500 font-bold'>გთხოვთ, მიუთითოთ ავტორი</p>
                        )}

                        <Textarea label='ტექსტი' rows={12} defaultValue={data?.content} {...register('content', {
                            required: true,
                        })}></Textarea>
                        {errors.content && errors.content.type === 'required' && (
                            <p className='text-red-500 font-bold'>გთხოვთ, შეიყვანოთ ტექსტი</p>
                        )}

                    </div>
                    <Button type='submit' className="mt-6 " >
                        { isMutatingNewsEdit ? <Loader.ThreeDots color="red" height={10} /> : "შენახვა" }
                    </Button>
                </form>
            </Card>
        </div>
    )
}

export { EditNews }
