/// import React from 'react'
import "../App.css"
import { Button } from "./Button"
import "./Opening.css"

const Opening = () => {
  return (
    <div className="opening-container">
        <h1 className="title">From donor to patient without delay</h1>
        {/* <p className="subtitle">Welcome to my portfolio</p> */}
        <div className="opening-btns">
            {/* <Button className="btn" style="btn--secondary" size="btn--large">
                Discover
            </Button> */}
            <Button className="btn" style="btn--secondary" size="btn--large" link="/#/live-tracker">
                Live Tracker <i className="bi bi-geo-alt"></i>
            </Button>
        </div>
    </div>
  )
}

export default Opening