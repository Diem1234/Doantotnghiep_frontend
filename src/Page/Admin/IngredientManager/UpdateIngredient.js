import React from "react";

const UpdateIngredient = ({name,quantity,unit,supplierId,handleSubmit,setName,setQuantity,setUnit,setSupplierId}) => {
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
                    <h5>Thông tin nguyên liệu</h5>
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label className="control-label">Mã nguyên liệu</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value="#CD2187"
                    disabled
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Tên nguyên liệu</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                  />
                </div>
                <div className="form-group  col-md-6">
                  <label className="control-label">Số lượng</label>
                  <input
                    className="form-control"
                    type="number"
                    required
                    value={quantity}
                    onChange={(e)=> setQuantity(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Nhà cung cấp</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value={supplierId}
                    onChange={(e)=> setSupplierId(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Đơn vị</label>
                  <input className="form-control" type="text" value={unit} onChange={(e)=> setUnit(e.target.value)}/>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
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

export default UpdateIngredient;
