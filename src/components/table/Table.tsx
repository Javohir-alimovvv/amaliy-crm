// table
import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { FC } from 'react'
import { ICustomers } from '@/types'
// paginition
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import PushPinIcon from '@mui/icons-material/PushPin';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Button } from '@mui/material'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { request } from '@/api'

import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';

const BasicTable: FC<{ data: ICustomers[], type: string }> = ({ data, type }) => {


  const [id, setId] = React.useState<null | string>(null)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, _id: string) => {
    setAnchorEl(event.currentTarget);
    setId(_id)
  };
  const handleClose = () => {
    setAnchorEl(null);
    setId(null)
  };

  // PIN


  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: ({ id, pin }: { id: string, pin: boolean }) => request
      .patch(`update/${type}/${id}`, { pin: !pin })
      .then(res => res)
      .catch(err => err),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [type] })
      handleClose()
    },
  })

  const handlePin = (id: string, pin: boolean) => {
    mutation.mutate({ id, pin })
  }

  // AMOUNT
  const mutationAmount = useMutation({
    mutationFn: () => request
    .post(`/create/payment`)
    .then(res => res)
    .catch(err => console.log(err)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
  

  // const handlePayment = (id: string, budget: number) => {
  //   setModalOpen(true)
  // }

  const [formData, setFormData] = React.useState({
    _id: 0,
    fname: "",
    lname: "",
    phone_primary: "",
    budget: 0,
    address: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData);
    setModalOpen(false)
  }


  const [modalOpen, setModalOpen] = React.useState(false);
  return (
    <div className='flex flex-col items-center gap-10'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell align='right'>Last name</TableCell>
              <TableCell align='right'>Phone</TableCell>
              <TableCell align='right'>Budget</TableCell>
              <TableCell align='right'>Address</TableCell>
              <TableCell align='right'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row: ICustomers) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {
                    row.pin && <PushPinIcon fontSize='small' />
                  }

                  {row.fname}

                </TableCell>
                <TableCell align='right'>{row.lname}</TableCell>
                <TableCell align='right'>{row.phone_primary}</TableCell>
                <TableCell align='right'>{row.budget}</TableCell>
                <TableCell align='right'>{row.address}</TableCell>
                <TableCell align='right'>
                  <Button onClick={(event) => handleClick(event, row._id)} sx={{ color: "#333" }}>
                    <MoreHorizIcon />
                  </Button>
                  {id === row._id &&
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={() => handlePin(row._id, row.pin)}>{row.pin === true ? "Un Pin" : "Pin"}</MenuItem>
                      <MenuItem onClick={() => setModalOpen(true)}>Payment</MenuItem>
                      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                        <ModalDialog>
                          <DialogTitle>Payment is being made to {row.fname}</DialogTitle>
                          <form onSubmit={handleSubmit}>
                            <Stack spacing={2}>
                              <FormControl>
                                <FormLabel>Enter the amount</FormLabel>
                                <Input
                                  onChange={(e) => setFormData((prev) => ({
                                    ...prev,
                                    budget: Number(e.target.value)
                                  }))}
                                  autoFocus
                                  required
                                />
                              </FormControl>
                              <Button type="submit">Add</Button>
                            </Stack>
                          </form>
                        </ModalDialog>
                      </Modal>
                    </Menu>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      
    </div >
  )
}

export default BasicTable
