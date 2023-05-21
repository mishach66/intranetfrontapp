import React from 'react'
import { Navbar } from './Navbar'
import { MenuSidebar } from './MenuSidebar'
import { GreetingSidebar } from './GreetingSidebar'
import { Footer } from './Footer'

export const Layout = ({ children }) => {
  return (
    <div >
      <div className='container mx-auto min-h-screen'>
        <Navbar />
        {/* <div className='flex min-h-[calc(100vh-14.25rem)] sm:flex-wrap'>  */}
        <div className='flex '> 
          <div className='w-[17%] bg-[#f5f6f7] '>
            <MenuSidebar />
          </div>

          {/* bg-slate-400 */}
          <div className='w-[58%] bg-white text-gray-600 '>
            {children}
          </div>

          <div className='w-[25%] bg-[#f5f6f7] '>
            <GreetingSidebar/>
          </div>

        </div>
        <Footer />
      </div>
    </div>
  )
}
