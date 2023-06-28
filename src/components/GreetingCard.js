import React from "react"

const GreetingCard = (props) => {
    return (
        <div className='flex items-center justify-center bg-white border rounded-lg w-[90%] h-28 mx-auto my-4'>
            <div className='flex items-center justify-center  w-2/6 '>
                <div >
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCGfa9cIG5USunpHOXJBzKEkfkQ2wAmmdJPS7C6LSfr_oJg_vHYf2NeJHJJ02OKC3wAWM&usqp=CAU" className="border-0 rounded-full" width="72" height="auto" alt="" />
                </div>
            </div>
            <div className='bg-white w-4/6'>
                <div className="my-2 text-xs">სახელი გვარი</div>
                <div className="my-2 text-xs">დაბადების თარიღი</div>
                <div className="my-2 text-xs">შიდა ნომერი</div>
            </div>
        </div>
    )
}

export { GreetingCard }
