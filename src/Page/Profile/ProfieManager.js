import React, { useEffect, useState } from "react";
import axiosClient from "./../../libraries/axiosClient";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/auth";

const ProfileManager = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  //const [question,setQuestion]= useState("")

  //get user data
  useEffect(() => {
    const { email } = auth?.user;
    console.log('dgfgf',auth?.user)
    setEmail(email);
  }, [auth?.user]);

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const response = await axiosClient.put("api/v1/auth/profile", {
        email,
        password,
      });

      if (response?.error) {
        toast.error(response?.error);
      } else {
        setAuth({ ...auth, user: response?.updatedUser });
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <main className="app-content">
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <h3 className="tile-title">Thông tin cá nhân</h3>
            <div className="tile-body row">
              <form className="col-md-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập danh mục mới"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="image"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-submit">
                  Submit
                </button>
              </form>

              <div className="col-md-6 shadow ms-5 border border-info">
              <table
                className="table table-hover table-bordered js-copytextarea"
                cellPadding="0"
                cellspacing="0"
                border="0"
                id="sampleTable"
              >
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
                <tbody>
                  {auth.user && auth.user.familyMembers.map((member) =>(
                    <tr key={member._id}>
                            <td>{member.name}</td>
                            <td>{member.gender}</td>
                            <td>{member.status}</td>
                            <td>{member.age}</td>
                            <td>{member.trend}</td>
                            <td>{member.phone}</td>
                    
                      <td className="table-td-center">
                        <button
                          className="btn btn-primary btn-sm trash"
                          type="button"
                          title="Xóa"
                        //   onClick={() => { handleDelete(i._id)}}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>               
                        <button
                          type="button"
                          className="btn btn-primary btn-sm trash"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          data-bs-whatever="@mdo"
                        //   onClick={()=>{
                        //     setSelected(i);
                        //     setUName(i.name);
                        //     setUQuantity(i.quantity);
                        //     setUUnit(i.unit);
                        //     setUSupplierId(i.supplierId)
                        //   }}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        {/* <UpdateIngredient 
                          name={uname} 
                          quantity={uquantity} 
                          unit={uunit} 
                          supplierId={usupplierId} 
                          handleSubmit={handleUpdate}
                          setName={setUName}
                          setQuantity={setUQuantity}
                          setUnit={setUUnit}
                          setSupplierId={setUSupplierId}
                          /> */}
                      </td>
                    </tr>
                    ))}
                  
                </tbody>
              </table>
                {/* <img src="https://static.vecteezy.com/system/resources/previews/018/989/610/original/a-man-finishes-work-on-deadline-flat-cartoon-illustration-of-enterprising-man-working-on-laptop-vector.jpg" width="100%" className="mt-5"/> */}
              </div>

              {/* <div className="form-group  col-md-3">
                <label for="exampleSelect1" className="control-label">
                  Chức vụ
                </label>
                <select className="form-control" id="exampleSelect1">
                  <option>-- Chọn chức vụ --</option>
                  <option>Bán hàng</option>
                  <option>Tư vấn</option>
                  <option>Dịch vụ</option>
                  <option>Thu Ngân</option>
                  <option>Quản kho</option>
                  <option>Bảo trì</option>
                  <option>Kiểm hàng</option>
                  <option>Bảo vệ</option>
                  <option>Tạp vụ</option>
                </select>
              </div>

              <div className="form-group col-md-12">
                <label className="control-label">Ảnh 3x4 nhân viên</label>
                <div id="myfileupload">
                  <input
                    type="file"
                    id="uploadfile"
                    name="ImageUpload"
                    onchange="readURL(this);"
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileManager;
