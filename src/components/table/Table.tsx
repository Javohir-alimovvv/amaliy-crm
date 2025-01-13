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

const BasicTable: FC<{ data: ICustomers[] }> = ({ data }) => {
  const [page, setPage] = React.useState(1)
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const [id, setId] = React.useState<null | string>(null)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, _id: string) => {
    setAnchorEl(event.currentTarget);
    setId(_id)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
                      <MenuItem onClick={handleClose}>{row.pin === true ? "Un Pin" : "Pin"}</MenuItem>
                      <MenuItem onClick={handleClose}>Payment</MenuItem>
                    </Menu>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={2}>
        <Pagination count={10} page={page} onChange={handleChange} />
      </Stack>
    </div >
  )
}

export default BasicTable
