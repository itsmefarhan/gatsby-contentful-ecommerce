import React from "react"
import { Link, graphql } from "gatsby"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./index.css"

const useStyles = makeStyles(() => ({
  main: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    ["@media only screen and (max-width: 734px)"]: {
      justifyContent: "center",
    },
  },
  title: {
    position: "absolute",
    background: "black",
    opacity: "0.6",
    bottom: "5px",
    color: "white",
    fontWeight: "bold",
    width: "100%",
    padding: "10px 0px 10px",
    textAlign: "center",
  },
  image: {
    marginTop: "20px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
}))

const IndexPage = ({ data }) => {
  const classes = useStyles()

  return (
    <Layout>
      <SEO title="Home" />
      <div className={classes.main}>
        {data.allContentfulCategories.nodes.map(node => (
          <div style={{ position: "relative" }} key={node.title}>
            <Link to={`/category/${node.title.toLowerCase()}`}>
              <Img fixed={node.image.fixed} className={classes.image} />
              <Typography className={classes.title}>{node.title}</Typography>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const data = graphql`
  query {
    allContentfulCategories {
      nodes {
        title
        image {
          fixed(width: 300, height: 300) {
            ...GatsbyContentfulFixed_withWebp
          }
        }
      }
    }
  }
`

export default IndexPage
