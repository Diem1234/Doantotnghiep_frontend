import React from "react";

const ShowFilterMember = ({status}) => {
  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal2"
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
                    <h5>Danh sách thành viên bệnh huyết áp cao</h5>
                  </span>
                </div>
              </div>
              <div className="row">
              <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Tên</th>
                      <th>Giới tính</th>
                      <th>Tình trạng</th>
                      <th>Tuổi</th>
                      <th>Trạng thái</th>
                      <th>Số điện thoại</th>
                    </tr>
                  </thead>
                  <tbody className="table table-bordered">
                        {status && status.map((member) => (
                          <tr key={member._id}>
                            <td>{member.name}</td>
                            <td>{member.gender}</td>
                            <td>{member.status}</td>
                            <td>{member.age}</td>
                            <td>{member.trend}</td>
                            <td>{member.phone}</td>
                          </tr>
                        ))}
                   
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowFilterMember;
