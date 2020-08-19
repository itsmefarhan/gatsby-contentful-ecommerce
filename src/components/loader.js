import React from "react"
import ReactLoading from "react-loading"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
  myloader: {
    background: "black",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}))

const Loader = () => {
  const classes = useStyles()

  return (
    <div className={classes.myloader}>
      <ReactLoading type="cylon" width="100px" color="orange" />
    </div>
  )
}

export default Loader
