import React from "react"

const GreetingCard = (props) => {
    return (
        <div className='flex items-center justify-center bg-white border rounded-lg w-[90%] h-28 mx-auto my-4'>
            <div className='flex items-center justify-center  w-2/6 '>
                <div >
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBQjCw_yRluPgaBlB3IR4R_ijPQDP36SCuAg&usqp=CAU" className="border-0 rounded-full" width="72" height="auto" alt="" />
                </div>
            </div>
            <div className='bg-white w-4/6'>
                <div className="my-2 text-xs">სახელი გვარი</div>
                <div className="my-2 text-xs">32 მაისი</div>
                <div className="my-2 text-xs">1234</div>
            </div>
        </div>
    )
}

export { GreetingCard }
