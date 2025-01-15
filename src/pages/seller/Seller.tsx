import { request } from '@/api'
import CreateCS from '@/components/create-cs/CreateCS'
import Table from '@/components/table/Table'
import { Box, Button, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

const Seller = () => {
  const [page, setPage] = React.useState(1)
  const [open, setOpen] = useState<null | string>(null)
  const limit = 8
  const skip = (page - 1) * limit

  const { data } = useQuery({
    queryKey: ['seller', page],
    queryFn: () => {
      return request
        .get('/get/sellers', {
          params: {
            skip: skip,
            limit: limit
          }
        })
        .then(res => res)
        .catch(err => console.log(err))
    }
  })

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  return (
    <div>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', mb: '20px' }}
      >
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Seller
        </Typography>
        <Button onClick={() => setOpen('seller')}>Create</Button>
      </Box>
      <Table data={data?.data?.innerData} type="seller" />
      <div className='flex items-center justify-center mt-8'>
        <Stack spacing={2}>
          <Pagination count={Math.ceil(data?.data.totalCount / limit)} page={page} onChange={handleChange} />
        </Stack>
      </div>
      <CreateCS open={open} close={() => setOpen(null)} />
    </div>
  )
}

export default Seller
