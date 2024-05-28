import React from 'react'
import Service from '../../components/Users/Service/Service'
import About from '../../components/Users/About/About'
import Menu from '../../components/Users/Menu/Menu'
import Team from "../../components/Users/Team/Team";
import Reservation from '../../components/Users/Reservation/Reservation'


const Home = () => {
  return (
    <div>
        <div className="container-xxl py-5 bg-dark hero-header mb-5">
            <div className="container my-5 py-5">
                <div className="row align-items-center g-5">
                    <div className="col-lg-6 text-center text-lg-start">
                        <h1 className="display-3 text-white animated slideInLeft">Tận hưởng<br/>cùng những món ăn ngon</h1>
                        <p className="text-white animated slideInLeft mb-4 pb-2">Bếp Việt là điểm đến hàng đầu dành cho những người yêu thích ẩm thực Việt Nam. Với hàng nghìn công thức nấu ăn đa dạng, từ món truyền thống đến những sáng tạo mới lạ, Bếp Việt mang đến nguồn cảm hứng vô tận để bạn khám phá và trải nghiệm nền ẩm thực đa dạng và độc đáo của Việt Nam.</p>
                        <a href="" className="btn btn-primary py-sm-3 px-sm-5 me-3 animated slideInLeft">Đặt hẹn trước</a>
                    </div>
                    <div className="col-lg-6 text-center text-lg-end overflow-hidden">
                        <img className="img-fluid" src="img/hero.png" alt=""/>
                    </div>
                </div>
            </div>
        </div>
        <Team />
        <Service />
        <About />
        <Menu />
        <Reservation />
    </div>
  )
}

export default Home