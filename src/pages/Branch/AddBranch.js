import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Card, Input, Checkbox, Button as MTButton, Typography, Textarea } from "@material-tailwind/react"
import { Button } from '../../components/Button'
import { useForm, useController } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as Loader from "react-loader-spinner"
import { useQuery, QueryClient, useQueries, useMutation, useQueryClient } from "@tanstack/react-query"
import Select, { StylesConfig } from 'react-select'
import { getAllCities } from './branchApi';
import { createBranch } from './branchApi';

function AddBranch() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { data, error, isLoading, isError } = useQuery(["allcities"], getAllCities, { })
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm()

    const { field } = useController({ name: 'city', control })
    const { value: cityValue, onChange: cityOnChange, ...restCityField } = field
    
    let options = []
    data?.map((el) => {
        options.push({
            value: el,
            label: el.name
        })
    })

    options.sort((a, b) => {
        if (a.label < b.label) {
            return -1
        } else if (a.label > b.label) {
            return 1
        }
        return 0
    })
    const capitalCityName = 'თბილისი'
    const findCapitalCityIdx = options.findIndex(el => el.label === capitalCityName)
    const capitalCity = options.splice(findCapitalCityIdx, 1)
    options = capitalCity.concat(options)

    const { mutateAsync, isLoading: isMutatingBranchAdd } = useMutation(createBranch, {onSuccess: () => {
        // queryClient.invalidateQueries(['allnews'])
    }})

    const onSubmit = async (data) => {
        await mutateAsync({
            "address": data.address,
            "fullAddress": `${data.city.name}, ${data.address}`,
            "cityId": data.city.id
        })
        reset()
        //navigate('/')
    }

    return (
        <div className='mx-auto w-4/5 min-h-[calc(100vh-267px)]'>
            <Card color="transparent" shadow={false} className='mt-2'>
                <Typography variant="h4" color="blue-gray">
                    ფილიალის დამატება
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 mb-2 w-100 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-6">

                    <Select
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                //borderColor: state.isFocused ? 'red' : '',
                                borderColor: '#dee2e6',
                                height: '2.75rem',
                                borderRadius: 5,
                                "&:hover": {
                                    borderColor: "none",
                                  },
                                //backgroundColor: 'yellowgreen'
                                // color: 'red'
                            }),
                            option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                                return {
                                  ...styles,
                                  color: '#607d8b',
                                  //backgroundColor: isDisabled ? 'red' : 'blue',
                                  //cursor: isDisabled ? 'not-allowed' : 'default'
                                }
                            },
                            singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#607d8b" }),
                            placeholder: (defaultStyles) => ({ ...defaultStyles, color: "#607d8b" }),
                        }}
                        className='select-input text-sm text-[#455a64] '
                        
                        placeholder="ქალაქი"
                        isClearable
                        isSearchable
                        options={options}
                        value={cityValue ? options.find(x => x.value === cityValue) : null}
                        defaultValue={options[0]}
                        // required
                        onChange={option => cityOnChange(option ? option.value : option)}
                        {...restCityField}
                    />

                    <Input size="lg" label="მისამართი" className='text-[#607d8b] ' {...register('address', {
                            required: true,
                        })} />
                    {errors.address && errors.address.type === 'required' && (
                        <p className='text-red-500 font-bold'>გთხოვთ, მიუთითოთ მისამართი</p>
                    )}
                    </div>

                    <div >
                        <Button type='submit' className="mt-6 " fullWidth>
                            { isMutatingBranchAdd ? <Loader.ThreeDots color="red" height={10} /> : "დამატება" }
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
      )
}

export { AddBranch }
