require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Shopping Arena`,
    description: `One Stop solution to your online shopping.`,
    author: `Farhan Farooq`,
    siteUrl: `https://shoppingarena.netlify.app`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: "gatsby-plugin-snipcart",
      options: {
        apiKey: process.env.SNIPCART_API,
        autopop: false,
        js: "https://cdn.snipcart.com/themes/v3.0.19/default/snipcart.js",
        styles: "https://cdn.snipcart.com/themes/v3.0.19/default/snipcart.css",
        language: null,
      },
    },
    "gatsby-plugin-sitemap",
    "gatsby-plugin-robots-txt",
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
