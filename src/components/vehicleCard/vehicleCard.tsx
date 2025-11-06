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
        image="https://images.unsplash.com/photo-1489824904134-891ab64532f1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1631"
        alt="Vehicle"
      />
      <CardContent>

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
