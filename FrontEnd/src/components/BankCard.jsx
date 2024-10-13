import { formatAmount } from '@/util'
import React from 'react'
import { Link } from 'react-router-dom'

const BankCard = ({ account, username, showBalnce = true }) => {
    return (
        <div className='flex flex-col '>
            <Link to={'/'} className='bank-card'>
                <div className="bank-card_content">
                    <div>
                        <h1 className='text-16 font-semibold text-white'>
                            {account.name || username}
                        </h1>
                        <p className="font-ibm-plex-serif font-black text-white">
                            {formatAmount(account.currentBalance)}
                        </p>
                    </div>
                    <article className='flex flex-col gap-2'>
                        <div className="flex justify-between">
                            <h1 className='text-12 font-semibold text-white'>
                                {username}
                            </h1>

                            <h2 className='text-12 font-semibold text-white'>
                                ⬤⬤ / ⬤⬤
                            </h2>
                        </div>
                        <p className='text-14 font-semibold tracking-[1.1px]'>
                            ⬤⬤⬤⬤ ⬤⬤⬤⬤ ⬤⬤⬤⬤<span className='text-16'> &#8369;{account.mask}</span>
                        </p>
                    </article>
                </div>

                <div className='bank-card_icon'>
                    <img src="/icons/Paypass.svg" alt="" width={20} height={24} />
                    <img src="/icons/mastercard.svg" alt="card" width={45} height={32} />
                </div>

                <img src="/icons/lines.png" alt="line" width={316} height={190} className='absolute top-0 left-0' />
            </Link>
        </div>
    )
}

export default BankCard