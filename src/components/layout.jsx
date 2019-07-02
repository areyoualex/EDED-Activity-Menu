import React from 'react'
import './layout.css'
import s from './layout.module.css'
import logo from '../img/sustainabilitylogo.webp'

let layout = (props) => {
  return (
    <div>
      <div className={s.headerBG} />
      <div className={s.content}>
        <header>
          <div className="wrapper">
            <img src={logo} />
            <a href="https://www.earthdayeverydaysf.com">
              <h1>SFUSD Earth Day Every Day Challenge</h1>
            </a>
          </div>
          <a href="https://www.earthdayeverydaysf.com">
            Back to Home
          </a>
        </header>
        {props.children}
      </div>
    </div>
  );
};

export default layout;
