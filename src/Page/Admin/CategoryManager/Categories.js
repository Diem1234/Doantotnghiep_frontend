import React, { useEffect, useState } from "react";

import { toast } from "react-hot-toast";
import axiosClient from "../../../libraries/axiosClient";
import UpdateCategories from "./UpdateCategories";

const Categories = () => {
  const [categories,setCategories]= useState([]);
  const [photo,setPhoto]=useState("")
  const [name,setName] = useState("")
  const [visible,setVisible]= useState(false)
  const [selected,setSelected] = useState(null)
  const [updateName,setUpdateName] = useState("")
  //handle Form
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const response = await axiosClient.post("api/v1/categories/create", { name, photo });
      if (response?.data.payload) {
        toast.success(response.data.message);
        console.log(response.data.message)
        setName();
        setPhoto();
        setCategories([...categories, response.data.payload]); // Thêm danh mục mới vào danh sách
      } 
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };


  const getAllCategories = async () => {
    try {
      const response = await axiosClient.get('api/v1/categories/');
      console.log(response)
      if(response){
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
    },[]);
//update category
const handleUpdate = async (e) =>{
  e.preventDefault();
  try {
      const response = await axiosClient.patch(`api/v1/categories/${selected._id}`, {name: updateName});
      if(response?.data.success){
            setVisible(true); // Đóng modal sau khi cập nhật thành công
          toast.success(`${updateName} is updated`);
          setSelected(null);
          setUpdateName("");
          setCategories(categories.map((category) => {
            if (category._id === selected._id) {
              return { ...category, name: updateName }; // Cập nhật tên của danh mục tương ứng
            }
            return category;
          }));
      }

  } catch (error) {
      toast.error('Something went wrong')
  }
};


    //Delete category
    const handleDelete = async (pId) =>{
      try {
          const response = await axiosClient.delete(`api/v1/categories/${pId}`);
            console.log(response)
          if(response?.data.success){
              toast.success(`category is deleted`);
              setCategories(categories.filter((category) => category._id !== pId)); // Loại bỏ danh mục đã được xóa khỏi danh sách
          }
          
      } catch (error) {
          toast.error('Something went wrong')
      }
  };
  return (
    <div className="maincate "><h3>Quản lý danh mục sản phẩm</h3>
      <div className="row">
        <div className="p-3 col-md-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nhập danh mục mới"
                value = {name}
                onChange={(e)=> setName(e.target.value)} 
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="image"
                value = {photo}
                onChange={(e)=> setPhoto(e.target.value)} 
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-submit">
              Submit
            </button>
          </form>
        </div>
        <div className="col-md-7 shadow">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {categories && categories.map((c)=> (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>
                  <button
                    className="btn btn-primary ms-2 float-end"
                    type="button"
                    title="Cập nhật"
                    id="show-emp"
                    data-bs-toggle="modal"
                    data-bs-target="#ModalUP"
                    onClick={() => {
                      setVisible(true) ;
                      setUpdateName(c.name);
                      setSelected(c)
                      }}
                  >
                    Edit
                  </button><UpdateCategories setVisible={setVisible} value={updateName}  setValue={setUpdateName} handleSubmit={handleUpdate} />
                  {/* <button className="btn btn-primary ms-2">Edit</button> */}
                  <button className="btn btn-delete btn-delete float-end" 
                  onClick={() => { handleDelete(c._id)}}>Delete</button>
                </td>
              </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Categories;
