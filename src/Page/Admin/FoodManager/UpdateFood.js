import React, { useEffect, useState } from "react";
import axiosClient from "../../../libraries/axiosClient";

const UpdateFood = ({
  name,
  description,
  price,
  discount,
  categoryId,
  foodIngredient,
  handleSubmit,
  setName,
  setDescription,
  setPrice,
  setDiscount,
  setCategoryId,
  handleChange,
  addIngredientField,
  removeIngredient
}) => {
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);

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
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="row">
                <div className="form-group  col-md-12">
                  <span className="thong-tin-thanh-toan">
                    <h5>Thông tin món ăn</h5>
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label className="control-label">Tên món ăn</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>{" "}
                <div className="form-group col-md-3">
                  <label for="exampleSelect1" className="control-label">
                    Danh mục
                  </label>
                  <select
                    className="form-control"
                    id="exampleSelect1"
                    required
                    value={categoryId}
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
                </div>{" "}
                <div className="form-group col-md-2">
                  <label className="control-label">Giá</label>
                  <input
                    className="form-control"
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="form-group  col-md-12">
                  <label className="control-label">Nội dung:</label>
                  <textarea
                    className="form-control"
                    type="text"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
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
                    <button type="button" className="btn btn-danger col-md-1"onClick={() => removeIngredient(index)}>
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                data-bs-dismiss="modal"
                className="btn btn-primary"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateFood;
