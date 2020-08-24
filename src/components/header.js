import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import ShopIcon from "@material-ui/icons/Shop"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
  offset: {
    ...theme.mixins.toolbar,
    flexGrow: 1,
  },
}))

const Header = ({ siteTitle }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <ShopIcon className={classes.menuButton} />
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              {siteTitle}
            </Link>
          </Typography>
          <Typography
            variant="body1"
            className="snipcart-checkout"
            style={{ cursor: "pointer" }}
          >
            Cart
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
