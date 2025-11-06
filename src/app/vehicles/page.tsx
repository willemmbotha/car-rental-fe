"use client"

import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { visuallyHidden } from '@mui/utils';
import styles from "./vehicles.module.css";
import { useEffect, useMemo, useState } from 'react';
import { CarRentalService } from '@/api/carRentalService';
import { VehicleResponse, PatchVehicleRequest } from '@/api/models/vehicle.interface';
import VehicleModal from './vehicle.modal';
import DeleteIcon from '@mui/icons-material/Delete';
import { SearchRequest } from '@/api/models/search.interface';
import EditIcon from '@mui/icons-material/Edit';

export default function VehiclesPage(rows: [], headCells: []) {
  const [vehicles, setVehicles] = useState<VehicleResponse[]>([]);
  const [patchVehicle, setPatchVehicle] = useState<PatchVehicleRequest | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [openVehicleModal, setVehicleModalOpen] = React.useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('displayName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchRequest, setSearchRequest] = useState<SearchRequest>({
    filters: [],
    logicalOperator: "or",
    orderBy: [{
      propertyName: 'displayName',
      direction: 'desc'
    }],
    pageSize: 5,
    page: 1,
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        await refreshVehicles()
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchData();
  }, [searchRequest]);

  headCells = [

    {
      id: 'displayName',
      numeric: false,
      disablePadding: false,
      label: 'Display Name',
    },
    {
      id: 'registrationNumber',
      numeric: false,
      disablePadding: false,
      label: 'Registration Number',
    },
    {
      id: 'year',
      numeric: false,
      disablePadding: false,
      label: 'Year',
    },

    {
      id: 'make',
      numeric: false,
      disablePadding: false,
      label: 'Make',
    },
    {
      id: 'model',
      numeric: false,
      disablePadding: false,
      label: 'Model',
    },
    {
      id: 'mileage',
      numeric: true,
      disablePadding: false,
      label: 'Mileage',
    },
    {
      id: 'fuelType',
      numeric: false,
      disablePadding: false,
      label: 'Fuel Type',
    },
    {
      id: 'licenseExpiryDate',
      numeric: false,
      disablePadding: false,
      label: 'License Expiry Date',
    },
    {
      id: 'vehicleStatus',
      numeric: false,
      disablePadding: false,
      label: 'Status',
    },
    {
      id: 'actions',
      numeric: false,
      disablePadding: false,
    },
  ];

  const handleClose = async () => {
    setVehicleModalOpen(false)
    await refreshVehicles()
  };

  const handleRequestSort = async (event: any, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);

    setSearchRequest({
      ...searchRequest, orderBy: [{
        propertyName: property,
        direction: isAsc ? 'desc' : 'asc'
      }]
    })
  };

  const handleChangePage = (event: any, newPage: number) => {
    if (newPage < 0) {
      return
    }

    setPage(newPage);
    setSearchRequest({
      ...searchRequest, page: newPage + 1
    })
  };

  const handleChangeRowsPerPage = (event: { target: { value: string; }; }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);

    setSearchRequest({
      ...searchRequest, page: 1, pageSize: parseInt(event.target.value, 10)
    })
  };

  async function refreshVehicles() {
    var response = await CarRentalService.searchVehicles(searchRequest)
    setVehicles(response.data)
    setTotal(response.total)
  }

  async function deleteVehicle(id: number) {
    var response = await CarRentalService.deleteVehicle(id)
    await refreshVehicles();
  }
  function editVehicle(vehicle: VehicleResponse) {
    setPatchVehicle(vehicle)
    setVehicleModalOpen(true)
  }

  function createVehicle() {
    setPatchVehicle(null)
    setVehicleModalOpen(true)
  }

  function EnhancedTableHead(props: { order: any; orderBy: any; rowCount: any; onRequestSort: any; }) {
    const { order, orderBy, rowCount, onRequestSort } = props;
    const createSortHandler = (property: any) => (event: any) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align='left'
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  function EnhancedTableToolbar(props: any) {
    return (
      <Toolbar
        sx={[
          {
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }
        ]}
      >
        {(
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Vehicles
          </Typography>
        )}
        {
          (
            <Tooltip title="Add">
              <IconButton onClick={() => createVehicle()}>
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
          )
        }
      </Toolbar>
    );
  }



  return (
    <div>
      <VehicleModal open={openVehicleModal} setOpen={setVehicleModalOpen} handleClose={handleClose} patchVehicle={patchVehicle}></VehicleModal>
      <Box sx={{ width: '100%' }} >
        <Paper sx={{ width: '100%', mb: 2 }} elevation={0}>
          <EnhancedTableToolbar />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size='medium'
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={vehicles?.length}
              />
              {vehicles?.length > 0 && <TableBody>
                {vehicles.map((row, index) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell align="left">{row.displayName}</TableCell>
                      <TableCell align="left">{row.registrationNumber}</TableCell>
                      <TableCell align="left">{row.year}</TableCell>
                      <TableCell align="left">{row.make}</TableCell>
                      <TableCell align="left">{row.model}</TableCell>
                      <TableCell align="left">{row.mileage}</TableCell>
                      <TableCell align="left">{row.fuelType}</TableCell>
                      <TableCell align="left">{row.licenseExpiryDate}</TableCell>
                      <TableCell align="left">{row.vehicleStatus}</TableCell>
                      <TableCell align="left">
                        <IconButton aria-label="edit"
                          onClick={() => {
                            editVehicle(row)
                          }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete"
                          onClick={() => {
                            deleteVehicle(row.id)
                          }}>
                          <DeleteIcon />
                        </IconButton></TableCell>
                    </TableRow>
                  );
                })}

              </TableBody>}
              {vehicles?.length == 0 && <TableRow
                style={{
                  height: (53) * 5,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>}
            </Table>
          </TableContainer>
          <TablePagination
            className={styles.pagination}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box >
    </div >
  );
}