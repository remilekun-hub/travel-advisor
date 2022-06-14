import React /*{ useState, useEffect, createRef } */ from "react";
import {
  CircularProgress,
  Typography,
  Grid,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  useMediaQuery,
} from "@material-ui/core";
import Placedetails from "../PlaceDetails/Placedetails";
import useStyles from "./style";

function List({
  places,
  childclicked,
  Loading,
  type,
  setType,
  rating,
  setRating,
}) {
  const classes = useStyles();
  const ismobile = useMediaQuery("(max-width:600px)");

  // useEffect(() => {
  //   const refs = Array(places?.length)
  //     .fill()
  //     .map((place, i) => setEx({ ...place }, i) || createRef());
  //   setElrefs(refs);
  //   console.log({ ex });
  // }, [places]);

  return (
    <div className={classes.container}>
      {ismobile && (
        <p style={{ fontSize: "17px", fontWeight: "bold" }}>Travel Advisor</p>
      )}
      <p style={{ fontSize: "17px", fontWeight: "bold" }}>
        Restaurants, Hotels & Attractions around you
      </p>

      {Loading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value="0">All</MenuItem>
              <MenuItem value="3">Above 4.0</MenuItem>
              <MenuItem value="4">Above 3.0</MenuItem>
              <MenuItem value="4.5">Above 2.0</MenuItem>
            </Select>
          </FormControl>
          <Grid
            container
            spacing={3}
            className={classes.list}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {places?.map((place, i) => (
              <Grid item key={i} xs={12} sx={{ justifyContent: "center" }}>
                <Placedetails place={place} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
}

export default List;
