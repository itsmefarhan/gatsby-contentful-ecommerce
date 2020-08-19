import React from "react"
import { Link } from "gatsby"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Img from "gatsby-image"

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
    fontSize: "20px",
    fontWeight: "bold",
    opacity: "0.7",
  },
  image: {
    marginTop: "20px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
}))

const Products = ({ data }) => {
  const classes = useStyles()

  return (
    <div className={classes.main}>
      {data.allContentfulProducts.nodes.map(node => (
        <div key={node.title}>
          <Link
            to={`/category/${node.category.title.toLowerCase()}/${node.slug}`}
            className={classes.link}
          >
            <div>
              <Img fixed={node.image.fixed} className={classes.image} />
              <Typography className={classes.title}>{node.title}</Typography>
              <Typography>$ {node.price}</Typography>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
export default Products
