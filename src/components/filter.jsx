import React from 'react'
import styled from 'styled-components'

class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      dummyvalues: [1,2,3,4,"hello"]
    };
  }
  render() {
    return (
      <div>
        <p>Filter...</p>
        <SubfilterCheckbox name="Categories"
          options={this.state.dummyvalues} />
        <SubfilterCheckbox name="Type"
          options={this.state.dummyvalues} />
        <SubfilterRange name="Number of points"
          options={this.state.dummyvalues} />
        <SubfilterCheckbox name="Grade level"
          options={this.state.dummyvalues} />
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
      <div>
        <p>{this.props.name}</p>
        {this.props.options.map((option) =>
          <div key={option}>
            <span>{option}</span>
            <Checkbox type="checkbox" name={option} value={option} />
          </div>
        )}
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
      <div>
        <p>{this.props.name}</p>
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
    );
  }
}
