import React from 'react'
import { Branch } from '../../components/Branch'
import { Card, Input, Checkbox, Button as MTButton, Typography, Textarea} from "@material-tailwind/react"
import Pagination from '../../components/Pagination'

const BranchList = () => {
    return (
        <div className='min-h-[calc(100vh-267px)]'>
            {/* <div className='flex justify-center border'>ფილიალები</div> */}
            <div className='mx-auto w-4/5 '>
                <Card color="transparent" shadow={false} className='mt-2'>
                    <Typography variant="h4" color="blue-gray" className='mb-3' >
                        ფილიალები
                    </Typography>
                    <Pagination />
                </Card>
            </div>
        </div>
    )
}

export default BranchList
