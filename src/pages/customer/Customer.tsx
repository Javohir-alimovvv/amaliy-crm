import CreateCS from '@/components/create-cs/CreateCS'
import Table from '@/components/table/Table'
import { Box, Button, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { request } from '@/api'
import { useQuery } from '@tanstack/react-query'

const Customer: FC = () => {
  const [open, setOpen] = useState<null | string>(null)
  const { data } = useQuery({
    queryKey: ['customer'],
    queryFn: () => {
      return request
        .get('/get/customers', {
          params: {
            skip: 0,
            limit: 5
          }
        })
        .then(res => res)
    }
  })
  console.log(data?.data?.innerData)

  return (
    <div>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', mb: '20px' }}
      >
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Customer
        </Typography>
        <Button onClick={() => setOpen('customer')}>Create</Button>
      </Box>
      <Table data={data?.data?.innerData} />
      <CreateCS open={open} close={() => setOpen(null)} />
    </div>
  )
}

export default Customer
