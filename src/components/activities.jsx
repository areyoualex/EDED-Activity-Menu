import React from 'react'

import s from './activities.module.css'

class Activities extends React.Component {
  render () {
    return (
      <div className={s.main}>
      </div>
    );
  }
}

class Activity extends React.Component {
  render() {
    return (
      <div className={s.activity}>
      </div>
    );
  }
}


export default Activities;
