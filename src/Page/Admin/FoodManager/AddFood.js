import React from "react";
import { useState } from "react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axiosClient from "../../../libraries/axiosClient";

const AddFood = () => {
  const [food,setFood]= useState([]);
  const [categories,setCategories]= useState([]);
  const [ingredients,setIngredients]= useState([]);
  const [name,setName] = useState();
  const [description,setDescription] = useState();
  const [price,setPrice] = useState();
  const [discount,setDiscount] = useState();
  const [categoryId,setCategoryId] = useState();
  const [foodIngredient, setFoodIngredient] =useState([{
    ingredientId: '',
    quantity: '',
  }])
  const [photo,setPhoto] = useState();
  const navigate = useNavigate();
  const [subphoto, setSubphoto] = useState([]);

  const handleAddSubphoto = () => {
    const newSubphotos = [...subphoto, ''];
    setSubphoto(newSubphotos);
  };

  const handleSubphotoChange = (index, value) => {
    const newSubphotos = [...subphoto];
    newSubphotos[index] = value;
    setSubphoto(newSubphotos);
  };

  const handleChange = (index, name, value) => {
    const newFoodIngredients = [...foodIngredient];
    newFoodIngredients[index][name] = value;
    setFoodIngredient(newFoodIngredients);
};


  const addIngredientField = () => {
    setFoodIngredient([...foodIngredient, { ingredientId: '', quantity: '' }]);
  };


  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
        if (!name || !description || !price || !categoryId ) {
            toast.error("Please fill in all required fields");
            return;
          }

      const response = await axiosClient.post("api/v1/food/create", { name, description,price,discount,categoryId,photo,subphoto,foodIngredient });
      console.log(response.payload)
      if (response) {
        toast.success(response.message);
         console.log(response.message)
        // setName(response.payload);
        setFood([...food, response.data.payload]); // Thêm danh mục mới vào danh sách
        navigate('/dashboard/admin/food')
      } 
      console.log(subphoto);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  const getAllIngredients = async () => {
    try {
      const response = await axiosClient.get('/api/v1/ingredient/');
      if(response?.data.payload){
        setIngredients(response.data.payload);
      }else{
        alert('khong co du lieu!')
      }
      
      
    } catch (error) {
      console.error(error);
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await axiosClient.get('api/v1/categories');
      if(response?.data.payload){
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
      getAllIngredients();
    },[]);
  return (
    <main className="app-content">
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb">
          <li className="breadcrumb-item" onClick={()=>navigate('/main/productsmanager')}>Danh sách sản phẩm</li>
          <li className="breadcrumb-item">
            <a href="#">Thêm sản phẩm</a>
          </li>
        </ul>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <h3 className="tile-title">Tạo mới sản phẩm</h3>
            <div className="tile-body">
              <div className="row element-button">
                {/* <div className="col-sm-3">
                  <button
                    type="button"
                    className="btn btn-add btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-whatever="@mdo"
                  >
                    <i className="fas fa-folder-plus"></i> Thêm nhà cung cấp
                  </button>
                  <AddSuppliers />
                </div> */}
                {/* <div className="col-sm-3">
                  <button
                    type="button"
                    className="btn btn-add btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#adddanhmuc"
                  >
                    <i className="fas fa-folder-plus"></i> Thêm danh mục
                  </button>
                  <AddCategories />
                </div>
                <div className="col-sm-2">
                  <button
                    type="button"
                    className="btn btn-add btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#addtinhtrang"
                  >
                    <i className="fas fa-folder-plus"></i> Thêm trạng thái
                  </button>
                  <AddStatus />
                </div> */}
              </div>
              <form className="row" onSubmit={handleSubmit}>
                <div className="form-group col-md-3">
                  <label className="control-label">Tên sản phẩm</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>


                <div className="form-group  col-md-3">
                  <label className="control-label">Image</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label for="exampleSelect1" className="control-label">
                    Danh mục
                  </label>
                  <select
                    className="form-control"
                    id="exampleSelect1"
                    required
                    onChange={(event) => {
                      setCategoryId(event.target.value);
                    }}
                  >
                    <option>-- Chọn danh mục --</option>
                    {categories &&
                      categories?.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group col-md-3">
                  <label className="control-label">Giá bán</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label className="control-label">Giảm giá</label>
                  <input
                    className="form-control"
                    type="text"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-12">
                  <label className="control-label">Mô tả sản phẩm</label>
                  <textarea
                    className="form-control"
                    name="mota"
                    id="mota"
                    onChange={(e) => setDescription(e.target.value)}
                  >
                    {description}
                  </textarea>
                </div>
        {foodIngredient.map((ingredient, index) => (
            <div key={index} className="form-group row col-md-12">
                <div className="form-group col-md-3">
                  <label className="control-label">Nguyên liệu:</label>
                  <select
                    className="form-control"
                    id="exampleSelect1"
                    required
                    value={ingredient.ingredientId}
                    onChange={(e) => handleChange(index, 'ingredientId', e.target.value)}
                  >
                    <option>-- Chọn nhà cung cấp --</option>
                    {ingredients &&
                      ingredients?.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.name}
                        </option>
                      ))}
                  </select>
                  </div>
                  <div className="form-group  col-md-3">
                  <label className="control-label">Số lượng</label>
                  <input
                    className="form-control"
                    type="number"
                    required
                    value={ingredient.quantity}
                    onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                  />
                </div>
                  <button type="button" onClick={addIngredientField} className="btn btn-primary col-md-3">
                    Thêm hình ảnh
                  </button>
            </div>
                ))}
                <div className="form-group col-md-12">
                  <label className="control-label">Hình ảnh phụ:</label>
                  {subphoto.map((subphoto, index) => (
                    <div key={index}>
                      <input
                        className="form-control mb-2"
                        type="text"
                        value={subphoto}
                        onChange={(event) =>
                          handleSubphotoChange(index, event.target.value)
                        }
                      />
                    </div>
                  ))}
                  <button type="button" onClick={handleAddSubphoto} className="btn btn-primary">
                    Thêm hình ảnh
                  </button>
                </div>
                <button className="btn btn-info" type="submit">
                  Lưu lại
                </button>
                <a className="btn btn-danger" onClick={()=>navigate('/main/productsmanager')}>
                  Trở về
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddFood;
