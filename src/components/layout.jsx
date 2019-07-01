import React from 'react'
import './layout.css'
import s from './layout.module.css'

let layout = (props) => {
  return (
    <div>
      <div className={s.headerBG} />
      <div className={s.content}>
        <header>
          {/*<img />*/}
          <h1>Earth Day Every Day Challenge</h1>
          <h2>Activity Menu</h2>
        </header>
        {props.children}
      </div>
    </div>
  );
};

export default layout;
