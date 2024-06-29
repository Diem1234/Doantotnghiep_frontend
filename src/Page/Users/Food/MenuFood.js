import React, { useEffect, useState, memo, useCallback, useMemo } from "react";
import axiosClient from "../../../libraries/axiosClient";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { useTitle } from "../../../hooks/useTitle";
import { Checkbox, Radio } from "antd";
import { Prices } from "../../../components/Routes/Prices";
import ReactPaginate from "react-paginate";

const FoodItem = ({ food }) => {
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
};

const MenuFood = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [food, setFood] = useState([]);
  const [noFoodsFound, setNoFoodsFound] = useState(false);
  const [selected, setSelected] = useState(null);
  const itemsPerPage = 6; // Số mục trên mỗi trang
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Tính toán dữ liệu hiện tại cho trang
  const offset = currentPage * itemsPerPage;
  const currentFood = food.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(food.length / itemsPerPage);

  const { setTitle } = useTitle();
  useEffect(() => {
    setTitle("Danh sách món ăn");
  }, []);

  useEffect(() => {
    getAllCategories();
  }, []);
  const { categoryId } = useParams();

  const getAllCategories = async () => {
    try {
      const response = await axiosClient.get("api/v1/categories");
      if (response) {
        setCategories(response.data.payload);
      } else {
        alert("khong co du lieu!");
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      if (!all.includes(id)) {
        all.push(id);
      }
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };


  useEffect(() => {
    console.log("check", checked, radio);
    
    filterFood();
  }, [checked, radio]);

  //get filter product
  const filterFood = async (e) => {

    try { 
      const response = await axiosClient.post(
        `api/v1/food/foods/cate/`,
      checked.length >0 || radio.length>0  ? { 
          checked: checked.length > 0 ? checked : [],
          radio: radio.length > 0 ? radio : [],
        } :{
          categoryId:categoryId ?categoryId:undefined,
          checked :[],
          radio:[]
        }
      );
     console.log("check and radio", checked, radio)
      console.log("req.params.categoryId:", categoryId);
      console.log("data:", response.data);
      setFood(response.data?.payload);
      setNoFoodsFound(response.data?.payload.length === 0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row mt-3 mb-3">
          <div className="col-md-3 p-5 form-similar">
            <h4 className="text-center mt-3">Lọc theo danh mục</h4>
            <div className="d-flex flex-column g-3">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            <h4 className="text-center mt-4">Lọc theo giá</h4>
            <div className="d-flex flex-column mb-5">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                Reset lại
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <div className="d-flex flex-wrap">
              {noFoodsFound ? (
                <div className="text-center my-5">
                  <h3>Không tìm thấy món ăn nào</h3>
                  <p>Hãy thử thay đổi bộ lọc để tìm kiếm</p>
                </div>
              ) : (
                <div className="d-flex flex-wrap">
                  {currentFood.map((p, index) => (
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

export default MenuFood;
