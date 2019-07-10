import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Filter from '../components/filter'
import Activities from '../components/activities'

import styled from 'styled-components'
import s from './index.module.css'

import { connect } from 'react-redux'
import { actions } from '../data/app'

import stream from 'stream'
import csv from 'csv-parser'

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {
        categories: [],
        types: [],
        points: {
          min: 0,
          max: 0
        }
      }
    };
  }
  handleActivityData(raw) {
    let s = new stream.Readable();
    s._read = () => {};
    s.push(raw);
    s.push(null);
    s.pipe(csv())
      .on('data', (data) => {
        //fix category and type data
        data["Category"] = data["Category"].split(',');
        data["Type"] = data["Type"].split(',');

        var state = this.state;
        //add categories
        for (var cat of data["Category"]) {
          if(!this.state.data.categories.includes(cat))
            if(cat !== "All")
              state.data.categories.push(cat);
        }
        //add types
        for (var type of data["Type"]) {
          if(!this.state.data.types.includes(type))
            state.data.types.push(type);
        }
        //update max points
        if(this.state.data.points.max < data["Points"])
          state.data.points.max = data["Points"];
        //update state
        this.setState(state);
     })
       .on('end', () => {
         console.log("done loading!");
         let s2 = new stream.Readable();
         s2._read = () => {};
         s2.push(raw);
         s2.push(null);
         s2.pipe(csv())
           .on('data', (data) => {
             //fix category and type data
             data["Category"] = data["Category"].split(',');
             data["Type"] = data["Type"].split(',');

             //fix category "All";
             if (data["Category"].includes("All"))
               data["Category"] = this.state.data.categories.slice(0);

             //fix link data
             data["Links"] = [
              {
                "Link": data["Link"],
                "Text": data["Link Text"]
              },
              {
                "Link": data["Link 2"],
                "Text": data["Link Text 2"]
              },
              {
                "Link": data["Link 3"],
                "Text": data["Link Text 3"]
              },
             ];

             //add to activity cache
             this.activities.push(data);
          })
          .on('end', () => {
            const orgurl = process.env.GATSBY_ORGANIZATION_DATA_URL;
            let state = this.state;

            //organization request
            if (!orgurl) {
              state.error = "Error: URL for organization data not found";
              this.setState(state);
              return;
            }
            this.organizationrequest = new XMLHttpRequest();
            this.organizationrequest.open("GET", orgurl);
            this.organizationrequest.onreadystatechange = (e) => {
              var req = this.organizationrequest;
              if (req.readyState === 4)
                if (req.status === 200) {
                  this.handleOrganizationData(req.responseText);
                } else {
                  this.setState({error: "Error: "+req.statusText});
                  return;
                }
            };
            this.organizationrequest.onreadystatechange.bind(this);

            //send organizationrequest here
            this.organizationrequest.send();
          });
     });
  }
  handleOrganizationData(raw) {
    console.log("received organization data, now loading...");
    let s2 = new stream.Readable();
    s2._read = () => {};
    s2.push(raw);
    s2.push(null);
    s2.pipe(csv())
      .on('data', data => {
        //filter activities that have the same organization ID
        let matched = this.activities
          .filter(act => act["Organization ID"] === data.ID);
        for (let act of matched) {
          //Give organization link and image url
          act["Organization Link"] = data.Link;
          act["Image"] = 'img/orgs/id'+data.ID;
          act["Organization"] = data.Name;

          //add to store
          this.props.addActivity(act);
        }
      });
  }
  componentDidMount() {
    var url = process.env.GATSBY_DATA_URL;

    var state = this.state;
    this.activities = [];

    //activity request
    if (!url) {
      state.error = "Error: URL for activities data not found";
      this.setState(state);
      return;
    }
    this.activityrequest = new XMLHttpRequest();
    this.activityrequest.open("GET", url);
    this.activityrequest.onreadystatechange = (e) => {
      var req = this.activityrequest;
      if (req.readyState === 4)
        if (req.status === 200) {
          this.handleActivityData(req.responseText);
        } else {
          this.setState({error: "Error: "+req.statusText});
          return;
        }
    };
    this.activityrequest.onreadystatechange.bind(this);

    //send request here
    this.activityrequest.send();

    this.setState(state);
  }
  showFilter() {
    console.log(actions);
    this.props.showFilter(true);
  }
  render() {
    let Header = styled.h2`
      font-family: Oswald;
      font-size: 80px;
      color: #525252;
      font-weight: normal;
      @media only screen and (max-width: 850px) {
        font-size: 3rem;
      }
    `;
    let FilterButton = styled.button`
      margin: 0 0 1rem 8px;
      font-family: Roboto;
      font-size: 1.3rem;
      font-style: italic;
      color: #fff;
      border: none;
      background-color: #5A5A5A;
      border-radius: 10px;
      padding: 4px 25px;
      display: none;
      @media only screen and (max-width: 850px) {
        display: block;
      }
    `;
    return (
      <Layout>
        <Header>{this.props.data.site.siteMetadata.pageTitle}</Header>
        <p className={s.description}>
          {`
            Welcome to our new and improved activity menu! Here, you can find
            activities to do by categories, type of activity, number of points,
            and grade level. On mobile, click the "Filter..." button to specify
            what kind of activity you want.
          `}<br /><br />{`
            Note that if you select multiple things in the same filter category,
            the filter will select all that apply to either, not both - for
            example, if you select Zero Waste and Water Resilience, activities
            that are `}<i>either</i>{` Zero Waste or Water Resilience will show.
            Selecting two things from different filter categories, such Zero
            Waste and Curriculum, will show only activities that are `}
            <i>both</i>{` of those things (in this case, both Zero Waste and
            Curriculum).
          `}<br /><br />{`
            Use the search bar to filter by keyword - activities with their
            title or description containing any of the words (separated by
            space) in the search box will be shown.
          `}<br /><br />{`
            Thanks to our 2019 summer intern `}
            <a href="https://www.ruizalex.com">Alex Ruiz</a>{`
            for making this site.
          `}
        </p>
        <div className={s.wrapper}>
          <FilterButton onClick={this.showFilter.bind(this)}>Filter...</FilterButton>
          <Filter
            categories={this.state.data.categories}
            types={this.state.data.types}
            maxPoints={this.state.data.points.max}/>
          <Activities />
        </div>
      </Layout>
    );
  }
}

export default connect(
  null,
  {
    addActivity: actions.addActivity,
    showFilter: actions.showFilter
  }
)(Index);

export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        pageTitle
      }
    }
  }
`;
