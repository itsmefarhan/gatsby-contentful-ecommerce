import React, { useState, Fragment } from "react"
import { Link } from "gatsby"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Slider from "@material-ui/core/Slider"
import { makeStyles } from "@material-ui/core/styles"
import Img from "gatsby-image"

const useStyles = makeStyles(() => ({
  pricePicker: {
    width: 300,
    margin: "0 auto",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0px",
  },
  search: {
    width: "50%",
  },
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

function valuetext(value) {
  return `${value}`
}

const Products = ({ data }) => {
  const classes = useStyles()
  const { nodes } = data.allContentfulProducts

  // Get maximum price from products list
  let maximum =
    nodes.length &&
    nodes.reduce((acc, item) => (acc.price > item.price ? acc : item))

  // Get minimum price from products list
  let minimum =
    nodes.length &&
    nodes.length &&
    nodes.reduce((acc, item) => (acc.price < item.price ? acc : item))

  const [search, setSearch] = useState("")
  const [products, setProducts] = useState([])
  const [price, setPrice] = useState(maximum.price)

  // Filter products based on search
  const handleSearch = e => {
    setSearch(e.target.value)

    const productsArray =
      nodes.length &&
      nodes.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )

    setProducts(productsArray)
  }

  // Filter products based on price
  const handlePrice = (_, val) => setPrice(val)

  const renderData = (catTitle, slug, img, title, price) => (
    <Link to={`/category/${catTitle}/${slug}`} className={classes.link}>
      <div>
        <Img fixed={img} className={classes.image} />
        <Typography className={classes.title}>{title}</Typography>
        <Typography>$ {price}</Typography>
      </div>
    </Link>
  )

  const priceFilter =
    price !== 0 && nodes.length && nodes.filter(item => item.price <= price)

  return (
    <>
      {/* Search Field */}
      <div className={classes.searchContainer}>
        <TextField
          value={search}
          onChange={handleSearch}
          label="Search"
          variant="outlined"
          className={classes.search}
          size="small"
          placeholder="Search Product eg: maroon plimsoll"
        />
      </div>
      {/* End search field */}

      {/* Price picker */}
      <div className={classes.pricePicker}>
        <Typography id="discrete-slider" gutterBottom>
          Price
        </Typography>
        <Slider
          value={price}
          onChange={handlePrice}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={maximum.price - minimum.price > 5 ? 5 : 1}
          marks
          min={minimum.price}
          max={maximum.price}
        />
      </div>
      {/* End price picker */}

      <div className={classes.main}>
        {/* Search results */}
        {products.length > 0 &&
          search !== "" &&
          products.map(product => (
            <Fragment key={product.title}>
              {renderData(
                product.category.title.toLowerCase(),
                product.slug,
                product.image.fixed,
                product.title,
                product.price
              )}
            </Fragment>
          ))}
        {/* End search results */}

        {/* Search results */}
        {priceFilter.length &&
          search === "" &&
          priceFilter.map(product => (
            <Fragment key={product.title}>
              {renderData(
                product.category.title.toLowerCase(),
                product.slug,
                product.image.fixed,
                product.title,
                product.price
              )}
            </Fragment>
          ))}
        {/* End search results */}

        {/* All products */}
        {search === "" &&
          priceFilter.length === 0 &&
          products.length === 0 &&
          nodes.length &&
          nodes.map(node => {
            return (
              <Fragment key={node.title}>
                {renderData(
                  node.category.title.toLowerCase(),
                  node.slug,
                  node.image.fixed,
                  node.title,
                  node.price
                )}
              </Fragment>
            )
          })}
        {/* End all products */}
      </div>
    </>
  )
}
export default Products
