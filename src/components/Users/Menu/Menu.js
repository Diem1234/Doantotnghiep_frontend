import React, { useEffect, useState } from 'react'
import axiosClient from '../../../libraries/axiosClient';
import { NavLink } from 'react-router-dom';
import { useTitle } from '../../../hooks/useTitle';

const Menu = () => {
    const [food,setFood] =useState([])
    
    const { setTitle } = useTitle();
    useEffect(() => {
        setTitle("Danh sách món ăn");
    }, []);

    const getAllFoods = async () => {
        try {
          const response = await axiosClient.get('api/v1/food/');
          console.log(response)
          if(response){
            setFood(response.data.payload.slice(0, 8));
          }else{
            alert('khong co du lieu!')
          }
          
          
        } catch (error) {
          console.error(error);
        }
      };
      
        useEffect(() =>{
            getAllFoods();
        },[]);
  return (
    <div className="container-xxl py-5">
        <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h5 className="section-title ff-secondary text-center text-primary fw-normal">Menu món ăn</h5>
                <h1 className="mb-5">Món ăn phổ biến</h1>
            </div>
            <div className="tab-className text-center wow fadeInUp" data-wow-delay="0.1s">
                <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
                    <li className="nav-item">
                        <a className="d-flex align-items-center text-start mx-3 ms-0 pb-3 active" data-bs-toggle="pill" href="#tab-1">
                            <i className="fa fa-coffee fa-2x text-primary"></i>
                            <div className="ps-3">
                                <small className="text-body">Phổ biến</small>
                                <h6 className="mt-n1 mb-0">Ăn sáng</h6>
                            </div>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="d-flex align-items-center text-start mx-3 pb-3" data-bs-toggle="pill" href="#tab-2">
                            <i className="fa fa-hamburger fa-2x text-primary"></i>
                            <div className="ps-3">
                                <small className="text-body">Đặc biệt</small>
                                <h6 className="mt-n1 mb-0">Ăn trưa</h6>
                            </div>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="d-flex align-items-center text-start mx-3 me-0 pb-3" data-bs-toggle="pill" href="#tab-3">
                            <i className="fa fa-utensils fa-2x text-primary"></i>
                            <div className="ps-3">
                                <small className="text-body">Yêu thích</small>
                                <h6 className="mt-n1 mb-0">Bửa tối</h6>
                            </div>
                        </a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div id="tab-1" className="tab-pane fade show p-0 active">
                        <div className="row g-4">
                        {food && food.map((f,index)=> (
                            index < 8 && (
                            <div className="col-lg-6" key={f._id}>
                                <NavLink to={`/menu/foodDetail/${f._id}`} className="d-flex align-items-center">
                                    <img className="flex-shrink-0 img-fluid rounded" src={f.photo} alt="" style={{width: '80px', height: '80px'}}/>
                                    <div className="w-100 d-flex flex-column text-start ps-4">
                                        <h5 className="d-flex justify-content-between border-bottom pb-2">
                                            <span>{f.name}</span>
                                            <span className="text-primary">${f.price}</span>
                                        </h5>
                                        <small className="fst-italic">{f.description.substring(0, 30)}</small>
                                    </div>
                                </NavLink>
                            </div>  
                        )))}         
                        </div>
                    </div>
                    <div id="tab-2" className="tab-pane fade show p-0">
                        <div className="row g-4">
                        {food && food.map((f,index)=> (
                            index < 8 && (
                            <div className="col-lg-6" key={f._id}>
                                <div className="d-flex align-items-center">
                                    <img className="flex-shrink-0 img-fluid rounded" src={f.photo} alt="" style={{width: '80px', height: '80px'}}/>
                                    <div className="w-100 d-flex flex-column text-start ps-4">
                                        <h5 className="d-flex justify-content-between border-bottom pb-2">
                                            <span>{f.name}</span>
                                            <span className="text-primary">${f.price}</span>
                                        </h5>
                                        <small className="fst-italic">{f.description}</small>
                                    </div>
                                </div>
                            </div>  
                        )))}   
                        </div>
                    </div>
                    <div id="tab-3" className="tab-pane fade show p-0">
                        <div className="row g-4">
                        {food && food.map((f,index)=> (
                            index < 8 && (
                            <div className="col-lg-6" key={f._id}>
                                <div className="d-flex align-items-center">
                                    <img className="flex-shrink-0 img-fluid rounded" src={f.photo} alt="" style={{width: '80px', height: '80px'}}/>
                                    <div className="w-100 d-flex flex-column text-start ps-4">
                                        <h5 className="d-flex justify-content-between border-bottom pb-2">
                                            <span>{f.name}</span>
                                            <span className="text-primary">${f.price}</span>
                                        </h5>
                                        <small className="fst-italic">{f.description}</small>
                                    </div>
                                </div>
                            </div>  
                        )))}   
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Menu
