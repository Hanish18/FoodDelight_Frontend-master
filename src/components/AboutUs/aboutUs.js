import React from 'react'
import signupJpg from '../../assets/images/aboutus.jpg'

export default () => {
    return (
      <div className="main-container">
        
         <img className="orderfood-image" src={signupJpg} alt="aboutus-image" />
         <div className="form-contain">
           We provide a service to customers where they<br />
           can order recipe of their choice instead <br />
           of picking from restaurant menu and chefs/home <br />
           makers who are willing to cook that recipe <br />
           can take the order. Initially, after successful<br />
           login the application customers can add item<br />
           of their wish to their order and describe how<br />
           they want it to be cooked. Chefs and home makers<br />
           with cooking licence who want to make some extra<br />
           income can signup as a chef. For the users who<br />
           are also the chefs, there will be two views:<br />
           as a customer or as a chef. Upon selecting,<br />
           the respective rendering is done.
      </div>
      </div>
    )
  }
  