import { Alert, Box, Button, Collapse, Fade, FormControl, InputLabel, MenuItem, Modal, Select, Slide, Snackbar, TextField, Typography } from "@mui/material";
import styles from "./rentals.module.css";
import { CreateRentalRequest } from "@/api/models/rental.interface";
import { CarRentalService } from "@/api/carRentalService";
import { useEffect, useState } from "react";
import { CustomerResponse } from "@/api/models/customer.interface";
import { VehicleResponse } from "@/api/models/vehicle.interface";

export default function RentalModal({ open, setOpen, handleClose, patchRental }) {

  const [rental, setRental] = useState<CreateRentalRequest | null>(null);

  const [customers, setCustomers] = useState<CustomerResponse[]>([]);
  const [vehicles, setVehicles] = useState<VehicleResponse[]>([]);

  const handleOpen = () => setOpen(true);

  const saveRental = async () => {

    if (patchRental) {
      await CarRentalService.patchRental(rental!);
    } else {
      await CarRentalService.createRental(rental!);
    }
  }

  async function refreshVehicles() {
    var response = await CarRentalService.searchVehicles({
      filters: [],
      logicalOperator: "or",
      orderBy: [{
        propertyName: 'displayName',
        direction: 'asc'
      }],
      pageSize: 100,
      page: 1,
    })
    setVehicles(response.data)
  }

  async function refreshCustomers() {
    var response = await CarRentalService.searchCustomers({
      filters: [],
      logicalOperator: "or",
      orderBy: [{
        propertyName: 'firstName',
        direction: 'asc'
      }],
      pageSize: 100,
      page: 1,
    })
    setCustomers(response.data)
  }

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        await refreshCustomers()
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    fetchCustomers();
    const fetchVehicles = async () => {
      try {
        await refreshVehicles()
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };
    fetchVehicles();
  }, [])

  useEffect(() => {
    if (patchRental != null) {
      setRental(patchRental);
    } else {
      setRental(null)
    }

  }, [patchRental])

  const rentalStatuses: string[] = ['New', 'Cancelled', 'Returned', 'Rented', 'Escalated', 'Stolen', 'AwaitingPickup'];

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
      <Box sx={style} component="form" className={styles.rentalModal}>
        <Typography variant="h5" component="div" className={styles.modalHeader}>
          {patchRental ? 'Update Rental' : 'Create Rental'}
        </Typography>

        <FormControl fullWidth>
          <InputLabel>Customer</InputLabel>
          <Select
            label="Customer"
            id="outlined-customer"
            value={rental?.customerId}
            onChange={(event) => {
              setRental({ ...rental, customerId: event.target.value });
            }}
          >
            {
              customers.map(x => {
                return <MenuItem value={x.id}>{x.firstName} {x.lastName}</MenuItem>
              })
            }
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Vehicle</InputLabel>
          <Select
            label="Vehicle"
            id="outlined-vehicle"
            value={rental?.vehicleId}
            onChange={(event) => {
              setRental({ ...rental, vehicleId: event.target.value });
            }}
          >
            {
              vehicles.map(x => {
                return <MenuItem value={x.id}>{x.displayName}</MenuItem>
              })
            }
          </Select>
        </FormControl>
    
        <TextField
          required
          id="outlined-startDate"
          label="Start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={rental?.startDate ? rental.startDate.slice(0, 10) : ""}
          onChange={event => {
            setRental({ ...rental, startDate: event.target.value });
          }}
        />

        <TextField
          required
          id="outlined-endDate"
          label="End Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={rental?.endDate ? rental.endDate.slice(0, 10) : ""}
          onChange={event => {
            setRental({ ...rental, endDate: event.target.value });
          }}
        />

        <FormControl fullWidth>
          <InputLabel>Rental Status</InputLabel>
          <Select
            label="Rental Status"
            id="outlined-rentalStatus"
            value={rental?.rentalStatus}
            onChange={(event) => {
              setRental({ ...rental, rentalStatus: event.target.value });
            }}
          >
            {
              rentalStatuses.map(x => {
                return <MenuItem value={x}>{x}</MenuItem>
              })
            }
          </Select>
        </FormControl>
        <Button variant="text" onClick={saveRental}>Save</Button>
      </Box>
    </Modal>
  );
}