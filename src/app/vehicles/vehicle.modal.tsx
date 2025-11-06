import { Alert, Box, Button, Collapse, Fade, FormControl, InputLabel, MenuItem, Modal, Select, Slide, Snackbar, TextField, Typography } from "@mui/material";
import styles from "./vehicles.module.css";
import { CreateVehicleRequest } from "@/api/models/vehicle.interface";
import { CarRentalService } from "@/api/carRentalService";
import { useEffect, useState } from "react";

export default function VehicleModal({ open, setOpen, handleClose, patchVehicle }) {

  const [vehicle, setVehicle] = useState<CreateVehicleRequest | null>(null);

  const fuelTypes: string[] = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  const vehicleStatuses: string[] = ['Damaged', 'Stolen', 'Maintenance', 'New', 'Ready', 'LicenseExpired'];

  const handleOpen = () => setOpen(true);

  const saveVehicle = async () => {

    if (patchVehicle) {
      await CarRentalService.patchVehicle(vehicle!);
    } else {
      await CarRentalService.createVehicle(vehicle!);
    }
  }

  useEffect(() => {
    if (patchVehicle != null) {
      setVehicle(patchVehicle);
    } else {
      setVehicle(null)
    }

  }, [patchVehicle])


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 8,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component="form" className={styles.vehicleModal}>
        <Typography variant="h5" component="div" className={styles.modalHeader}>
          {patchVehicle ? 'Update Vehicle' : 'Create Vehicle'}
        </Typography>
        <TextField
          required
          id="outlined-displayName"
          label="Display Name"
          value={vehicle?.displayName}
          onChange={event => {
            setVehicle({ ...vehicle, displayName: event.target.value });
          }}
        />

        <TextField
          required
          id="outlined-registrationNumber"
          label="Registration Number"
          value={vehicle?.registrationNumber}
          onChange={event => {
            setVehicle({ ...vehicle, registrationNumber: event.target.value });
          }}
        />

        <TextField
          required
          id="outlined-year"
          label="Year"
          type="number"
          value={vehicle?.year}
          onChange={event => {
            setVehicle({ ...vehicle, year: Number(event.target.value) });
          }}
        />

        <TextField
          required
          id="outlined-make"
          label="Make"
          value={vehicle?.make}
          onChange={event => {
            setVehicle({ ...vehicle, make: event.target.value });
          }}
        />

        <TextField
          required
          id="outlined-model"
          label="Model"
          value={vehicle?.model}
          onChange={event => {
            setVehicle({ ...vehicle, model: event.target.value });
          }}
        />

        <TextField
          required
          id="outlined-mileage"
          label="Mileage"
          type="number"
          value={vehicle?.mileage}
          onChange={event => {
            setVehicle({ ...vehicle, mileage: Number(event.target.value) });
          }}
        />

        <FormControl fullWidth>
          <InputLabel>Fuel Type</InputLabel>
          <Select
            id="outlined-fuelType"
            value={vehicle?.fuelType}
            label="Fuel Type"
            onChange={(event) => {
              setVehicle({ ...vehicle, fuelType: event.target.value });
            }}
          >
            {
              fuelTypes.map(x => {
                return <MenuItem value={x}>{x}</MenuItem>
              })
            }
          </Select>
        </FormControl>

        <TextField
          required
          id="outlined-licenseExpiryDate"
          label="License Expiry Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={vehicle?.licenseExpiryDate ? vehicle.licenseExpiryDate.slice(0, 10) : ""}
          onChange={event => {
            setVehicle({ ...vehicle, licenseExpiryDate: event.target.value });
          }}
        />


        <FormControl fullWidth>
          <InputLabel>Vehicle Status</InputLabel>
          <Select
            label="Vehicle Status"
            id="outlined-vehicleStatus"
            value={vehicle?.vehicleStatus}
            onChange={(event) => {
              setVehicle({ ...vehicle, vehicleStatus: event.target.value });
            }}
          >
            {
              vehicleStatuses.map(x => {
                return <MenuItem value={x}>{x}</MenuItem>
              })
            }
          </Select>
        </FormControl>

        <Button variant="text" onClick={saveVehicle}>Save</Button>
      </Box>
    </Modal>
  );
}