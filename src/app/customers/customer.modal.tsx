import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import styles from "./customers.module.css";
import { CreateCustomerRequest } from "@/api/models/customer.interface";
import { CarRentalService } from "@/api/carRentalService";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

export default function CustomerModal({ open, setOpen, handleClose, patchCustomer }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const [customer, setCustomer] = useState<CreateCustomerRequest | null>(null);

  const handleOpen = () => setOpen(true);

  const saveCustomer = async () => {

    let result = null;
    if (patchCustomer) {
      result = await CarRentalService.patchCustomer(customer!);
    } else {
      result = await CarRentalService.createCustomer(customer!);
    }

    if (result.status == 400) {
      enqueueSnackbar(`Failed to save Customer: ${result?.errors[0]?.reason}`, {
        variant: 'error'
      })
    } else {
      enqueueSnackbar('Customer Saved', {
        variant: 'success'
      })
    }
  }

  useEffect(() => {
    if (patchCustomer != null) {
      setCustomer(patchCustomer);
    } else {
      setCustomer(null)
    }

  }, [patchCustomer])

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
      <Box sx={style} component="form" className={styles.customerModal}>
        <Typography variant="h5" component="div" className={styles.modalHeader}>
          {patchCustomer ? 'Update Customer' : 'Create Customer'}
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="First Name"
          value={customer?.firstName}
          onChange={event => {
            setCustomer({ ...customer, firstName: event.target.value });
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="Last Name"
          value={customer?.lastName}
          onChange={event => {
            setCustomer({ ...customer, lastName: event.target.value });
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
          value={customer?.email}
          onChange={event => {
            setCustomer({ ...customer, email: event.target.value });
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="Address"
          value={customer?.address}
          onChange={event => {
            setCustomer({ ...customer, address: event.target.value });
          }}
        />
        <Button variant="text" onClick={saveCustomer}>Save</Button>
      </Box>
    </Modal>
  );
}