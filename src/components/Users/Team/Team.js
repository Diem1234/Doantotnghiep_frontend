import React, { useEffect, useRef, useState } from 'react'
import axiosClient from '../../../libraries/axiosClient';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "../../../styles/buttonlogin.css";
import { useTitle } from '../../../hooks/useTitle';
const Team = () => {
    const [categories,setCategories]= useState([]);
    
    const { setTitle } = useTitle();
    useEffect(() => {
      setTitle("Danh mục");
    }, []);

    const swiperElRef = useRef(null);
    const getAllCategories = async () => {
        try {
          const response = await axiosClient.get('api/v1/categories/');
          console.log(response)
          if(response){
            setCategories(response.data.payload);
          }else{
            alert('khong co du lieu!')
          }
          
          
        } catch (error) {
          console.error(error);
        }
      };
    
        useEffect(() =>{
          getAllCategories();
        },[]);
  return (
    <div className="container-xxl pt-5 pb-3">
        <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h5 className="section-title ff-secondary text-center text-primary fw-normal">Danh mục</h5>
                <h1 className="mb-5">Danh mục món ăn</h1>
            </div>
            <Swiper
              // install Swiper modules
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={4}
              navigation
              pagination={{ clickable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log('slide change')}
            >
              {categories && categories.map((c)=> ( 
              <SwiperSlide key={c._id} className="col-lg-4 col-md-5 wow fadeInUp swiper-button">
              <div className="team-item text-center rounded overflow-hidden">
                        <div className="rounded overflow-hidden m-4">
                            <img className="rounded" width={'200px'} height={'200px'} src={c.photo} alt=""/>
                        </div>
                        <h5 className="mb-0">{c.name}</h5>
                    </div>
              </SwiperSlide>
              ))}
            </Swiper>
        </div>
    </div>
  )
}

export default Team
