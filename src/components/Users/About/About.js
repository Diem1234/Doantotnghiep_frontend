import React, { useEffect } from "react";
import { useTitle } from "../../../hooks/useTitle";

const About = () => {
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Về chúng tôi");
  }, []);

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <div className="row g-3">
              <div className="col-6 text-start">
                <img
                  className="img-fluid rounded w-100 wow zoomIn"
                  data-wow-delay="0.1s"
                  src="img/about-1.jpg"
                />
              </div>
              <div className="col-6 text-start">
                <img
                  className="img-fluid rounded w-75 wow zoomIn"
                  data-wow-delay="0.3s"
                  src="img/about-2.jpg"
                  style={{ marginTop: "25%" }}
                />
              </div>
              <div className="col-6 text-end">
                <img
                  className="img-fluid rounded w-75 wow zoomIn"
                  data-wow-delay="0.5s"
                  src="img/about-3.jpg"
                />
              </div>
              <div className="col-6 text-end">
                <img
                  className="img-fluid rounded w-100 wow zoomIn"
                  data-wow-delay="0.7s"
                  src="img/about-4.jpg"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <h5 className="section-title ff-secondary text-start text-primary fw-normal">
              About Us
            </h5>
            <h1 className="mb-4">
              Chào mừng đến với{" "}
              <i className="fa fa-utensils text-primary me-2"></i>Bếp Việt
            </h1>
            <p className="mb-4">
              Điểm đến ẩm thực số 1 dành cho những người yêu thích các món ăn
              truyền thống và sáng tạo của Việt Nam!
            </p>
            <p className="mb-4">
              Tại Bếp Việt, chúng tôi tự hào giới thiệu đến bạn hàng nghìn công
              thức nấu ăn đa dạng, từ những món ăn dân dã đến những sáng tạo mới
              lạ. Mỗi món ăn được chế biến tỉ mỉ với những nguyên liệu tươi ngon
              và chất lượng nhất, nhằm mang đến những trải nghiệm ẩm thực tuyệt
              vời.
            </p>
            <div className="row g-4 mb-4">
              <div className="col-sm-6">
                <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                  <h1
                    className="flex-shrink-0 display-5 text-primary mb-0"
                    data-toggle="counter-up"
                  >
                    15
                  </h1>
                  <div className="ps-4">
                    <p className="mb-0">năm</p>
                    <h6 className="text-uppercase mb-0">Kinh nghiệm</h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                  <h1
                    className="flex-shrink-0 display-5 text-primary mb-0"
                    data-toggle="counter-up"
                  >
                    50
                  </h1>
                  <div className="ps-4">
                    <p className="mb-0">Đầu bếp</p>
                    <h6 className="text-uppercase mb-0">Nổi tiếng</h6>
                  </div>
                </div>
              </div>
            </div>
            <a className="btn btn-primary py-3 px-5 mt-2" href="">
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
