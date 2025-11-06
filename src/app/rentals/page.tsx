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
import styles from "./rentals.module.css";
import { useEffect, useMemo, useState } from 'react';
import { CarRentalService } from '@/api/carRentalService';
import RentalModal from './rental.modal';
import DeleteIcon from '@mui/icons-material/Delete';
import { SearchRequest } from '@/api/models/search.interface';
import EditIcon from '@mui/icons-material/Edit';
import { RentalResponse, PatchRentalRequest } from '@/api/models/rental.interface';


export default function RentalsPage(rows: [], headCells: []) {
  const [rentals, setRentals] = useState<RentalResponse[]>([]);
  const [patchRental, setPatchRental] = useState<PatchRentalRequest | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [openRentalModal, setRentalModalOpen] = React.useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('startDate');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchRequest, setSearchRequest] = useState<SearchRequest>({
    filters: [],
    logicalOperator: "or",
    orderBy: [{
      propertyName: 'startDate',
      direction: 'desc'
    }],
    pageSize: 5,
    page: 1,
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        await refreshRentals()
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchData();
  }, [searchRequest]);

  headCells = [
    {
      id: 'customerId',
      numeric: true,
      disablePadding: false,
      label: 'Customer ID',
    },
    {
      id: 'vehicleId',
      numeric: true,
      disablePadding: false,
      label: 'Vehicle ID',
    },
    {
      id: 'startDate',
      numeric: false,
      disablePadding: false,
      label: 'Start Date',
    },
    {
      id: 'endDate',
      numeric: false,
      disablePadding: false,
      label: 'End Date',
    },
    {
      id: 'rentalStatus',
      numeric: false,
      disablePadding: false,
      label: 'Rental Status',
    },
    {
      id: 'actions',
      numeric: false,
      disablePadding: false,
    },
  ];

  const handleClose = async () => {
    setRentalModalOpen(false)
    await refreshRentals()
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

  async function refreshRentals() {
    var response = await CarRentalService.searchRentals(searchRequest)
    setRentals(response.data)
    setTotal(response.total)
  }

  async function deleteRental(id: number) {
    var response = await CarRentalService.deleteRental(id)
    await refreshRentals();
  }
  function editRental(rental: RentalResponse) {
    setPatchRental(rental)
    setRentalModalOpen(true)
  }

  function createRental() {
    setPatchRental(null)
    setRentalModalOpen(true)
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
            Rentals
          </Typography>
        )}
        {
          (
            <Tooltip title="Add">
              <IconButton onClick={() => createRental()}>
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
      <RentalModal open={openRentalModal} setOpen={setRentalModalOpen} handleClose={handleClose} patchRental={patchRental}></RentalModal>
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
                rowCount={rentals?.length}
              />
              {rentals?.length > 0 && <TableBody>
                {rentals.map((row, index) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell align="left">{row.customerId}</TableCell>
                      <TableCell align="left">{row.vehicleId}</TableCell>
                      <TableCell align="left">
                        {new Date(row.startDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="left">
                        {new Date(row.endDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="left">{row.rentalStatus}</TableCell>
                      <TableCell align="left">
                        <IconButton aria-label="edit"
                          onClick={() => {
                            editRental(row)
                          }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete"
                          onClick={() => {
                            deleteRental(row.id)
                          }}>
                          <DeleteIcon />
                        </IconButton></TableCell>
                    </TableRow>
                  );
                })}

              </TableBody>}
              {rentals?.length == 0 && <TableRow
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