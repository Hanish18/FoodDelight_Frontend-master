import React, { useState } from 'react'
import '../../assets/css/style.css'
import axios from 'axios'
import { API_BASE_URL } from '../Constants/constants'

import signupJpg from '../../assets/images/orderFood.jpg'

export default (props) => {
  const [item, setItem] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')

  const saveOrderDetails = () => {
    axios({
      method: 'POST',
      url: API_BASE_URL + 'dashboard/',
      headers: { 'Content-Type': 'application/json', authToken: props.authToken },
      data: {
        username: props.username,
        itemName: item,
        dueDate: dueDate,
        itemPrice: price,
        itemDescription: description,
      },
    })
      .then((response) => {
        if(response.data == "Please add address in manage account before placing order") {
          alert(response.data)
        }
        else {
          alert('Order details saved successfully')
        }
      })
  }

  return (
      
    <div className="main-container">
      <img className="orderfood-image" src={signupJpg} alt="orderFood-image" />
      <div className="form-container">
        <h2 className="form-title">Enter order details</h2>
        <input
          type="text"
          className="form-input-text-input"
          name="item"
          placeholder="Item name"
          onChange={(evnt) => setItem(evnt.target.value)}
          required
        />

        <input
          type="datetime-local"
          className="form-input-text-input"
          name="dueDate"
          placeholder="Due Date"
          onChange={(evnt) => setDueDate(evnt.target.value)}
          required
        />

        <input
          type="text"
          className="form-input-text-input"
          name="price"
          placeholder="Price"
          onChange={(evnt) => setPrice(evnt.target.value)}
          required
        />

        <textarea
          id="description"
          name="description"
          className="form-input-text-area"
          rows="4"
          cols="50"
          placeholder="Item Description"
          onChange={(evnt) => setDescription(evnt.target.value)}
          required
        />

        <button className="signup-btn" type="submit" onClick={saveOrderDetails}>
          Save
        </button>
      </div>
    </div>
  )
}
