import React, { useEffect, useState } from "react";
import axiosClient from "./../../libraries/axiosClient";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { NavLink } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";
import UpdateMember from "./UpdateMember";
const ProfileManager = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [status, setStatus] = useState("");
  const [trend, setTrend] = useState("");
  //const [question,setQuestion]= useState("")
  const [selected,setSelected] = useState(null)
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Thông tin cá nhân");
  }, []);

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
      console.log()
      if (response?.error) {
        toast.error(response?.error);
      } else {
        setAuth({ ...auth, user: response?.updatedUser });
        console.log('auth',auth.user.role)
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleUpdate = async (e) =>{
    e.preventDefault();
    try {
        const response = await axiosClient.put(`api/v1/auth/accounts/${auth.user._id}/family-members/${selected._id}`, {
          name: name, 
          gender: gender, status: status, age: age, trend: trend,phone: phone
        });
        if(response){
            setSelected(null);
            setName("");
            setGender("");
            setAge("");
            setStatus("");
            setTrend("");
            setPhone("");
            setAuth((prevAuth) => ({
              ...prevAuth,
              user: {
                ...prevAuth.user,
                familyMembers: prevAuth.user.familyMembers.map((member) =>
                  member._id === selected._id
                    ? { ...member, ...response?.data.payload }
                    : member
                ),
              },
            }));
            toast.success(`Cập nhật thành công`);
            console.log('authudt',auth.user)
        }
  
    } catch (error) {
        toast.error('Something went wrong')
    }
  };

  //Delete category
  const handleDelete = async () =>{
    try {
        const response = await axiosClient.delete(`api/v1/auth/accounts/${auth.user._id}/family-members/${selected._id}`);
        if(response){
            toast.success('Thành viên đã được xóa');
            setAuth((prevAuth) => ({
              ...prevAuth,
              user: {
                ...prevAuth.user,
                familyMembers: prevAuth.user.familyMembers.filter((i) => i._id !== selected._id),
              },
            })); 
            // Loại bỏ danh mục đã được xóa khỏi danh sách
          //   setProductsList(productsList.filter((product) => product._id !== pId)); 
          // setReload(prev => !prev); // Tải lại danh sách sản phẩm từ server
            
        }
        
    } catch (error) {
        toast.error('Something went wrong')
    }
  }
  return (
    <main className="app-content">
      <div className="row">
        
        <div className="col-md-12">
          <div className="tile">
            <h3 className="tile-title">Thông tin cá nhân</h3>
            
            <div className="tile-body row">
              <form className="col-md-4" >
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
                <button type="button" className="btn btn-primary btn-submit" onClick={handleSubmit}>
                  Submit
                </button>
              </form>

              <div className="col-md-7 shadow border border-info p-2">
                <div className="col-sm-1 float-end mb-2">
                  <NavLink
                    to={`/dashboard/${auth?.user?.role === 'admin' ? 'admin' : 'user'}/addmember`}
                    className="btn btn-primary"
                  >
                    +
                  </NavLink>
                </div>
              <table
                className="table table-hover table-bordered js-copytextarea"
                cellPadding="0"
                cellspacing="0"
                border="0"
                id="sampleTable"
              >
                <thead>
                  <tr>
                      <th>Tên</th>
                      <th>Giới tính</th>
                      <th>Tình trạng</th>
                      <th>Tuổi</th>
                      <th>Xu hướng</th>
                      <th>Số điện thoại</th>
                      <th>Tính năng</th>
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
                            <td><button
                              type="button"
                              className="btn btn-primary btn-sm trash"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              data-bs-whatever="@mdo"
                              onClick={()=>{
                                setSelected(member);
                                setName(member.name)
                                setGender(member.gender)
                                setAge(member.age)
                                setStatus(member.status)
                                setTrend(member.trend)
                                setPhone(member.phone)
                              }}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <UpdateMember 
                            name={name} setName={setName} 
                            gender={gender} setGender={setGender}
                            status={status} setStatus={setStatus}
                            age={age} setAge={setAge}
                            trend={trend} setTrend={setTrend}
                            phone={phone} setPhone={setPhone} handleSubmit={handleUpdate} handleDelete={handleDelete}/>
                            </td>
                    </tr>
                    ))}
                  
                </tbody>
              </table>
                {/* <img src="https://static.vecteezy.com/system/resources/previews/018/989/610/original/a-man-finishes-work-on-deadline-flat-cartoon-illustration-of-enterprising-man-working-on-laptop-vector.jpg" width="100%" className="mt-5"/> */}
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileManager;
