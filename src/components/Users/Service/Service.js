import React, { useEffect } from 'react'
import { useTitle } from '../../../hooks/useTitle';

const Service = () => {
    
  const { setTitle } = useTitle();
  useEffect(() => {
    setTitle("Dịch vụ");
  }, []);
  return (
    <div className="container-xxl py-5">
        <div className="container">
            <div className="row g-4">
                <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="service-item rounded pt-3">
                        <div className="p-4">
                            <i className="fa fa-3x fa-user-tie text-primary mb-4"></i>
                            <h5>Bậc thầy đầu bếp</h5>
                            <p>Đội ngũ đầu bếp tài năng và giàu kinh nghiệm, truyền tải hương vị truyền thống kết hợp sự sáng tạo.</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div className="service-item rounded pt-3">
                        <div className="p-4">
                            <i className="fa fa-3x fa-utensils text-primary mb-4"></i>
                            <h5>Thực phẩm chất lượng</h5>
                            <p>Cam kết sử dụng những nguyên liệu tươi ngon và chất lượng cao nhất để chế biến các món ăn.</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div className="service-item rounded pt-3">
                        <div className="p-4">
                            <i className="fa fa-3x fa-cart-plus text-primary mb-4"></i>
                            <h5>Cập nhật nhanh chóng</h5>
                            <p> Chúng tôi không ngừng nghiên cứu và tinh chỉnh các công thức để đem đến những trải nghiệm tốt</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
                    <div className="service-item rounded pt-3">
                        <div className="p-4">
                            <i className="fa fa-3x fa-headset text-primary mb-4"></i>
                            <h5>24/7 Dịch vụ</h5>
                            <p>Bếp Việt hoạt động 24 giờ mỗi ngày, 7 ngày trong tuần để luôn sẵn sàng phục vụ bạn.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Service