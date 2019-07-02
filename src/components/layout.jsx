import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import './layout.css'
import s from './layout.module.css'
import logo from '../img/sustainabilitylogo.webp'

let layout = (props) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          title
          homeUrl
        }
      }
    }`);
  return (
    <div>
      <div className={s.headerBG} />
      <div className={s.content}>
        <header>
          <div className="wrapper">
            <img src={logo} alt={"SFUSD Sustainability Logo"} />
            <a href={data.site.siteMetadata.homeUrl}>
              <h1>{data.site.siteMetadata.title}</h1>
            </a>
          </div>
          <a href={data.site.siteMetadata.homeUrl}>
            Back to Home
          </a>
        </header>
        {props.children}
      </div>
    </div>
  );
};

export default layout;
