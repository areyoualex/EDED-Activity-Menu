import React from 'react'
import styled from 'styled-components'
import s from './filter.module.css'

class Filter extends React.Component {
  constructor() {
    super();
    // this.state = {
    //   dummyvalues: [1,2,3,4,"hello"]
    // };
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
          options={this.props.categories}
          class={s.categories} />
        <SubfilterCheckbox name="Type"
          options={this.props.types}
          class={s.type} />
        <SubfilterRange name="Number of points"
          options={getPoints(this.props.maxPoints, 5)}
          class={s.points} />
        <SubfilterCheckbox name="Grade level"
          options={getGrades()} diffValues={true}
          class={s.grade} />
      </div>
    );
  }
}

export default Filter;

class SubfilterCheckbox extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: []
    };
  }
  render() {
    if (this.props.diffValues) {
      return (
        <div>
          <p>{this.props.name}</p>
          {this.props.options.map((option) =>
            <div key={option.value}>
              <span>{option.tag}</span>
              <input type="checkbox"
                name={option.value}
                value={option.value} />
            </div>
          )}
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
              <span>{option}</span>
              <input type="checkbox" name={option} value={option} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

class SubfilterRange extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: "0-*"
    };
  }
  render() {
    return (
      <div className={s.subfilterWrapper}>
        <p>{this.props.name}</p>
        <div className={this.props.class}>
          <span>min</span>
          <select>
            {this.props.options.map((option) =>
              <option key={option} value={option}>{option}</option>
            )}
          </select>
          <span>max</span>
          <select>
            {this.props.options.map((option) =>
              <option key={option} value={option}>{option}</option>
            )}
          </select>
        </div>
      </div>
    );
  }
}
