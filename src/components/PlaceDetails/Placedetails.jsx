import React from "react";
import useStyles from "./style";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";
import {
  Box,
  Typography,
  Chip,
  Card,
  CardMedia,
  CardActions,
  Button,
  CardContent,
} from "@material-ui/core";

function Placedetails({ place }) {
  const classes = useStyles();

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 300 }}
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        }
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom>{place.name}</Typography>
        <Box display="flex" justifyContent="space-between">
          <Rating value={Number(place.rating)} readOnly />
          <Typography gutterBottom variant="subtitle1">
            out of {place.num_reviews} reviews
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography>Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <p style={{ fontSize: "13px" }}>Ranking</p>
          <p style={{ marginBottom: "5px", fontSize: "13px" }}>
            {place.ranking}
          </p>
        </Box>
        {place?.awards?.map((award) => (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            my={1}
          >
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle2" color="textSecondary">
              {award.display_name}
            </Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }) => (
          <Chip
            key={name}
            size="small"
            label={name}
            mr={1}
            className={classes.chip}
          />
        ))}
        {place?.address && (
          <p
            style={{ fontSize: "13px", display: "flex", alignItems: "center" }}
          >
            <LocationOnIcon />{" "}
            <p style={{ marginLeft: "6px" }}>{place.address}</p>
          </p>
        )}
        {place?.phone && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <PhoneIcon /> {place.phone}
          </Typography>
        )}
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place.web_url, "_blank")}
          >
            Trip Advisor
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place.website, "_blank")}
          >
            Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default Placedetails;
