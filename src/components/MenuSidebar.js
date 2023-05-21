import React from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function MenuSidebar() {
    return (
        <>
            <section >
                <div className="flex flex-col justify-center m-2 text-md font-normal whitespace-nowrap text-gray-800 ">
                    <Link to={'/'} >
                        {/* <Button title='თანამშრომლების სია'/> */}
                        <div className='mb-2 pb-3 hover:text-[#f56a6a] border-b-[1px] border-[#a8abad]'>თანამშრომლების სია</div>
                    </Link>
                    <Link to={'/'} >
                        <div className='mb-2 pb-3 hover:text-[#f56a6a] border-b-[1px] border-[#a8abad]'>ფილიალები</div>
                    </Link>
                    <Link to={'/'} >
                        <div className='mb-2 pb-3 hover:text-[#f56a6a] border-b-[1px] border-[#a8abad]'>ვაკანსიები</div>
                    </Link>
                </div>
                <div className='mt-16'>
                    <div className='flex flex-col justify-center m-2 text-md font-normal whitespace-nowrap text-gray-800'>
                        <span className='font-bold text-xl mb-3 text-gray-700  pt-2 pb-2 '>ადმინისტრატორი</span>
                        <Link to={'/addNews/'} >
                            <div className='mb-2 pb-3 hover:text-[#f56a6a] border-b-[1px] border-[#a8abad]'>სიახლეების დამატება</div>
                        </Link>
                        <Link to={'/addBranch/'} >
                            <div className='mb-2 pb-3 hover:text-[#f56a6a] border-b-[1px] border-[#a8abad]'>ფილიალის დამატება</div>
                        </Link>
                        <Link to={'/'} >
                            <div className='mb-2 pb-3 hover:text-[#f56a6a] border-b-[1px] border-[#a8abad]'>ვაკანსიის დამატება</div>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export { MenuSidebar }
