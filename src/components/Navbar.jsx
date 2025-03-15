import {useState, useEffect} from 'react'
// import { Link } from 'react-router-dom'
import { Button } from './Button'
import "./Navbar.css"

function Navbar() {
  const [clicked, setClicked] = useState(false)
  const [button, setButton] = useState(true)

  const handleClick = () => setClicked(!clicked)
  const closeMenu = () => setClicked(false)

  const showButton = () => {
    if(window.innerWidth <= 960) {
      setButton(false)
    } else {
      setButton(true)
    }
  }

  useEffect (() => {
    showButton()
  }, [])

  window.addEventListener("resize", showButton)

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
            <a href="/" className="navbar-logo" onClick={closeMenu}>
              {/* <img src="/SVGs/moon-stars.svg" alt="MoonStars" width="32" height="32"/> */}
              TRANSPLANT<i className="bi bi-heart-pulse"></i>TRACKER
            </a>
            <div className="menu-icon" onClick={handleClick}>
              {/* <img src={clicked ? "/SVGs/x-square.svg": "/SVGs/list.svg"} alt = {clicked ? "Chevron": "List"} width="32" height="32"/> */}
              <i className={clicked ? "bi bi-x-square": "bi bi-list"}></i>
            </div>
            <ul className={clicked ? "nav-menu active": "nav-menu"}>
              <li className="nav-item">
                <a href="/" className="nav-link" onClick={closeMenu}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="/#/patients/patient-records" className="nav-link" onClick={closeMenu}>
                  Patients
                </a>
              </li>
              <li className="nav-item">
                <a href="/#/donors" className="nav-link" onClick={closeMenu}>
                  Donors
                </a>
              </li>
              <li className="nav-item">
                <a href="/#/hospitals" className="nav-link" onClick={closeMenu}>
                  Hospitals
                </a>
              </li>
              <li className="nav-item">
                <a href="/#/contact-us" className="nav-link-mobile" onClick={closeMenu}>
                  Contact Us
                </a>
              </li>
            </ul>
            {button && <Button style="btn--outline">CONTACT US</Button>}
        </div>
      </nav>
    </>
  )
}

export default Navbar