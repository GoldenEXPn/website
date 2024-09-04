import React from "react";
import CopyRight from "./footer/CopyRight";

function Footer() {
  return (
    <footer id="footer">
      {/* <section>
        <form method="post" action="#">
          <div className="fields">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email" />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea name="message" id="message" rows="3"></textarea>
            </div>
          </div>
          <ul className="actions">
            <li>
              <input type="submit" value="Send Message" />
            </li>
          </ul>
        </form>
      </section>
      <section className="split contact">
        <section className="alt">
          <h3>Address</h3>
          <p>
            1234 Somewhere Road #87257
            <br />
            Nashville, TN 00000-0000
          </p>
        </section>
        <section>
          <h3>Phone</h3>
          <p>
            <a href="#">(000) 000-0000</a>
          </p>
        </section>
        <section>
          <h3>Email</h3>
          <p>
            <a href="#">info@untitled.tld</a>
          </p>
        </section>
        <section>
          <h3>Social</h3>
          <ul className="icons alt">
            <li>
              <a href="#" className="icon brands alt fa-twitter">
                <span className="label">Twitter</span>
              </a>
            </li>
            <li>
              <a href="#" className="icon brands alt fa-facebook-f">
                <span className="label">Facebook</span>
              </a>
            </li>
            <li>
              <a href="#" className="icon brands alt fa-instagram">
                <span className="label">Instagram</span>
              </a>
            </li>
            <li>
              <a href="#" className="icon brands alt fa-github">
                <span className="label">GitHub</span>
              </a>
            </li>
          </ul>
        </section>
      </section> */}
      <CopyRight />
    </footer>
  );
}

export default Footer;