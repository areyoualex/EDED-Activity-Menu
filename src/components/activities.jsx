import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import s from './activities.module.css'

import exploratorium from '../img/explo-logo-black.svg'

class Activities extends React.Component {
  render () {
    return (
      <div className={s.main}>
        <Activity
          img={exploratorium}
          alt={"Exploratorium logo"} />
      </div>
    );
  }
}

class Activity extends React.Component {
  constructor() {
    super();
    this.state = {displaySize: 0};
    this.ref = React.createRef();
  }
  componentDidMount() {
    let displaySize = this.ref.current.offsetWidth / 7 * 2;
    this.setState({displaySize});
  }
  render() {
    return (
      <div className={s.activity} ref={this.ref}>
        <div className={s.activitySummary}>
          <div className={s.activityDisplay}
            style={{
              width: this.state.displaySize,
              height: this.state.displaySize}}>
            <img src={this.props.img} alt={this.props.imgAlt} />
            <div className={s.activityCategories}
              style={{
                width: "100%",
                height: this.state.displaySize/5
              }}>
              {}
            </div>
            <p>{this.props.points}</p>
          </div>
          <h3>{this.props.title}</h3>
          <span>{this.props.subtitle}</span>
        </div>
        <p>{this.props.description}</p>
      </div>
    );
  }
}


export default Activities;
