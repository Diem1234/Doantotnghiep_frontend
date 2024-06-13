import React, { useEffect } from "react";
import { useState } from "react";
import axiosClient from "../../../libraries/axiosClient";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddIngredient = () => {
  const [ingredient, setIngredient] = useState([]);
  const [suppliers,setSuppliers]= useState([]);
  const [name,setName] = useState();
  const [quantity,setQuantity] = useState();
  const [unit,setUnit] = useState();
  const [date_add,setDateAdd] = useState();
 
 
  const [supplierId,setSupplierId] = useState();

  const navigate = useNavigate();


  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const response = await axiosClient.post("api/v1/ingredient/create", { name,quantity,unit,supplierId,date_add });
      if (response.data.payload) {
        toast.success(response.data.message);
         console.log(response.data.message)
        // setName(response.payload);
        setIngredient([...ingredient, response.data.payload]); // Thêm danh mục mới vào danh sách
        navigate('/dashboard/admin/ingredient')
      } 
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  const getAllSuppliers = async () => {
    try {
      const response = await axiosClient.get('api/v1/supplier/');
      if(response?.data.payload){
        setSuppliers(response.data.payload);
      }else{
        alert('khong co du lieu!')
      }
      
      
    } catch (error) {
      console.error(error);
    }
  }; 

    useEffect(() =>{
      getAllSuppliers();
    },[]);
  return (
    <main className="container ms-5">
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb">
          <li className="breadcrumb-item" onClick={()=>navigate('/main/productsmanager')}>Danh sách sản phẩm</li>
          <li className="breadcrumb-item">
            <a href="#">Thêm sản phẩm</a>
          </li>
        </ul>
      </div>
      <div className="row ">
        <div className="col-md-11 shadow p-5">
            <h3 className="tile-title">Tạo mới sản phẩm</h3>
            <div className="tile-body ">
              <form className="row" onSubmit={handleSubmit}>
                <div className="form-group col-md-4">
                  <label className="control-label">Tên nguyên liệu</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-4 ">
                  <label for="exampleSelect1" className="control-label">
                    Nhà cung cấp
                  </label>
                  <select
                    className="form-control"
                    id="exampleSelect1"
                    required
                    onChange={(event) => {
                      setSupplierId(event.target.value);
                    }}
                  >
                    <option>-- Chọn nhà cung cấp --</option>
                    {suppliers &&
                      suppliers?.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <label className="control-label">Số lượng nhập</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label className="control-label">Đơn vị</label>
                  <input
                    className="form-control"
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label className="control-label">Ngày nhập</label>
                  <input
                    className="form-control"
                    type="date"
                    value={date_add}
                    onChange={(e) => setDateAdd(e.target.value)}
                  />
                </div>
                  <div className="row col-md-5 d-flex justify-content-end g-3 mt-5 ">
                  <button className="btn btn-info col-md-5 " type="submit">
                    Lưu lại
                  </button>
                  <a className="btn btn-danger col-md-5 ms-1" onClick={()=>navigate('/main/productsmanager')}>
                    Trở về
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
 
    </main>
  );
};

export default AddIngredient;
