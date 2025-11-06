import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Box } from "@mui/material";

export default function VehicleCard({ vehicle }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={vehicle.displayName}

      />
      <CardMedia
        component="img"
        height="194"
        image={vehicle.photoUrl ?? 'https://www.shutterstock.com/image-vector/car-logo-icon-emblem-design-600nw-473088037.jpg'}
        alt="Vehicle"
      />
      <CardContent>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Rental Price: <strong>R {vehicle.rentalPrice}</strong>
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Make: <strong>{vehicle.make}</strong>
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Model: <strong>{vehicle.model}</strong>
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Year: <strong>{vehicle.year}</strong>
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Mileage: <strong>{vehicle.mileage.toLocaleString()} km</strong>
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Fuel Type: <strong>{vehicle.fuelType}</strong>
        </Typography>

      </CardContent>
      {/* <CardActions disableSpacing>
        <IconButton aria-label="rent">
          <QuestionMarkIcon />
        </IconButton>
      </CardActions> */}
    </Card>
  );
}
