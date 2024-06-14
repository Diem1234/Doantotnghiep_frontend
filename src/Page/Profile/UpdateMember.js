import React from "react";

const UpdateMember = ({name,gender,status,age,trend,phone,handleSubmit,setName,setGender,setStatus,setAge,setTrend,setPhone,handleDelete}) => {
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
                    <h5>Thông tin thành viên</h5>
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label className="control-label">Tên</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Giới tính</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value={gender}
                    onChange={(e)=> setGender(e.target.value)}
                  />
                </div>
                <div className="form-group  col-md-6">
                  <label className="control-label">Bệnh lý</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value={status}
                    onChange={(e)=> setStatus(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Tuổi</label>
                  <input
                    className="form-control"
                    type="number"
                    required
                    value={age}
                    onChange={(e)=> setAge(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Xu hướng</label>
                  <input className="form-control" type="text" value={trend} onChange={(e)=> setTrend(e.target.value)}/>
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Số điện thoại</label>
                  <input className="form-control" type="text" value={phone} onChange={(e)=> setPhone(e.target.value)}/>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleDelete}
                data-bs-dismiss="modal"
                
              >
                Xóa
              </button>
              <button type="button" onClick={handleSubmit} data-bs-dismiss="modal"  className="btn btn-primary" >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMember;
