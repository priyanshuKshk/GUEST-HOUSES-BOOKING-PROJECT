import React, { useState } from 'react'
import Header from './Header'

import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  return (
    
           <div>
        <Header toggleSidebar={toggleSidebar} />
        <main>
            <Outlet/>
        </main>
        <Footer/>
        </div>

    
  )
}
