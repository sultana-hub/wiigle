import React from 'react'
import Carousel from 'react-material-ui-carousel'
import CarouselItem from './CarouselItem'
const CarouselSlide = () => {
    const items = [
        {
          name: "Random Name #1",
          description: "Probably the most random thing you have ever seen!",
          bannerImage: 'assets/image1.jpg',
        },
        {
          name: "Random Name #2",
          description: "Hello World!",
          bannerImage: "assets/image2.jpg",
        },
        {
          name: "Random Name #3",
          description: "Another banner here!",
          bannerImage: 'assets/image3.jpg',
        },
        {
            name: "Random Name #4",
            description: "Another banner here!",
            bannerImage: 'assets/image4.jpg',
          },
          {
            name: "Random Name #5",
            description: "Another banner here!",
            bannerImage: 'assets/image5.jpg',
          },
      ];
  return (
    <Carousel sx={{height:"400px"}}>
{
    items.map((item,i)=>(
<CarouselItem key={i} item={item}/>
    ))
}
    </Carousel>


  )
}

export default CarouselSlide