import React from 'react'
import Navbar from './components/display/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/display/Footer'

export default function Layout() {
  return (
    <>
        < Navbar />
        < Outlet />
        < Footer />
    </>
  )
}
