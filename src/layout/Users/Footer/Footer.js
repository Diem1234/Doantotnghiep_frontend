import React from 'react'

const Footer = () => {
  return (
    <div className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
            <div className="row g-5">
                <div className="col-lg-3 col-md-6">
                    <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">Bếp Việt</h4>
                    <a className="btn btn-link" href="">Về chúng tôi</a>
                    <a className="btn btn-link" href="">Liên hệ</a>
                    <a className="btn btn-link" href="">Reservation</a>
                    <a className="btn btn-link" href="">Tuyệt đối bảo mật</a>
                    <a className="btn btn-link" href="">Điều khoản & Điều kiện</a>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">Liên hệ</h4>
                    <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>77 Phạm Công Trứ , Cẩm lệ, Đà Nẵng</p>
                    <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                    <p className="mb-2"><i className="fa fa-envelope me-3"></i>info@example.com</p>
                    <div className="d-flex pt-2">
                        <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-twitter"></i></a>
                        <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-facebook-f"></i></a>
                        <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-youtube"></i></a>
                        <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">Opening</h4>
                    <h5 className="text-light fw-normal">Thứ hai - Thứ sáu</h5>
                    <p>9:00 - 21:00</p>
                    <h5 className="text-light fw-normal">Thứ 7</h5>
                    <p>10:00 - 20:00</p>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">Bản tin</h4>
                    <p>Hãy liên hệ với chúng tôi khi bạn cần</p>
                    <div className="position-relative mx-auto" style={{maxWidth: '400px'}}>
                        <input className="form-control border-primary w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email"/>
                        <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">Đăng ký</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="copyright">
                <div className="row">
                <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                    &copy; <a className="border-bottom" href="#">Đồ án tốt nghiệp</a>_ Nguyễn Đặng Kiều Diểm 
                    {/* Designed By <a className="border-bottom" href="https://htmlcodex.com">HTML Codex</a><br/><br/>
                    Distributed By <a className="border-bottom" href="https://themewagon.com" target="_blank">ThemeWagon</a> */}
                </div>
                    <div className="col-md-6 text-center text-md-end">
                        <div className="footer-menu">
                            <a href="">Home</a>
                            <a href="">Cookies</a>
                            <a href="">Help</a>
                            <a href="">FQAs</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer
