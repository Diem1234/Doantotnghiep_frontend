import React from "react";
import { useState } from "react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axiosClient from "../../../libraries/axiosClient";

const AddFood = () => {
  const [food, setFood] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();
  const [categoryId, setCategoryId] = useState();
  const [foodIngredient, setFoodIngredient] = useState([
    {
      ingredientId: "",
      quantity: "",
    },
  ]);
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();
  const [subphoto, setSubphoto] = useState([]);

  const handleAddSubphoto = () => {
    const newSubphotos = [...subphoto, ""];
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
    setFoodIngredient([...foodIngredient, { ingredientId: "", quantity: "" }]);
  };

  const removeIngredient = (index) => {
    const newIngredients = [...foodIngredient];
    newIngredients.splice(index, 1);
    setFoodIngredient(newIngredients);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !description || !price || !categoryId) {
        toast.error("Vui lòng điền đầy đủ các trường bắt buộc");
        return;
      }
  
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("categoryId", categoryId);
      formData.append("photo", photo);
  
      // Thêm từng ảnh trong subphoto vào FormData
      subphoto.forEach((image, index) => {
        formData.append(`subphoto[${index}]`, image);
      });
  
      // Chuyển đổi từng đối tượng foodIngredient thành chuỗi JSON trước khi thêm vào FormData
      foodIngredient.forEach((ingredient, index) => {
        formData.append(`foodIngredient[${index}][ingredientId]`, ingredient.ingredientId);
        formData.append(`foodIngredient[${index}][quantity]`, ingredient.quantity);
      });
  
      const response = await axiosClient.post("api/v1/food/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.data.success) {
        toast.success(response.data.message);
        setFood([...food, response.data.payload]); // Thêm món ăn mới vào danh sách
        navigate("/dashboard/admin/food");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi khi gửi biểu mẫu");
    }
  };

  const getAllIngredients = async () => {
    try {
      const response = await axiosClient.get("/api/v1/ingredient/");
      if (response?.data.payload) {
        setIngredients(response.data.payload);
      } else {
        alert("khong co du lieu!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await axiosClient.get("api/v1/categories");
      if (response?.data.payload) {
        setCategories(response.data.payload);
      } else {
        alert("khong co du lieu!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllIngredients();
  }, []);
  
  return (
    <main className="container">
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb">
          <li
            className="breadcrumb-item"
            onClick={() => navigate("/main/productsmanager")}
          >
            Danh sách món ăn
          </li>
          <li className="breadcrumb-item">
            <a href="#">Thêm món ăn</a>
          </li>
        </ul>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h3 className="tile-title">Tạo mới sản phẩm</h3>
            <form className="row p-3 shadow" onSubmit={handleSubmit}>
              <div className="row col-md-9">
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
                <label className="control-label">Hình ảnh</label>
                <input
                  className="form-control"
                  type="file"
                  required
                  name="photo"
                  onChange={(e) => setPhoto(e.target.files[0])}
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
              <div className="form-group col-md-9">
                <label className="control-label">Mô tả sản phẩm</label>
                <textarea
                  className="form-control"
                  name="mota"
                  id="mota"
                  onChange={(e) => setDescription(e.target.value)}
                >
                  {description}
                </textarea>
              </div></div>
              <div className='col-md-3'>
                            {photo && (
                                <div className='text-center'>
                                    <img
                                        src={URL.createObjectURL(photo)}
                                        alt='product_photo'
                                        height={"200px"}
                                        className='img img-responsive'
                                    />
                                </div>
                            )}
                        </div>
              <div >
                <button
                  type="button"
                  onClick={addIngredientField}
                  className="btn btn-primary col-md-1 m-2"
                >
                  +
                </button>
                {foodIngredient.map((ingredient, index) => (
                  <div
                    key={index}
                    className="form-group border row col-md-12 p-2 mx-0"
                  >
                    <div className="form-group col-md-6">
                      <select
                        className="form-control"
                        id="exampleSelect1"
                        required
                        value={ingredient.ingredientId}
                        onChange={(e) =>
                          handleChange(index, "ingredientId", e.target.value)
                        }
                      >
                        <option>-- Chọn nguyên liệu --</option>
                        {ingredients &&
                          ingredients?.map((s) => (
                            <option key={s._id} value={s._id}>
                              {s.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group  col-md-4">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Số lượng"
                        required
                        value={ingredient.quantity}
                        onChange={(e) =>
                          handleChange(index, "quantity", e.target.value)
                        }
                      />
                    </div>
                    <button type="button" className="btn btn-danger col-md-1" onClick={() => removeIngredient(index)}>
                      x
                    </button>
                  </div>
                ))}
              </div>
              <div className="form-group col-md-12 my-2">
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
                <button
                  type="button"
                  onClick={handleAddSubphoto}
                  className="btn btn-primary float-end"
                >
                  Thêm hình ảnh
                </button>
              </div>
              <div className="row col-md-12 d-flex justify-content-center g-3 ">
                <button className="btn btn-info col-md-3" type="submit">
                  Lưu lại
                </button>
                <button
                  className="btn btn-danger col-md-3"
                  onClick={() => navigate("/main/productsmanager")}
                >
                  Trở về
                </button>
                </div>
            </form>
          </div>
        </div>
    </main>
  );
};

export default AddFood;
