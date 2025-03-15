// import React from 'react'

// import { Button } from "./Button"
import "./Footer.css"

const Footer = () => {
  return (
    <div className="footer-manager">
        {/* <section className="footer-sub">
            <p className="footer-sub-heading">
                Email me or message me on LinkedIn!
            </p>
            <div className="input">
                <form>
                    <input type="email" name="email" placeholder="Your email" className="footer-input" />
                    <Button style="btn--primary">Email me!</Button>
                </form>
            </div>
        </section> */}
        <section className="socials">
            <div className="socials-container">
                <div className="footer-logo">
                    <a href="/" className="socials-logo">
                    TRANSPLANT<i className="bi bi-heart-pulse"></i>TRACKER
                    </a>
                </div>
                <div className="socials-icon">
                    <a className="socials-icon-link linkedin" href="https://www.linkedin.com/in/farhan-adeyemo-2a4113287" target="_blank">
                        <i className="bi bi-linkedin"></i>
                    </a>
                    <a className="socials-icon-link instagram" href="https://www.instagram.com/farhan.adey/" target="_blank">
                        <i className="bi bi-instagram"></i>
                    </a>
                    <a className="socials-icon-link gmail" href="mailto:farhanteni06@gmail.com" target="_blank">
                        <i className="bi bi-envelope-at"></i>
                    </a>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Footer