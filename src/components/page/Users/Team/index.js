import React from 'react'
import Footer from '../../../../layout/Users/Footer/Footer'
import Hero from '../../../Users/Hero/Hero'
import Team from '../../../Users/Team/Team'
import Navbar from '../Navbar/Navbar'

const index = () => {
  return (
    <div class="container-xxl bg-white p-0">
        {/* <!-- Navbar & Hero Start --> */}
        <div class="container-xxl position-relative p-0">
            <Navbar/>

            <div class="container-xxl py-5 bg-dark hero-header mb-5">
                <div class="container text-center my-5 pt-5 pb-4">
                    <h1 class="display-3 text-white mb-3 animated slideInDown">Our Team</h1>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb justify-content-center text-uppercase">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item"><a href="#">Pages</a></li>
                            <li class="breadcrumb-item text-white active" aria-current="page">Team</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
        {/* <!-- Navbar & Hero End --> */}


        {/* <!-- Team Start --> */}
        <Team/>
        {/* <!-- Team End --> */}
        

        <Footer/>
        <Hero/>

    </div>
  )
}

export default index