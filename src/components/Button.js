import React from "react";

const Button = (props) => {

    const handlerClick = () => {
        //console.log('Button handlerClick')
        if (props.onClick) {
            props.onClick()
        }
    }

    return (
        <>
            <div >
                <button className="flex justify-center w-11/12 h-12 items-center mx-2 my-3 bg-inherit border-[#f56a6a] border-[1px] rounded-2xl hover:text-lg hover:font-semibold hover:bg-[#fef7f7] hover:text-inherit " 
                    onClick={handlerClick} >{props.children} </button>
            </div>
        </>
    )
}

export { Button }
