import React from "react";
import { useState } from "react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useAuth } from "../../context/auth";
import axiosClient from "../../libraries/axiosClient";

const AddMembers = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [familyMembers, setFamilyMembers] = useState([
    {
      name: "",
      gender: "",
      status: "",
      age: 0,
      trend: "",
      phone: "",
    },
  ]);

  const handleChange = (index, name, value) => {
    const newFamilyMembers = [...familyMembers];
    newFamilyMembers[index][name] = value;
    setFamilyMembers(newFamilyMembers);
  };

  const addMemberField = () => {
    setFamilyMembers([
      ...familyMembers,
      {
        name: "",
        gender: "",
        status: "",
        age: 0,
        trend: "",
        phone: "",
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await axiosClient.post(
        `api/v1/auth/${auth?.user?._id}/creatMember`, familyMembers
      );
      console.log('gjh', response.data.payload);
      if (response) {
        toast.success(response.message);
        // setName(response.payload);
        setAuth({ ...auth, user: response?.data.payload });  // Thêm danh mục mới vào danh sách
        navigate(
          `/dashboard/${auth?.user?.role === "admin" ? "admin" : "user"
          }/profile`
        ); // Chuyển hướng về trang profile
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  useEffect(() => { console.log(auth.user) }, []);
  return (
    <main className="container">
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb">
          <li
            className="breadcrumb-item"
            onClick={() => navigate("/main/productsmanager")}
          >
            Profile
          </li>
          <li className="breadcrumb-item">
            <a href="#">Thêm thành viên</a>
          </li>
        </ul>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h3 className="title-title">Tạo thành viên</h3>
          <form className=" row p-3 shadow">
            <button
              type="button"
              onClick={addMemberField}
              className="btn btn-primary col-md-3"
            >
              Thêm
            </button>
            {familyMembers.map((member, index) => (
              <div
                key={index}
                className="form-group row col-md-12 border mt-3 p-2 m-1"
              >
                <div className="form-group col-md-3">
                  <label className="control-label">Tên</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value={member.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                  />
                </div>
                <div className="form-group col-md-3">
                  <label className="control-label">Giới tính</label>
                  {/* <input
                    className="form-control"
                    type="text"
                    required
                    value={member.gender}
                    onChange={(e) =>
                      handleChange(index, "gender", e.target.value)
                    }
                  /> */}
                  <select
                    className="form-control"
                    id="exampleSelect1"
                    required
                    value={member.gender}
                    onChange={(e) =>
                      handleChange(index, "gender", e.target.value)
                    }
                  >
                    <option value={'Nữ'}>Nữ</option>
                    <option value={'Nam'}>
                      Nam
                    </option>

                  </select>
                </div>
                <div className="form-group col-md-3">
                  <label className="control-label">Tình trạng</label>
                  <input
                    className="form-control"
                    type="text"
                    value={member.status}
                    onChange={(e) =>
                      handleChange(index, "status", e.target.value)
                    }
                  />
                </div>
                <div className="form-group col-md-3">
                  <label className="control-label">Tuổi</label>
                  <input
                    className="form-control"
                    name="mota"
                    id="mota"
                    type="number"
                    value={member.age}
                    onChange={(e) =>
                      handleChange(index, "age", e.target.value)
                    }
                  />
                </div>

                <div className="form-group  col-md-3">
                  <label className="control-label">Xu hướng</label>
                  {/* <input
                    className="form-control"
                    type="text"
                    required
                    value={member.trend}
                    onChange={(e) =>
                      handleChange(index, "trend", e.target.value)
                    }
                  /> */}
                  <select
                    className="form-control"
                    id="exampleSelect1"
                    required
                    value={member.trend}
                    onChange={(e) =>
                      handleChange(index, "trend", e.target.value)
                    }
                  >
                    <option value={"Bình thường"}>Bình thường</option>
                    <option value={'Giảm cân'}>
                      Giảm cân
                    </option>
                    <option value={'Tăng cân'}>Tăng cân</option>

                  </select>
                </div>

                <div className="form-group  col-md-3">
                  <label className="control-label">Số điện thoại</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value={member.phone}
                    onChange={(e) =>
                      handleChange(index, "phone", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
            <div className="row col-md-12 d-flex justify-content-center g-3 ">
              <button className="btn btn-info col-md-3 me-2" type="button" onClick={handleSubmit}>
                Lưu lại
              </button>
              <button
                className="btn btn-danger col-md-3"
                onClick={() =>
                  navigate(
                    `/dashboard/${auth?.user?.role === "admin" ? "admin" : "user"
                    }/profile`
                  )
                }
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

export default AddMembers;
