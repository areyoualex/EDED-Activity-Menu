import React from 'react'

let layout = (props) => {
  return (
    <div>
      <header>
        {/*<img />*/}
        <h1>Earth Day Every Day Challenge</h1>
        <h2>Activity Menu</h2>
      </header>
      {props.children}
    </div>
  );
};

export default layout;
