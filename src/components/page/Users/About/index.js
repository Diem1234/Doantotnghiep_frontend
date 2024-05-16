import React from 'react'
import Footer from '../../../../layout/Users/Footer/Footer'
import Hero from '../../../Users/Hero/Hero'
import Navbar from '../Navbar/Navbar'
import About from '../../../Users/About/About'
import Team from '../../../Users/Team/Team'

const index = () => {
  return (
    <div className="container-xxl bg-white p-0">
      {/* <!-- Navbar & Hero Start --> */}
        <div className="container-xxl position-relative p-0">
            <Navbar/>
            <div className="container-xxl py-5 bg-dark hero-header mb-5">
                <div className="container text-center my-5 pt-5 pb-4">
                    <h1 className="display-3 text-white mb-3 animated slideInDown">About Us</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb justify-content-center text-uppercase">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item"><a href="#">Pages</a></li>
                            <li className="breadcrumb-item text-white active" aria-current="page">About</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
        {/* <!-- Navbar & Hero End --> */}

        {/* <!-- About Start --> */}
        <About/>
        {/* <!-- About End --> */}

        {/* <!-- Team Start --> */}
        <Team/>
        {/* <!-- Team End --> */}
        <Footer/>
        <Hero/>
    </div>
  )
}

export default index
