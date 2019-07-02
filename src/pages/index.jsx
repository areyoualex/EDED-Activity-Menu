import React from 'react'
import Layout from '../components/layout'
import Filter from '../components/filter'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { actions } from '../data/app'

import stream from 'stream'
import csv from 'csv-parser'

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }
  handleActivityData(raw) {
    let s = new stream.Readable();
    s._read = () => {};
    s.push(raw);
    s.push(null);
    s.pipe(csv())
     .on('data', (data) => {
       console.log(data);
       this.props.addActivity(data);
       console.log(this.props.addActivity);
     })
     .on('end', () => {
       console.log("done!");
     });
  }
  componentDidMount() {
    var url = process.env.GATSBY_DATA_URL;
    var state = this.state;
    if (!url) {
      state.error = "Error: URL for activities data not found";
      this.setState(state);
      return;
    }
    this.request = new XMLHttpRequest();
    this.request.open("GET", url);
    this.request.onreadystatechange = (e) => {
      var req = this.request;
      if (req.readyState === 4)
        if (req.status === 200) {
          this.handleActivityData(req.responseText);
        } else {
          this.setState({error: "Error: "+req.statusText});
          return;
        }
    };
    this.request.onreadystatechange.bind(this);

    //send request here
    this.request.send();
    this.setState(state);
  }
  render() {
    let Header = styled.h2`
      font-family: Oswald;
      font-size: 80px;
      color: #525252;
      font-weight: normal;
      margin: 41px 0px 13px 0;
    `;
    return (
      <Layout>
        <Header>Activity Menu</Header>
        <Filter />
      </Layout>
    );
  }
}

export default connect(
  null,
  {addActivity: actions.addActivity}
)(Index);
