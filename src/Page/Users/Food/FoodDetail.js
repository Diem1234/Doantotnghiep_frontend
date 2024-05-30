import React, { useEffect, useState } from "react";
import axiosClient from "../../../libraries/axiosClient";
import { useParams } from "react-router-dom";
import { useTitle } from "../../../hooks/useTitle";
const FoodDetail = () => {
  const [food, setFood] = useState([]);
  const { id } = useParams();
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Chi tiết món ăn");
  }, []);

  const getDetailFood = async () => {
    try {
      const response = await axiosClient.get(`api/v1/food/${id}`);
      console.log("foodDetail", response.data);
      if (response) {
        setFood(response.data.payload);
      } else {
        alert("khong co du lieu!");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getDetailFood();
  }, []);

  return (
    <div className="container">
      <h1 className="text">Chi tiết món ăn</h1>
      <div className="row mx-auto" style={{ width: "90%" }}>
        <div className="col-md-5 p-3 shadow justif">
          <img src={food.photo} width={"99%"} height={"400px"} />
        </div>
        <div className="col-md-6">
          <h2>{food.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;
