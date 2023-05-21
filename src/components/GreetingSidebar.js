import React from 'react'
import { GreetingCard } from './GreetingCard'

function GreetingSidebar() {
    return (
        <div >
            <div className='w-[90%] mx-auto my-4 text-md font-bold text-gray-700'>ვულოცავთ დაბადების დღეს</div>
            <GreetingCard ></GreetingCard>
            <GreetingCard ></GreetingCard>
            <GreetingCard ></GreetingCard>
            {/* <GreetingCard ></GreetingCard>
            <GreetingCard ></GreetingCard>
            <GreetingCard ></GreetingCard>
            <GreetingCard ></GreetingCard> */}
        </div>
    )
}

export { GreetingSidebar }
