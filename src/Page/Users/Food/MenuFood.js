import React, { useEffect, useState, memo, useCallback } from "react";
import axiosClient from "../../../libraries/axiosClient";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { useTitle } from "../../../hooks/useTitle";
import { Checkbox, Radio } from "antd";
import { Prices } from "../../../components/Routes/Prices";

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
          More Details
        </button>
      </div>
    </div>
  );
});

const MenuFood = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    checked: [],
    radio: [],
  });

  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noFoodsFound, setNoFoodsFound] = useState(false);

  const { setTitle } = useTitle();
  useEffect(() => {
    setTitle("Danh sách món ăn");
  }, []);

  useEffect(() => {
    getAllCategories();
  }, []);
  const { categoryId } = useParams()

    
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
    setFilters((prevFilters) => ({
      ...prevFilters,
      checked: value
        ? [...prevFilters.checked, id]
        : prevFilters.checked.filter((c) => c !== id),
    }));
  };

  const handlePriceFilter = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      radio: value,
    }));
  };

  // Memoize hàm fetchFoodsByCategory
  const fetchFoodsByCategory = useCallback(async () => {
    try {
      const response = await axiosClient.get(`api/v1/food/foods/category/${categoryId}`);
      setFood(response.data.payload);
      setNoFoodsFound(response.data.payload.length === 0);
    } catch (error) {
      console.error(error);
    }
  }, [categoryId]);

  // Memoize hàm fetchFood
  const fetchFood = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.post('api/v1/food/food-filters', {
        checked: filters.checked,
        radio: filters.radio,
      });
      setFood(data.payload);
      setNoFoodsFound(data.payload.length === 0);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [filters]);

  // Cập nhật URL khi thay đổi bộ lọc
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    filters.checked.forEach((f) => searchParams.append('checked', f));
    searchParams.set('radio', filters.radio);
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  }, [filters, location, navigate]);

  // Lấy danh sách món ăn khi thay đổi categoryId hoặc filters
  useEffect(() => {
    fetchFoodsByCategory();
  }, [categoryId, fetchFoodsByCategory]);

  useEffect(() => {
    fetchFood();
  }, [filters, fetchFood]);

  // Khôi phục bộ lọc từ URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const checkedParams = searchParams.getAll('checked');
    const radioParam = searchParams.get('radio');
    setFilters({ checked: checkedParams, radio: radioParam || '' });
  }, [location.search]);


  

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row mt-3 mb-3">
          <div className="col-md-3 p-5 form-similar">
            <h4 className="text-center mt-3">Filter By Category</h4>
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
            <h4 className="text-center mt-4">Filter By Price</h4>
            <div className="d-flex flex-column mb-5">
              <Radio.Group onChange={(e) => handlePriceFilter(e.target.value)}>
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
                RESET FILTERS
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
                {food.map((p) => (
                  <FoodItem key={p._id} food={p} />
                ))}
              </div>
            )}
            </div>
            <div className="m-2 p-3">
              {food && food.length < 0 && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    // Add pagination logic here
                  }}
                >
                  {loading ? "Loading..." : "Load more"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuFood;