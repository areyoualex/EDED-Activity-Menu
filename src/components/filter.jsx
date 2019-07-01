import React from 'react'
import styled from 'styled-components'
import s from './filter.module.css'

class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      dummyvalues: [1,2,3,4,"hello"]
    };
  }
  render() {
    return (
      <div className={s.container}>
        <p className={s.title}>Filter...</p>
        <SubfilterCheckbox name="Categories"
          options={this.state.dummyvalues}
          class={s.categories} />
        <SubfilterCheckbox name="Type"
          options={this.state.dummyvalues}
          class={s.type} />
        <SubfilterRange name="Number of points"
          options={this.state.dummyvalues}
          class={s.points} />
        <SubfilterCheckbox name="Grade level"
          options={this.state.dummyvalues}
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
    const Checkbox = styled.input`
      background-color: red;
    `;
    return (
      <div className={s.subfilterWrapper}>
        <p>{this.props.name}</p>
        <div className={this.props.class}>
          {this.props.options.map((option) =>
            <div key={option} className={s.checkbox}>
              <Checkbox type="checkbox" name={option} value={option} />
              <span>{option}</span>
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
