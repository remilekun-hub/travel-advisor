import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  useMediaQuery,
} from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import useStyles from "./style";

function Header({ setCoordinates }) {
  const classes = useStyles();
  const [autocomplete, setautocomplete] = useState(null);

  const onLoad = (autoc) => {
    setautocomplete(autoc);
  };
  const onPlacechanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoordinates({ lat, lng });
  };

  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.title}>
          Travel Advisor
        </Typography>

        <Box display="flex" alignItems="center">
          <Typography variant="h6" className={classes.title}>
            Explore New Places
          </Typography>

          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlacechanged}>
            <div className={classes.search} /*sx={{ paddingLeft: "250px" }}*/>
              <div className={classes.searchIcon}>
                <Search />
              </div>
              <InputBase
                placeholder="search..."
                className={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
