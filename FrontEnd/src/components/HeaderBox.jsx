import React from 'react'
import TotalBalnceBox from './TotalBalnceBox'

const HeaderBox = ({type="title", title, subtext, user}) => {
  return (
    <div className="header-box">
        <h1 className="header-box-title">
            {title}
            {type==='greeting' && (
                <span className='text-bankGradient'>
                     &nbsp;{user}
                </span>
            )}
        </h1>
        <p className="header-box-subtext">{subtext}</p>
        <TotalBalnceBox 
          accounts={[]}
          totalBanks={[2]}
          totalCurrentBalance={[1250.75]}
        
        />
    </div>
  )
}

export default HeaderBox