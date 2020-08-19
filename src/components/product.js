import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Layout from "../components/layout"

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: "bold",
    textAlign: "center",
    opacity: "0.6",
    margin: "20px 0px 20px 0px",
  },
  price: {
    fontWeight: "bold",
    color: "green",
    margin: "20px 0px 20px 0px",
  },
  imgGrid: {
    display: "flex",
    alignItems: "center",
    padding: "20px",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    margin: "20px 0px 20px 0px",
    background: "orange",
  },
}))

const Product = ({ data }) => {
  const classes = useStyles()

  const query = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `)

  const {
    id,
    slug,
    category,
    image: { fixed },
    title,
    price,
    description,
  } = data.product

  return (
    <Layout>
      <Paper elevation={5}>
        <Grid container>
          <Grid item sm={6} xs={12} className={classes.imgGrid}>
            <img src={fixed.src} alt={title} />
          </Grid>
          <Grid item sm={6} xs={12} style={{ padding: "20px" }}>
            <Typography variant="h5" className={classes.title}>
              {title}
            </Typography>

            <Typography variant="body1" className={classes.price}>
              $ {price}
            </Typography>

            <Typography variant="body1">{description.description}</Typography>
            <div className={classes.btnContainer}>
              <Button
                variant="contained"
                className={`${classes.button} snipcart-add-item`}
                data-item-id={id}
                data-item-name={title}
                data-item-image={fixed.src}
                data-item-price={
                  price
                  // item.discountPrice ? item.discountPrice : item.price
                }
                data-item-url={`${
                  query.site.siteMetadata.siteUrl
                }/category/${category.title.toLowerCase()}/${slug}`}
              >
                Add to Cart
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  )
}

export default Product
