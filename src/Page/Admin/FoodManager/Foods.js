import React, { useEffect, useState } from 'react'


// import UpdateIngredient from './UpdateIngredient';
import axiosClient from '../../../libraries/axiosClient';

const Foods = () => {

  const [food, setFood] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [searchFirstName, setSearchFirstName] = useState('');
  const [searchLastName, setSearchLastName] = useState('');

  // const handleInputChange = (e) => {
  //   const inputValue = e.target.value;
  //   const [firstName,...lastName] = inputValue.split(" ");
  //   setSearchFirstName(firstName || "");
  //   setSearchLastName(lastName.join(" ") || "");
  // };
  //    //search
  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axiosClient.get(`questions/customerSearch?firstName=${searchFirstName}&lastName=${searchLastName}`);
  //     console.log(response.payload);
  //     if (response?.payload)
  //     setCustomer(response?.payload); // Cập nhật state products với kết quả tìm kiếm
    
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

    //xử lý chọn vào checkbox lấy id
    const handleItemCheck = (event, customerId) => {
      const isChecked = event.target.checked;
      setCheckedItems({
        ...checkedItems,
        [customerId]: isChecked,
      });
    };
  
  //   // xử lý nhấn chọn tất cả checkbox
  //   const handleSelectAll = (event) => {
  //     const isChecked = event.target.checked;
  //     const newCheckedItems = {};
    
  //     customers.forEach((product) => {
  //       newCheckedItems[product._id] = isChecked;
  //     });
    
  //     setCheckedItems(newCheckedItems);
  //   };
  //   //click nút ẩn sẽ ẩn đi
  //   const handleDeleteSelected = async () => {
  //     const selectedIds = Object.keys(checkedItems).filter(
  //       (itemId) => checkedItems[itemId]
  //     );
    
  //     try {
  //       //await axiosClient.post(`admin/products/${selectedIds.join(',')}/delete`);
  //       await axiosClient.post('admin/customers/delete', {selectedIds});
  //       setCheckedItems({});
  //       setCustomer(customers.filter((customer) => !selectedIds.includes(customer._id)));
  //       toast.success("Đã xóa sản phẩm");
  //     } catch (error) {
  //       console.error(error);
  //       toast.error("Có lỗi xảy ra khi xóa sản phẩm");
  //     }
  //   };

  const getAllFoods = async () => {
    try {
      const response = await axiosClient.get('/api/v1/food/');
      setFood(response.data.payload);
      
    } catch (error) {
      console.error(error);
    }
  };

    useEffect(() =>{
      getAllFoods();
    },[]);
      // Hàm biến đổi định dạng ngày sinh
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(0);
    return `${day}/${month}/${year}`;
  };
  return (
    <main className="app-content p-3">
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <a href="#">
              <b>Danh sách khách hàng</b>
            </a>
          </li>
        </ul>
        <div id="clock"></div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <div className="row element-button">
                {/* <div className="col-sm-3">
                  <NavLink
                    to="/main/customermanagement/addcustomer"
                    className="active1"
                  >
                    <a
                      className="btn btn-add btn-sm"
                      href="form-add-nhan-vien.html"
                      title="Thêm"
                    >
                      <i className="fas fa-plus"></i>
                      Tạo mới khách hàng
                    </a>
                  </NavLink>
                </div> */}
                <div className="col-sm-2">
                  <a
                    className="btn btn-delete btn-sm"
                    type="button"
                    title="Xóa"
                    // onClick={handleDeleteSelected}
                  >
                    <i className="fas fa-trash-alt"></i> Xóa tất cả{" "}
                  </a>
                </div>
                <div className="col-sm-7">
                  {/* <form className="d-flex " role="search" onSubmit={handleSearch}>
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"   value={searchFirstName + " " + searchLastName}
    onChange={handleInputChange} />
                    <button className="btn btn-info" type="submit">Search</button>
                  </form> */}
                </div>
              </div>
              <table
                className="table table-hover table-bordered js-copytextarea"
                cellpadding="0"
                cellspacing="0"
                border="0"
                id="sampleTable"
              >
                <thead>
                  <tr>
                    <th width="10">
                      <input type="checkbox" id="all" 
                      // onChange={handleSelectAll}
                      />
                    </th>
                    <th>Mã món ăn</th>
                    <th width="150">Hình ảnh</th>
                    {/* <th width="20">Ảnh đại diện</th> */}
                    <th>Tên món ăn </th>
                    <th>Giá</th>
                    <th>Danh mục</th>
                    <th width="100">Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {food && food.map((i) =>(
                    <tr key={i._id}>
                      <td width="10">
                        <input type="checkbox" checked={checkedItems[i._id] || false}
  onChange={(event) => handleItemCheck(event, i._id)}/>
                      </td>
                      <td>{i._id}</td>
                      <img
                        src={i.photo}
                        alt=""
                        width="100px;"
                        height={"100px"}
                      />
                      {/* <td>
                        <img
                          className="img-card-person"
                          src={`http://localhost:3333/${c.avatarUrl}`}
                          alt=""
                          width="100px;"
                          height={"100px"}
                        />
                      </td> */}
                      <td>{i.name}</td>
                      <td>{i.price}</td>
                      <td>{i.categoryId}</td>
                    
                      <td className="table-td-center">
                        <button
                          className="btn btn-primary btn-sm trash"
                          type="button"
                          title="Xóa"
                          onclick="myFunction(this)"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>               
                          <button
                            type="button"
                            className="btn btn-primary btn-sm trash"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            data-bs-whatever="@mdo"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          {/* <UpdateIngredient/> */}
                  
                      </td>
                    </tr>
                    ))}
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Foods