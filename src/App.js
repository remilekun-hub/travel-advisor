import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getplacesdata } from "./api/index";

function App() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childclicked, setchildclicked] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [filteredplaces, setfilteredplaces] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filteredplaces = places.filter((place) => place.rating > rating);
    setfilteredplaces(filteredplaces);
  }, [rating]);

  useEffect(() => {
    setLoading(!Loading);
    getplacesdata(type, bounds.sw, bounds.ne).then((data) => {
      setPlaces(data);
      setfilteredplaces([]);
      setLoading(!Loading);
    });
  }, [type, coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={2} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredplaces.length ? filteredplaces : places}
            childclicked={childclicked}
            Loading={Loading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8} alignItems="center" justifyContent="center">
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredplaces.length ? filteredplaces : places}
            setchildclicked={setchildclicked}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
