import React, { useEffect, useState } from 'react'


import UpdateIngredient from './UpdateIngredient';
import axiosClient from '../../../libraries/axiosClient';
import { Link, NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import { queryAllByAltText } from '@testing-library/react';
import ReactPaginate from 'react-paginate';
import { useTitle } from '../../../hooks/useTitle';

const Ingredients = () => {
  const [uquantity,setUQuantity]=useState("");
  const [uunit,setUUnit]=useState("");
  const [usupplierId,setUSupplierId] = useState();
  const [uname,setUName] = useState("")
  const [visible,setVisible]= useState(false)
  const [selected,setSelected] = useState(null)
  const [updateName,setUpdateName] = useState("")
  const [ingredient, setIngredient] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [checkedItems, setCheckedItems] = useState({});
  const itemsPerPage = 10; // Số mục trên mỗi trang
  const [currentPage, setCurrentPage] = useState(0);

  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Quản lý nguyên liệu");
  }, []);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Tính toán dữ liệu hiện tại cho trang
  const offset = currentPage * itemsPerPage;
  const currentIngredient = ingredient.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(ingredient.length / itemsPerPage);

  // const handleInputChange = (e) => {
  //   const inputValue = e.target.value;
  //   const [firstName,...lastName] = inputValue.split(" ");
  //   setSearchFirstName(firstName || "");
  //   setSearchLastName(lastName.join(" ") || "");
  // };
//search
const handleSearch = async (e) => {
  e.preventDefault();
  try {
    const response = await axiosClient.get(`api/v1/ingredient/ingredients/search?name=${searchTerm}`);
    
    if (response)
      setIngredient(response?.data.payload); // Cập nhật state products với kết quả tìm kiếm
  
  } catch (error) {
    console.log(error);
  }
};


    //xử lý chọn vào checkbox lấy id
    const handleItemCheck = (event, ingredientId) => {
      const isChecked = event.target.checked;
      setCheckedItems({
        ...checkedItems,
        [ingredientId]: isChecked,
      });
    };
  
    // xử lý nhấn chọn tất cả checkbox
    const handleSelectAll = (event) => {
      const isChecked = event.target.checked;
      const newCheckedItems = {};
    
      ingredient.forEach((product) => {
        newCheckedItems[product._id] = isChecked;
      });
    
      setCheckedItems(newCheckedItems);
    };
    //click nút ẩn sẽ ẩn đi
    const handleDeleteSelected = async () => {
      const selectedIds = Object.keys(checkedItems).filter(
        (itemId) => checkedItems[itemId]
      );
    
      try {
        //await axiosClient.post(`admin/products/${selectedIds.join(',')}/delete`);
        await axiosClient.post('admin/customers/delete', {selectedIds});
        setCheckedItems({});
        setIngredient(ingredient.filter((customer) => !selectedIds.includes(customer._id)));
        toast.success("Đã xóa sản phẩm");
      } catch (error) {
        console.error(error);
        toast.error("Có lỗi xảy ra khi xóa sản phẩm");
      }
    };

  const getAllIngredients = async () => {
    try {
      const response = await axiosClient.get('/api/v1/ingredient/');
      setIngredient(response.data.payload);
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (e) =>{
    e.preventDefault();
    try {
        const response = await axiosClient.patch(`api/v1/ingredient/${selected._id}`, {name: uname, quantity: uquantity, unit: uunit, supplierId: usupplierId});
        if(response?.data.success){
            setVisible(true); // Đóng modal sau khi cập nhật thành công
            
            setSelected(null);
            setUName("");
            setUQuantity("");
            setUUnit("");
            setUSupplierId("");
            setIngredient(ingredient.map((ingredient) => {
              if (ingredient._id === selected._id) {
                return { ...ingredient, name: uname, quantity: uquantity, unit: uunit, supplierId: usupplierId }; // Cập nhật tên của danh mục tương ứng
              }
              return ingredient;
            }));
            toast.success(`Cập nhật thành công`);
        }
  
    } catch (error) {
        toast.error('Something went wrong')
    }
  };

   //Delete category
   const handleDelete = async (pId) =>{
    try {
        const response = await axiosClient.delete(`api/v1/ingredient/${pId}`);
        if(response){
            toast.success(`category is deleted`);
            setIngredient(ingredient.filter((i) => i._id !== pId)); 
            // Loại bỏ danh mục đã được xóa khỏi danh sách
          //   setProductsList(productsList.filter((product) => product._id !== pId)); 
          // setReload(prev => !prev); // Tải lại danh sách sản phẩm từ server
            
        }
        
    } catch (error) {
        toast.error('Something went wrong')
    }
  }
    useEffect(() =>{
      getAllIngredients();
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
            <Link to="/admin/ingredient"> Danh sách nguyên liệu</Link>
          </li>
        </ul>
        <div id="clock"></div>
      </div>

      <div className="row">
        <div className="col-md-12 p-3">
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
                    to={"/dashboard/admin/add_ingredient"}
                    className="btn btn-primary"
                  >
                    +
                  </NavLink>
                </div>
                <div className="col-sm-2">
                  <a
                    className="btn btn-danger"
                    type="button"
                    title="Xóa"
                    onClick={handleDeleteSelected}
                  >
                    <i className="fas fa-trash-alt"></i> Ẩn
                  </a>
                </div>

                
                <div className="col-sm-3">
                  <form className="d-flex " role="search" onSubmit={handleSearch}>
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)} />
                    <button className="btn btn-warming" type="submit">Search</button>
                  </form>
                </div>
              </div>
                <div className='shadow p-3'>
              <table
                className="table table-hover table-bordered js-copytextarea"
                cellPadding="0"
                cellspacing="0"
                border="0"
                id="sampleTable"
              >
                <thead>
                  <tr>
                    <th width="10">
                      <input type="checkbox" id="all" 
                      onChange={handleSelectAll}
                      />
                    </th>
                    <th width="200">Mã nguyên liệu</th>
                    <th width="150">Tên nguyên liệu</th>
                    {/* <th width="20">Ảnh đại diện</th> */}
                    <th>Số lượng </th>
                    <th>Ngày nhập</th>
                    <th>Đơn vị</th>
                    <th width="100">Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {currentIngredient && currentIngredient.map((i) =>(
                    <tr key={i._id}>
                      <td width="10">
                        <input type="checkbox" checked={checkedItems[i._id] || false}
  onChange={(event) => handleItemCheck(event, i._id)}/>
                      </td>
                      <td>{i._id}</td>
                      <td>{i.name}</td>
                      {/* <td>
                        <img
                          className="img-card-person"
                          src={`http://localhost:3333/${c.avatarUrl}`}
                          alt=""
                          width="100px;"
                          height={"100px"}
                        />
                      </td> */}
                      <td>{i.quantity}</td>
                      <td>{formatDate(i.date_add)}</td>
                      <td>{i.unit}</td>
                    
                      <td className="table-td-center">
                        <button
                          className="btn btn-primary btn-sm trash"
                          type="button"
                          title="Xóa"
                          onClick={() => { handleDelete(i._id)}}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>               
                        <button
                          type="button"
                          className="btn btn-primary btn-sm trash"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          data-bs-whatever="@mdo"
                          onClick={()=>{
                            setSelected(i);
                            setUName(i.name);
                            setUQuantity(i.quantity);
                            setUUnit(i.unit);
                            setUSupplierId(i.supplierId)
                          }}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <UpdateIngredient 
                          name={uname} 
                          quantity={uquantity} 
                          unit={uunit} 
                          supplierId={usupplierId} 
                          handleSubmit={handleUpdate}
                          setName={setUName}
                          setQuantity={setUQuantity}
                          setUnit={setUUnit}
                          setSupplierId={setUSupplierId}
                          />
                      </td>
                    </tr>
                    ))}
                  
                </tbody>
              </table>
              <div>
          <nav aria-label="Page navigation example ">
            <ReactPaginate
              previousLabel={'«'}
              nextLabel={'»'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination-sm'}
              activeClassName={'active'}
              pageLinkClassName={'page-link'}
              previousLinkClassName={'page-link'}
              nextLinkClassName={'page-link'}
              pageClassName={'page-item'}
              previousClassName={'page-item'}
              nextClassName={'page-item'}
            />
          </nav>
          </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Ingredients