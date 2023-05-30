import React from 'react'
import { GreetingCard } from './GreetingCard'

function GreetingSidebar() {
    return (
        <div className=''>
            <div className=' w-[100%] mx-auto py-4 pl-4 text-md font-bold text-gray-700 bg-[#f5f6f7]'>
                ვულოცავთ დაბადების დღეს
            </div>
            <div className=''>
                <GreetingCard ></GreetingCard>
                <GreetingCard ></GreetingCard>
                <GreetingCard ></GreetingCard>

                {/* <GreetingCard ></GreetingCard>
                <GreetingCard ></GreetingCard>
                <GreetingCard ></GreetingCard>
                <GreetingCard ></GreetingCard>
                <GreetingCard ></GreetingCard>
                <GreetingCard ></GreetingCard>
                <GreetingCard ></GreetingCard>
                <GreetingCard ></GreetingCard>
                <GreetingCard ></GreetingCard> */}
                
            </div>
            <div className='h-screen'></div>
        </div>
    )
}

export { GreetingSidebar }
