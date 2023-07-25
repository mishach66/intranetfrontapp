import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Card, Input, Checkbox, Button as MTButton, Typography, Textarea} from "@material-tailwind/react"
import { Button } from '../../components/Button'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as Loader from "react-loader-spinner"
import { useQuery, QueryClient, useQueries, useMutation, useQueryClient } from "@tanstack/react-query"

// const createNews = async (data) => {
//     console.log('onSubmit დატა არის  ' + data.title + ' ' + data.author + ' ' + data.content + ' ' + data.date + ' ' + data.hyperlink )
//     const response = await fetch('https://mhrp2.azurewebsites.net/api/News/createNews', {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify(data)
//   })

//   if(!response.ok) {
//     throw new Error(response.json().message)
//   }

//   return await response.json()
// }

function CreateNews() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    // const { mutateAsync, isLoading } = useMutation({
    //     createNews,
    //     onSuccess: () => {
    //         console.log('წარმატება')
    //         queryClient.invalidateQueries(['allnews'])
    //     }
    // })

    // const { mutateAsync, isLoading } = useMutation(createNews)
    const { mutateAsync, isLoading: isMutatingNewsAdd } = useMutation(
        async (data) => {
            const response = await fetch('https://mhrp2.azurewebsites.net/api/News/createNews', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
        
          if(!response.ok) {
            throw new Error(response.json().message)
          }
        
          return await response.json()
        },{
            onSuccess: () => {
                queryClient.invalidateQueries(['allnews'])
            },
        }
    )

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    const onSubmit = async (data) => {
        const currentDate = new Date()
        await mutateAsync({
            "title": data.title,
            "author": data.author,
            "date": currentDate.toJSON(),
            "content": data.content,
            "hyperlink": "unnecessary hyperlink"
        })
        reset()
        navigate('/')
    }
    
    return (
        <div className='mx-auto w-4/5 min-h-[calc(100vh-267px)]'>
            <Card color="transparent" shadow={false} className='mt-2'>
                <Typography variant="h4" color="blue-gray">
                    სიახლის დამატება
                </Typography>
                {/* <Typography color="gray" className="mt-1 font-normal">
                    Enter your details to register.
                </Typography> */}
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 mb-2 w-100 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-6">
                        <Input size="lg" name='title' label="სათაური" {...register('title', {
                            required: true,
                            minLength: 10,
                        })} />
                        {errors.title && errors.title.type === 'required' && (
                            <p className='text-red-500 font-bold'>გთხოვთ, მიუთითოთ სათაური</p>
                        )}
                        {errors.title && errors.title.type === 'minLength' && (
                            <p className='text-red-500 font-bold'>სათაური უნდა იყოს 10 სიმბოლოზე მეტი</p>
                        )}

                        <Input size="lg" label="ავტორი" {...register('author')} />
                        <Textarea label='ტექსტი' rows={12} {...register('content')}></Textarea>
                    </div>

                    {/* <Checkbox
                    label={
                        (
                        <Typography
                            variant="small"
                            color="gray"
                            className="flex items-center font-normal"
                        >
                            I agree the
                            <a
                            href="#"
                            className="font-medium transition-colors hover:text-blue-500"
                            >
                            &nbsp;Terms and Conditions
                            </a>
                        </Typography>
                        )
                    }
                    containerProps={{ className: "-ml-2.5" }}
                    /> */}
                    <div >
                        <Button type='submit' className="mt-6 " fullWidth>
                            { isMutatingNewsAdd ? <Loader.ThreeDots color="red" height={10} /> : "დამატება" }
                        </Button>
                    </div>

                    {/* <Typography color="gray" className="mt-4 text-center font-normal">
                    Already have an account?{" "}
                    <a
                        href="#"
                        className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                    >
                        Sign In
                    </a>
                    </Typography> */}
                </form>
            </Card>
        </div>
      )
}

export { CreateNews };
