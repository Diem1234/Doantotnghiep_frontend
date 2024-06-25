import React, { useEffect, useState } from "react";
import axiosClient from "../../../libraries/axiosClient";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useTitle } from "../../../hooks/useTitle";
const FoodDetail = () => {
  const [food, setFood] = useState([]);
  const { id } = useParams();
  const [relatedProducts,setRelatedProducts] = useState([])
  const navigate = useNavigate();
  
  const { setTitle } = useTitle();
  useEffect(() => {
    setTitle("Chi tiết món ăn");
  }, []);
  
  const getDetailFood = async () => {
    try {
      const response = await axiosClient.get(`api/v1/food/detail/${id}`);
      console.log("foodDetail", response.data);
      if (response) {
        setFood(response.data.payload);
        getSimilarFood(response.data?.payload._id,response.data?.payload.categoryId._id)
      } else {
        alert("khong co du lieu!");
      }
    } catch (error) {
      console.error(error);
    }
  };

     //get similar product
     const getSimilarFood = async (pid,cid) =>{
      try {
        const {data} = await axiosClient.get(`/api/v1/food/related-product/${pid}/${cid}`);
        console.log('similar',data.payload)
        setRelatedProducts(data?.payload)
      } catch (error) {
        console.log(error);
      }
   };

  useEffect(() => {
      if(id) getDetailFood();
      
    }, [id]);

  return (
    <div className="container">
      <div className="row d-flex mx-auto" style={{ width: "100%" }}>
        <div className="col-md-4 p-3 shadow justif">
          <img src={food.photo} width={"99%"} height={"400px"} />
        </div>
        <div className="col-md-7 row shadow border border-warning ms-3">
          <h2 className="justify-content-center col-md-12 d-flex align-items-center">{food.name}</h2>
          
          <div className="col-md-5">
          <p>{food.categoryName}</p>
          <p>{food.price}</p>
          {food.foodIngredient && (
            <>
              <b>Nguyên liệu :</b>
              <ul>
                {food.foodIngredient.map((ingredient) => (
                  <li key={ingredient._id}>
                    <p>Loại nguyên liệu: {ingredient.ingredientName}</p>
                    <p>Lượng sư dụng: {ingredient.quantity}{" "}{ingredient.ingredientId.unit}</p>
                  </li>
                ))}
              </ul>
            </>
          )}</div>
          <p className="text-break col-md-7 border-start border-warning">{food.description}</p>
        </div>
      </div>
      <div className="row mt-5 shadow">
      {relatedProducts.length > 0 ? (
        <div className="d-flex flex-wrap m-5">
          {relatedProducts.map((p) => (
             <div className="card m-2" style={{ width: "18rem" }}>
             <img
               src={p.photo}
               className="card-img-top"
              height={'250px'}
               alt={p.name}
             />
             <div className="card-body">
               <h5 className="card-title">{p.name}</h5>
               <p className="card-text">
                 {p.description.substring(0, 30)}...
               </p>
               <p className="card-text">{p.price} vnd</p>
               <NavLink to={`/menu/foodDetail/${p._id}`}
                   className="btn btn-outline-warning me-2"
                 >
                   Xem chi tiết
               </NavLink>
             </div>
           </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No similar product found</p>
      )}
      </div>
    </div>
  );
};

export default FoodDetail;
