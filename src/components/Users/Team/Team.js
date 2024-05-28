import React, { useEffect, useRef, useState } from 'react'
import axiosClient from '../../../libraries/axiosClient';
import { register } from 'swiper/element';
register();
const Team = () => {
    const [categories,setCategories]= useState([]);
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
          swiperElRef.current.addEventListener('swiperprogress', (e) => {
            const [swiper, progress] = e.detail;
            console.log(progress);
          });
      
          swiperElRef.current.addEventListener('swiperslidechange', (e) => {
            console.log('slide changed');
          });
        },[]);
  return (
    <div className="container-xxl pt-5 pb-3">
        <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h5 className="section-title ff-secondary text-center text-primary fw-normal">Danh mục</h5>
                <h1 className="mb-5">Danh mục món ăn</h1>
            </div>
            <swiper-container  className="row g-4" ref={swiperElRef}
                slides-per-view="4"
                 > 
            {categories && categories.map((c)=> ( 
                <swiper-slide key={c.id} className="col-lg-4 col-md-5 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="team-item text-center rounded overflow-hidden">
                        <div className="rounded-circle overflow-hidden m-4">
                            <img className="img-fluid" src={c.photo} alt=""/>
                        </div>
                        <h5 className="mb-0">{c.name}</h5>
                        {/* <small>Designation</small>
                        <div className="d-flex justify-content-center mt-3">
                            <a className="btn btn-square btn-primary mx-1" href=""><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-square btn-primary mx-1" href=""><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-square btn-primary mx-1" href=""><i className="fab fa-instagram"></i></a>
                        </div> */}
                    </div>
                </swiper-slide>
            ))}
            </swiper-container>  

        </div>
    </div>
  )
}

export default Team
