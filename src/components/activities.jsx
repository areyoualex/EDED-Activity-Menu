import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import s from './activities.module.css'

import exploratorium from '../img/explo-logo-black.svg'

import cats from '../categoryData.json'

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
  static defaultProps = {categories: []}
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
              {Object.keys(cats).map((cat)=>(
                <Category active={this.props.categories.includes(cat)
                    || this.props.categories.includes("All")}
                  color={cats[cat].color}
                  icon={cats[cat].image}
                  size={this.state.displaySize/5}
                  key={cat} />
              ))}
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

class Category extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  async getImage() {
    let img = await import("../img/category/"+this.props.icon);
    let imgurl = img.default;
    this.setState({img: imgurl});
  }
  componentDidMount() {
    this.getImage();
  }
  render() {
    let styles = {};
    return (
      <div>
        <div style={{
            width: this.props.size,
            height: this.props.size,
            backgroundColor: this.props.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
          <img src={this.state.img} style={{
              height: this.props.size/4*3
            }} />
        </div>
      </div>
    )
  }
}


export default Activities;
