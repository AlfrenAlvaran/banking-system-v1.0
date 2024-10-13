import React from 'react'
import CountUp from 'react-countup'
const AnimatedCounter = ({ amount }) => {
    return (
        <div className='w-full'>
            <CountUp
                prefix='PHP '
                decimals={2}
                decimal=','
                end={amount}

            />
        </div>
    )
}

export default AnimatedCounter