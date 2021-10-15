import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import MediaCard from "./productspage";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeFromCart } from "../redux/Shopping/shopping-actions";
import Textarea from "@mui/material/TextareaAutosize";
import { adjustItemQty } from "./../redux/Shopping/shopping-actions";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function SearchAppBar({ products, cart, removeFromCart, adjustItemQty }) {
  const [opensss, setOpensss] = React.useState(false);

  const handleClickOpen = () => {
    setOpensss(true);
  };

  const handleClosess = () => {
    setOpensss(false);
  };

  const [filterd, setfilterd] = React.useState();
  React.useEffect(() => {
    setfilterd(products);
  }, [products]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [value, setValue] = React.useState("three");

  const fruits = () => {
    setfilterd(products.filter((item) => item.category === "Fruits"));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const vegetables = () => {
    setfilterd(products.filter((item) => item.category === "Vegtables"));
  };
  const All = () => {
    setfilterd(products);
  };

  const [cartCount, setCartCount] = React.useState(0);
  const [price, setprice] = React.useState(0);
  React.useEffect(() => {
    let count = 0;
    let price = 0;
    cart.forEach((item) => {
      count += item.qty;
      price += item.qty * item.price;
    });
    setCartCount(count);
    setprice(price);
  }, [cart, cartCount]);
  const [input, setinput] = React.useState(cart.qty);
  const onChangeHandler = (e) => {
    setinput(e.target.value);
    adjustItemQty(cart.id, e.target.value);
  };

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={() => {
                console.log(products);
              }}
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              GROCERY
            </Typography>
            <IconButton onClick={handleClick}>
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {cart.map((allitems, index) => {
                return allitems ? (
                  <MenuItem key={index}>
                    <div style={{ display: "flex" }}>
                      <img
                        style={{ padding: "10px" }}
                        alt="cart"
                        src={allitems.image}
                        width="100px"
                        height="50px"
                      />
                      <span
                        style={{
                          display: "inline-block",
                          padding: "10px",
                        }}
                      >
                        {allitems.name}
                      </span>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "10px",
                        }}
                      >
                        Qty:
                        <Textarea
                          style={{
                            display: "inline-block",
                            padding: "10px",
                            width: 50,
                          }}
                          aria-label="empty textarea"
                          placeholder="Empty"
                          value={allitems.qty}
                          onChange={(e) => onChangeHandler(e)}
                        />
                      </span>
                      <IconButton onClick={() => removeFromCart(allitems.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </MenuItem>
                ) : (
                  <div></div>
                );
              })}
              <Divider />
              <span style={{ padding: "10px" }}>Price:{price}</span>
              <Button
                disabled={cartCount > 0 ? false : true}
                onClick={handleClickOpen}
              >
                CheckOut
              </Button>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
        }}
      >
        <span
          style={{
            display: "inline-block",
            paddingRight: "16px",
            paddingLeft: "16px",
            paddingTop: "12px",
            paddingBottom: "12px",
          }}
        >
          Sort By
        </span>
        <Tabs
          style={{ display: "inline-block" }}
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab onClick={fruits} value="one" label="Fruits" />
          <Tab onClick={vegetables} value="two" label="Vegetables" />
          <Tab onClick={All} value="three" label="All Products" />
        </Tabs>
      </div>
      <Dialog
        open={opensss}
        onClose={handleClosess}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Thank You for Shopping"}
        </DialogTitle>
        <DialogContent>
          {cart.map((items) => {
            return (
              <div key={items.id}>
                <span style={{ display: "inline-block" }}>
                  Name:{items.name}
                </span>
                <br />
                <span>Qty : {items.qty}</span>
                <br />
              </div>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosess}>Disagree</Button>
          <Button onClick={handleClosess} autoFocus>
            Pay {price} Rs/-
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {filterd?.map((prod, index) => {
            return (
              <Grid item xs={12} sm={4} md={3} lg={2} key={index}>
                <div style={{ padding: "10px" }}>
                  <MediaCard prod={prod} />
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </React.Fragment>
  );
}
const mapStateToProp = (state) => {
  return {
    products: state.shop.products,
    cart: state.shop.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (id) => dispatch(removeFromCart(id)),
    adjustItemQty: (id, value) => dispatch(adjustItemQty(id, value)),
  };
};
export default connect(mapStateToProp, mapDispatchToProps)(SearchAppBar);
