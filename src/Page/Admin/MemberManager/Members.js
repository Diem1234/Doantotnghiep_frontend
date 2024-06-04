import React, { useEffect, useState } from "react";

// import UpdateIngredient from './UpdateIngredient';
import axiosClient from "../../../libraries/axiosClient";
import ReactPaginate from "react-paginate";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const itemsPerPage = 10; // Số mục trên mỗi trang
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Tính toán dữ liệu hiện tại cho trang
  const offset = currentPage * itemsPerPage;
  const currentMembers = members.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(members.length / itemsPerPage);

  // const handleInputChange = (e) => {
  //   const inputValue = e.target.value;
  //   const [firstName,...lastName] = inputValue.split(" ");
  //   setSearchFirstName(firstName || "");
  //   setSearchLastName(lastName.join(" ") || "");
  // };
  //search
  //search
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.get(
        `api/v1/food/foods/search?name=${searchTerm}`
      );

      if (response) setMembers(response?.data.payload); // Cập nhật state products với kết quả tìm kiếm
    } catch (error) {
      console.log(error);
    }
  };

  const getAllMembers = async () => {
    try {
      const response = await axiosClient.get("/api/v1/auth/");
      setMembers(response.data.payload);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllMembers();
  }, []);
  // Hàm biến đổi định dạng ngày sinh
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(0);
    return `${day}/${month}/${year}`;
  };
  return (
    <main className="app-content p-3">
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <a href="#">
              <b>Danh sách món ăn</b>
            </a>
          </li>
        </ul>
        <div id="clock"></div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <div className="row element-button mb-3 p-3 m-1 shadow">
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
                <div className="col-sm-1">
                  <NavLink
                    to={"/dashboard/admin/addfood"}
                    className="btn btn-primary"
                  >
                    +
                  </NavLink>
                </div>
                <div className="col-sm-3">
                  <form
                    className="d-flex "
                    role="search"
                    onSubmit={handleSearch}
                  >
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn btn-warming" type="submit">
                      Search
                    </button>
                  </form>
                </div>
              </div>
              <div className="shadow p-3">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tên</th>
                      <th>Giới tính</th>
                      <th>Tình trạng</th>
                      <th>Tuổi</th>
                      <th>Trạng thái</th>
                      <th>Số điện thoại</th>
                    </tr>
                  </thead>
                  <tbody className="table table-bordered">
                    {currentMembers.map((user) => (
                      <React.Fragment
                        key={user._id}
                       
                      >
                        <tr>
                          <td rowSpan={user.familyMembers.length + 1}>
                            {user._id}
                          </td>
                        </tr>
                        {user.familyMembers.map((member, index) => (
                          <tr key={index}>
                            <td>{member.name}</td>
                            <td>{member.gender}</td>
                            <td>{member.status}</td>
                            <td>{member.age}</td>
                            <td>{member.trend}</td>
                            <td>{member.phone}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>

                <div>
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
      </div>
    </main>
  );
};

export default Members;
