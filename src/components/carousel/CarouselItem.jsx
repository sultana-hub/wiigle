import React from 'react'
// import '../../../src/styleModule/browser.css'
const CarouselItem = (props) => {
  return (
    <div className='sliding'>
      <img src={props.item.bannerImage} alt={props.item.caption} style={{ width:"100%", height: '450px' }}/>
       <div className="banner_text">
        <p className='banner_head'>{props.item.caption1}</p>
        <p>{props.item.caption2}</p>
       </div>
    </div>
  )
}

export default CarouselItem