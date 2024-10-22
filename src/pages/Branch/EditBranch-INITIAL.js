import React from "react"
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useQuery, QueryClient, useQueries, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAllCities, editBranch } from './branchApi'
import { Card, Input, Checkbox, Button as MTButton, Typography, Textarea } from "@material-tailwind/react"
import Select, { StylesConfig } from 'react-select'
import * as Loader from "react-loader-spinner"
import { useForm, useController } from 'react-hook-form'
import { Button } from '../../components/Button'
import { toast } from 'react-toastify'

const EditBranch = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const location = useLocation()
    const { fullAddress, address, id, cityId } = location.state

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm()

    const { data, error, isLoading, isError } = useQuery(["allcities"], getAllCities, { })

    let options = []
    data?.map((el) => {
        options.push({
            value: el,
            label: el.name,
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

    const currentCity = options.find(el => el.value.id === cityId)
    //console.log(currentCity)

    const { field } = useController({ name: 'city', control })
    const { value: cityValue=currentCity, onChange: cityOnChange, ...restCityField } = field
    console.log(cityValue)

    const { mutateAsync, isLoading: isMutatingBranchAdd } = useMutation(editBranch, {
        onSuccess: () => {
            // queryClient.invalidateQueries(['allnews'])
            toast.success('ფილიალი წარმატებით დარედაქტირდა', {
                theme: 'colored'
            })},
        onError: () => {
            toast.error('ფილიალის რედაქტირებისას მოხდა შეცდომა!', {
                theme: 'colored'
            })}
    })

    const onSubmit = async (data) => {
        await mutateAsync({
            "id": id,
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
                ფილიალის რედაქტირება
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 mb-2 w-100 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">

                <Select
                    defaultValue={currentCity}

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

                    {...register('city', {
                        required: true,
                    })}
                    placeholder="ქალაქი"
                    isClearable
                    isSearchable

                    options={options}

                    value={cityValue ? options.find(x => x.value === cityValue) : currentCity}

                    // required
                    onChange={option => cityOnChange(option ? option.value : option)}
                    {...restCityField}
                />
                {errors.city && errors.city.type === 'required' && (
                    <p className='text-red-500 font-bold'>გთხოვთ, მიუთითოთ ქალაქი</p>
                )}

                <Input size="lg" label="მისამართი" defaultValue={address} className='text-[#607d8b] ' {...register('address', {
                        required: true,
                    })} />
                {errors.address && errors.address.type === 'required' && (
                    <p className='text-red-500 font-bold'>გთხოვთ, მიუთითოთ მისამართი</p>
                )}
                </div>

                <div >
                    <Button type='submit' className="mt-6 " fullWidth>
                        { isMutatingBranchAdd ? <Loader.ThreeDots color="red" height={10} /> : "შეცვლა" }
                    </Button>
                </div>
            </form>
        </Card>
    </div>

    )
}

export { EditBranch }
