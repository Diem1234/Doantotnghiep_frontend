import React from 'react'

const BreadcrumbNav = ({ title, breadcrumbItems }) => {
  return (
    <div className="container-xxl py-5 bg-dark hero-header mb-5">
          <div className="container text-center my-5 pt-5 pb-4">
            <h1 className="display-3 text-white mb-3 animated slideInDown">
              {title}
            </h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center text-uppercase">
                <li className="breadcrumb-item">
                  <a href="#">Trang Chủ</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">TRang</a>
                </li>
                <li
                  className="breadcrumb-item text-white active"
                  aria-current="page"
                >
                 {breadcrumbItems}
                </li>
              </ol>
            </nav>
          </div>
        </div>
  )
}

export default BreadcrumbNav