module.exports = {
  //the stuff below in siteMetadata will change the live site
  siteMetadata: {
    title: `SFUSD Earth Day Every Day Challenge`,
    pageTitle: `Activity Menu`,
    homeUrl: `https://www.earthdayeverydaysf.com/`,
    contact: {
      email: `conserve@sfusd.edu`,
      twitter: `greenthenextgen`,
      instagram: `sfusd_sustainability`
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `SFUSD Earth Day Every Day Challenge | Activity Menu`,
        short_name: `EDED Activity Menu`,
        start_url: `/`,
        display: `standalone`,
        icon: `src/img/favicon.jpg`
      }
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
  ]
}
