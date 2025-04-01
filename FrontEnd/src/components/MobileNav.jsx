import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Link, useLocation } from 'react-router-dom'
import { sidebarLinks } from '@/constant'
import cn from 'classnames'
import Footer from './Footer'
const MobileNav = ({ user }) => {
    const location = useLocation()
    const pathanme = location.pathname
    return (
        <div className='w-full max-w-[264px]'>
            <Sheet>
                <SheetTrigger>
                    <img src="/icons/hamburger.svg" alt="" width={30} height={30} />
                </SheetTrigger>
                <SheetContent>
                    <Link to='/' className='cursor-pointer flex items-center gap-1 px-4'>
                        <img src="/icons/logo.svg" alt="" width={34} height={34} />
                        <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">SMC</h1>
                    </Link>
                    <div className="mobilenav-sheet">
                        <SheetClose asChild>
                            <nav className='flex h-full flex-col gap-6 pt-16 text-white'>
                                {sidebarLinks.map(item => {
                                    const isActive = pathanme === item.route || pathanme.startsWith(`${item.route}/`)

                                    return (
                                        <SheetClose asChild key={item.route} >
                                            <Link to={item.route} key={item.label} className={cn('mobilenav-sheet_close w-full', { 'bg-bank-gradient': isActive })} >
                                                <img src={item.imgURL} width={20} height={20} className={cn({
                                                    'brightness-[3] invert-0': isActive
                                                })} />

                                                <p className={cn("text-16 font-semibold text-black-2", { "text-white": isActive })}>
                                                    {item.label}
                                                </p>
                                            </Link>
                                        </SheetClose>
                                    )
                                })}
                            </nav>
                        </SheetClose>

                        <Footer user={user} type="mobile" />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default MobileNav