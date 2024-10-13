import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { sidebarLinks } from '../constant'
import cn from 'classnames'
import Footer from './Footer'
const Sidebar = ({user}) => {
    const location = useLocation()
    const pathname = location.pathname
    return (
        <section className="sidebar">
            <nav className="flex flex-col gap-4">
                <Link to='/' className='mb-12 cursor-pointer flex items-center' >
                    <img src="/icons/logo.svg" alt="logo" />
                    <h1 className="sidebar-logo">SMC</h1>
                </Link>

                {sidebarLinks.map(item => {
                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

                    return (
                        <Link to={item.route} key={item.label}
                            className={cn('sidebar-link', { 'bg-bank-gradient': isActive })}
                        >
                            <div className='relative size-6'>
                                <img src={item.imgURL} alt={item.label} className={cn(
                                    { 'brightness-[3] invert-0': isActive }
                                )} />
                            </div>
                            <p className={cn("sidebar-label", { "!text-white": isActive })}>
                                {item.label}
                            </p>
                        </Link>
                    )
                })}
            </nav>

            <Footer user={user} type="desktop" />
        </section>
    )
}

export default Sidebar