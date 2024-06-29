import React, { useEffect, useState, memo, useCallback, useMemo } from "react";

import { NavLink, useLocation, useNavigate } from "react-router-dom";


import ReactPaginate from "react-paginate";
import { useAuth } from "../../context/auth";
import { useTitle } from "../../hooks/useTitle";
import axiosClient from "../../libraries/axiosClient";



const FoodItem = memo(({ food }) => {
  const navigate = useNavigate();

  return (
    <div className="card m-2" style={{ width: "15rem" }}>
      <img
        src={food.photo}
        className="card-img-top"
        height={"200px"}
        alt={food.name}
      />
      <div className="card-body">
        <h5 className="card-title">{food.name}</h5>
        <p className="card-text">{food.description.substring(0, 30)}...</p>
        <p className="card-text">{food.price} vnd</p>
        <button
          className="btn btn-outline-warning me-2"
          onClick={() => navigate(`/menu/foodDetail/${food._id}`)}
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  );
});

const FoodSuggestions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [food, setFood] = useState([]);
  const [noFoodsFound, setNoFoodsFound] = useState(false);
  const [selected,setSelected] = useState(null)
  const itemsPerPage = 6; // Số mục trên mỗi trang
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (!auth.user) { 
      window.location.href = '/login';
    }else if(auth?.user.familyMembers.lenght === 0)
    {
      alert('Bạn phải nhập thông tin thành viên gia đình bạn') 
      window.location.href = '/dashboard/user/profile';}
      
}, [auth, setAuth]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Tính toán dữ liệu hiện tại cho trang
  const offset = currentPage * itemsPerPage;
  const currentFood = useMemo(() => food.slice(offset, offset + itemsPerPage), [food, offset, itemsPerPage]);
  const pageCount = Math.ceil(food.length / itemsPerPage);

  const { setTitle } = useTitle();
  useEffect(() => {
    setTitle("Gợi ý món ăn");
  }, []);




  const getFoodSuggest = async () => {
    try {
      if (!auth?.user?._id || !selected?._id) {
        // Handle the case where auth.user._id or selected._id is null or undefined
        setFood([]);
        setNoFoodsFound(true);
        return;
      }
  
      const response = await axiosClient.get(`api/v1/auth/accounts/${auth?.user._id}/get-suggest/${selected._id}`);
      console.log(response)
      if(response){
        setFood(response.data.payload.slice(0, 5));
        setNoFoodsFound(response.data.payload.length === 0);
      }else{
        alert('khong co du lieu!')
      }
      
      
    } catch (error) {
      console.error(error);
    }
  };
  
    useEffect(() =>{
        getFoodSuggest();
    },[]);
    const handleButtonClick = () => {
      getFoodSuggest();
    };

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row mt-3 mb-3">
          <div className="col-md-3 p-5 form-similar">
            <h6 className="text-center mt-3">Thành viên gia đình</h6>

            <div className="d-flex flex-column g-3">
            {auth.user && auth.user.familyMembers.map((member) =>(
              <ul key={member._id} className="list-group ">
                <li  className="list-group-item list-group-item-action" onClick={()=>{setSelected(member)
                  handleButtonClick()}}>
                {member.name}
            </li>
            </ul>
            ))}
            </div>
            
           
          </div>
          <div className="col-md-9">
            <h5 className="mt-3">Các món nên ăn</h5>
            <div className="d-flex flex-wrap">
            {noFoodsFound ? (
              <div className="text-center my-5">
                <h3>Không tìm thấy món ăn nào</h3>
              </div>
            ) : (
              <div className="d-flex flex-wrap">
                
                {currentFood.map((p,index) => (
                  <FoodItem key={index} food={p} />
                ))}
              </div>
            )}
            </div>
            <div className="m-2 p-3">
           
                <nav aria-label="Page navigation example ">
                  <ReactPaginate
                    previousLabel={"«"}
                    nextLabel={"»"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination-sm"}
                    activeClassName={"active"}
                    pageLinkClassName={"page-link"}
                    previousLinkClassName={"page-link"}
                    nextLinkClassName={"page-link"}
                    pageClassName={"page-item"}
                    previousClassName={"page-item"}
                    nextClassName={"page-item"}
                  />
                </nav>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodSuggestions;