import React from 'react'
import './navbar.scss'

const Navigation = () => {
    return (
        <div>
          <input className="menu-icon" type="checkbox" id="menu-icon" name="menu-icon" />
          <label htmlFor="menu-icon"></label>
          <nav className="nav">
            <ul className="pt-5">
              <li><a href="/">Home</a></li>
              <li><a href="/trainer">Profile</a></li>
                <li><a href="/login">Feed</a></li>
                <li><a href="/logout">Logout</a></li>
            </ul>
          </nav>
        </div>
      );
}

export default Navigation