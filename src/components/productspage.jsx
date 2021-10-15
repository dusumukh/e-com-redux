import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { JSON } from "./productsStore";
import { CardActions } from "@mui/material";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { addToCart } from "../redux/Shopping/shopping-actions";
import { connect } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function MediaCard({ prod, addToCart }) {
  return (
    <Card style={{ width: "auto" }}>
      <CardMedia component="img" height="200px" image={prod.image} />
      <CardContent>
        <Typography
          alignContent="left"
          style={{ fontSize: "12px", overflow: "auto" }}
          variant="body2"
          color="text.secondary"
        >
          <span>{prod.vendor}</span>
          <br />
          <span>{prod.name}</span>
          <br />
          <span>Price : {prod.price}Rs/-</span>
          <br />
          {prod.available > 0 ? (
            <span style={{ color: "green" }}>In Stock</span>
          ) : (
            <span style={{ color: "Red" }}>Out of Stock</span>
          )}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => addToCart(prod.id)}
          style={{ padding: "5px" }}
          disabled={prod.available > 0 ? false : true}
          size="small"
        >
          Add
        </Button>{" "}
      </CardActions>
    </Card>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id)),
  };
};
export default connect(null, mapDispatchToProps)(MediaCard);
