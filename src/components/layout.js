import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Grid from "@material-ui/core/Grid"
import Header from "./header"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />

      <Grid container>
        <Grid item xs={1} sm={1} />
        <Grid item xs={10} sm={10}>
          <main>{children}</main>
        </Grid>
        <Grid item xs={1} sm={1} />
      </Grid>
      <footer style={{ textAlign: "center", marginTop: "50px" }}>
        © {new Date().getFullYear()}, Developed by
        {` `}
        <a
          href="https://farhanfarooq.netlify.app"
          target="_blank"
          rel="noreferrer"
        >
          Farhan Farooq
        </a>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
