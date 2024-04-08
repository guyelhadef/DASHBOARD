import Header from 'components/Header';
import React from 'react';
import { Box, useTheme } from '@mui/material';
import { useGetCustomersQuery } from 'state/api';
import { DataGrid } from '@mui/x-data-grid';


const Customers = () => {

const theme = useTheme();
const {data, isLoading } =useGetCustomersQuery();
//console.log('data',data)
   const columns = [
    {
    field: "_id",
    headerName: "ID",
    flex: 1,
    },

    {
    field: "name",
    headerName: "Name",
    flex: 0.5,
    },

    {
    field: "email",
    headerName: "Email",
    flex: 0.5,
    },

    {
    field: "phoneNumber",
    headerName: "Phone Number",
    flex: 0.5,
    renderCell: (params) => {
        return params.value.replace(/^(\d{3}) (\d{3}) (\d{4})/, "($1)$2-$3") //format the phone number 3 sets of 3 
        }
    },
    {
        field: "country",
        headerName: "Counrty",
        flex: 0.4,
        },
        {
        field: "city",
        headerName: "City",
        flex: 0.4,
            },
    {
        field: "occupation",
        headerName: "Occupation",
        flex: 1,
        },
    {
        field: "role",
        headerName: "Role",
        flex: 0.5,
        },
   ]


  return (
    <Box m="1.5rem 2.5rem">
    <Header title="CUSTOMERS" subtitle="List Of Customers" />
    <Box mt="40px" hight="75vh" 
    sx={{
        "& .MuiDataGrid-root":{
            backgroundColor: theme.palette.alt,
            

        },
        "& .MuiDataGrid-colCell": {
            backgroundColor: theme.palette.alt,
            
        },
        "& .MuiDataGrid-cell":{
            backgroundColor: theme.palette.alt,

            
        },
        "& .MuiDataGrid-columnHeaders":{
            backgroundColor: theme.palette.primary.light, 
            
           
        },
        "& .MuiDataGrid-virtualScroller":{
            backgroundColor: theme.palette.primary.light,            

        },
        "& .MuiDataGrid-footerContainer":{
            backgroundColor: theme.palette.alt,
            borderBottom: "none"
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text":{
            color: `${theme.palette.secondary[100]} !important`,
        },

    }}
    />
    <DataGrid
    loading={isLoading || !data}
    getRowId={(row)=> row._id}
    rows={data || []}
    columns={columns}
    
    />

    </Box>
  )
}

export default Customers;