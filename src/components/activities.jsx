import React from 'react'
// import { useStaticQuery, graphql } from 'gatsby'

import { connect } from 'react-redux'

import s from './activities.module.css'

import colorMap from '../colorMap.json'

class Activities extends React.Component {
  render () {
    return (
      <div className={s.main}>
        {this.props.activities.map((activity)=>{
          return (
            <Activity key={activity.Title}
              title={activity.Title}
              img={activity.Image}
              grade={activity["Grade Level"]}
              type={activity.Type}
              points={activity.Points}
              description={activity.Description}
              links={activity.Links}
              categories={activity.Category} />
          );
        })}
      </div>
    );
  }
}

class Activity extends React.Component {
  static defaultProps = {categories: []}
  render() {
    let gradeString = "";
    if (this.props.grade) {
      gradeString = this.props.grade.includes("-") ?
      "Grades "+this.props.grade
      : "Grade "+this.props.grade;
    }
    let typeString = "";
    if (this.props.type) {
      for (let i of this.props.type)
        typeString = typeString+", "+i;
    }
    let pointString = "Points vary";
    if (this.props.points && this.props.points !== "*")
      pointString = this.props.points+" points";
    return (
      <div className={s.activity} ref={this.ref}>
        <img src={this.props.img} />
        <div className={s.infoContainer}>
          <h4>{this.props.title}</h4>
          <p>{gradeString}{typeString}</p>
          <p className={s.activityPoints}>{pointString}</p>
          <div className={s.pillContainer}>
            {this.props.categories.map((cat)=>{
              return (
                <Pill key={cat} name={cat} />
              );
            })}
          </div>
          <p>{this.props.description}</p>
          {this.props.links && this.props.links.map((link)=>{
            if (link.Link !== "")
              return (
                <a href={link.Link}>
                  {link.Text}
                </a>
              );
          })}
        </div>
      </div>
    );
  }
}

const Pill = (props) => {
  return (
    <div className={s.pill} style={{
        backgroundColor: colorMap[props.name]
      }}>
      {props.name}
    </div>
  )
}


let mapFilteredActivities = (state) => {
  return {
    activities: state.activities
  };
};

export default connect(
  mapFilteredActivities,
  null
)(Activities);
