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
    gradeString = gradeString.replace("0","K");
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
        <img src={this.props.img} alt="" />
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
          {/* eslint-disable-next-line */}
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
  let activities = state.activities.slice(0);

  //Filter categories
  if (state.filter.category.length !== 0){
    let filteredActivities = [];
    let cat;
    let filterFunc = (act) => {
      if (filteredActivities.includes(act)) return false;
      return act["Category"].includes(cat);
    };
    for (cat of state.filter.category)
      filteredActivities = [
        ...filteredActivities,
        ...activities.filter(filterFunc)
      ];
    activities = filteredActivities;
  }

  //Filter types
  if (state.filter.type.length !== 0){
    let filteredActivities = [];
    let type;
    let filterFunc = act => {
      if (filteredActivities.includes(act)) return false;
      return act["Type"].includes(type);
    };
    for (type of state.filter.type)
      filteredActivities = [
        ...filteredActivities,
        ...activities.filter(filterFunc)
      ];
    activities = filteredActivities;
  }

  //Filter points
  let points = state.filter.points.split("-");
  activities = activities.filter((act) => {
    if (points[1] === "*")
      return act.Points >= parseInt(points[0]);
    else if (act.Points === "*") return true;
    else return act.Points >= parseInt(points[0]) && act.Points <= parseInt(points[1]);
  });

  //Filter grade level
  if (state.filter.gradeLevel.length !== 0){
    let filteredActivities = [];
    let grade;
    let filterFunc = act => {
      if (filteredActivities.includes(act)) return false;
      let actGrade = act["Grade Level"].split("-");
      if (actGrade.length === 1)
        return grade === actGrade[0];
      else return parseInt(actGrade[0]) <= parseInt(grade)
        && parseInt(grade) <= parseInt(actGrade[1]);
    };
    for (grade of state.filter.gradeLevel)
      filteredActivities = [
        ...filteredActivities,
        ...activities.filter(filterFunc)
      ];
    activities = filteredActivities;
  }

  //Filter search term
  let search = state.filter.searchTerm.trim();
  if (search !== ""){
    activities = activities.filter(act => act.Title.includes(search));
  }

  //Return filtered activities
  let sortFunction = (a,b)=>{
    let varA = a.Title.toLowerCase();
    let varB = b.Title.toLowerCase();
    if (varA< varB) return -1;
    else if (varA> varB) return 1;
    else return 0;
  };
  activities = activities.sort(sortFunction)
  return { activities };
};

export default connect(
  mapFilteredActivities,
  null
)(Activities);
