import React from 'react'
import s from './filter.module.css'

import { connect } from 'react-redux'
import { actions } from '../data/filter'

class Filter extends React.Component {
  constructor () {
    super();
    this.state = {
      categories: [],
      types: []
    }
  }
  componentDidMount() {
    this.setState({
      categories: this.props.categories,
      types: this.props.types
    });
  }
  render() {
    let getPoints = (max, inc) => {
      var ret = [];
      for (var i = 0; i <= max; i+=inc)
        ret.push(i);
      if (max%inc !== 0 ) ret.push(max);
      return ret;
    };
    let getGrades = () => {
      var ret = [{tag:"K", value:"0"}];
      for (var i = 1; i<=12; i++)
        ret.push({tag:i, value:i});
      return ret;
    }
    return (
      <div className={s.container}>
        <p className={s.title}>Filter...</p>
        <SubfilterCheckbox name="Categories"
          type="CATEGORY"
          options={this.state.categories.slice(0)}
          class={s.categories} />
        <SubfilterCheckbox name="Type"
          type="TYPE"
          options={this.state.types.slice(0)}
          class={s.type} />
        <SubfilterRange name="Number of points"
          type="POINTS"
          options={getPoints(this.props.maxPoints, 5)}
          class={s.points} />
        <SubfilterCheckbox name="Grade level"
          type="GRADE_LEVEL"
          options={getGrades()} diffValues={true}
          class={s.grade} />
      </div>
    );
  }
}
export default Filter;

class SubfilterCheckboxUnconnected extends React.Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(e) {
    const term = e.target.name;

    if (e.target.checked) this.props.addFilterTerm(this.props.type, term);
    else this.props.removeFilterTerm(this.props.type, term);
  }
  render() {
    if (this.props.diffValues) {
      return (
        <div className={s.subfilterWrapper}>
          <p>{this.props.name}</p>
          <div className={this.props.class}>
            {this.props.options.map((option) =>
              <div key={option.value} className={s.checkbox}>
                <input type="checkbox"
                  name={option.value}
                  value={option.value}
                  onChange={this.handleInputChange} />
                <span>{option.tag}</span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return (
      <div className={s.subfilterWrapper}>
        <p>{this.props.name}</p>
        <div className={this.props.class}>
          {this.props.options.length === 0 ?
            (<span>Loading...</span>)
            : this.props.options.map((option) =>
            <div key={option} className={s.checkbox}>
              <input type="checkbox"
                name={option}
                value={option}
                onChange={this.handleInputChange} />
              <span>{option}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const SubfilterCheckbox = connect(
  null, {...actions}
)(SubfilterCheckboxUnconnected);

class SubfilterRangeUnconnected extends React.Component {
  constructor() {
    super();
    this.state = {
      min: "0",
      max: "*"
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(e) {
    let term = "";
    if (e.target.name === "min"){
      this.setState({min: e.target.value});
      term = e.target.value+"-"+this.state.max;
    }
    if (e.target.name === "max"){
      this.setState({max: e.target.value});
      term = this.state.min+"-"+e.target.value;
    }
    this.props.changeFilterTerm(this.props.type,term);
  }
  render() {
    return (
      <div className={s.subfilterWrapper}>
        <p>{this.props.name}</p>
        <div className={this.props.class}>
          <span>min</span>
          <select onChange={this.handleInputChange} name="min">
            {this.props.options.map((option) =>
              <option key={option} value={option}>{option}</option>
            )}
          </select>
          <span>max</span>
          <select onChange={this.handleInputChange} name="max">
            {this.props.options.map((option) =>
              <option key={option} value={option}>{option}</option>
            )}
          </select>
        </div>
      </div>
    );
  }
}

const SubfilterRange = connect(
  null, {...actions}
)(SubfilterRangeUnconnected);
