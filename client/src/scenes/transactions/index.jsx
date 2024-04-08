import React , { useState } from "react"
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import { Box, useTheme } from "@mui/material"; // Import useTheme
import { DataGrid } from '@mui/x-data-grid';
import DataGridCustomToolbar from "components/DataGridCustomToolbar";


const Transactions = () => {
    const theme = useTheme();
    ////values to send for the backend
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");


    const {data, isLoading} = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
    });

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1
        },
        {
            field: "userId",
            headerName: "User Id",
            flex: 1
        },
        {
            field: "createdAt",
            headerName: "Created At",
            flex: 0.5,
            sortable: false
        },
        {
            field: "products",
            headerName: "# of Products",
            flex: 0.4,
            sortable: false,
            renderCell: (params) => params.value.length,
        },    
        {
            field: "cost",
            headerName: "Cost",
            flex: 0.5,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
      },
    ];
    
     //console.log('data', data);
        
    return (
     <Box m="1.5rem 2.5rem">
     <Header title="TRANSACTIONS" subtitle="List Of Transactions" />
     

     <Box mt="5px" height="80vh" 
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
                backgroundColor: theme.palette.alt,
                
               
                
            },
            "& .MuiDataGrid-virtualScroller":{
                backgroundColor: theme.palette.alt,
                
    
            },
            "& .MuiDataGrid-footerContainer":{
                backgroundColor: theme.palette.alt,
                borderBottom: "none"
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text":{
                color: `${theme.palette.secondary[100]} !important`,
            },
    
        }}
        
        >
        <DataGrid
            loading={isLoading || !data}
            getRowId={(row)=> row._id}
            rows={(data && data.transactions) || []}
            columns={columns}
            rowCount={(data && data.total) || 0}
            pagination
            page={page}
            pageSize={pageSize}
            paginationMode="server"
            sortingMode="server"
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onSortModelChange={(newSortModel) => setSort(...newSortModel)}
            slots={{toolbar:DataGridCustomToolbar}}
            slotProps={{toolbar: {searchInput, setSearchInput, setSearch}}}
            //components={{Toolbar: DataGridCustomToolbar}}
            //componentsProps={{toolbar: {searchInput, setSearchInput, setSearch}}}
            />
          
        </Box>
        
    </Box>
  )
}


export default Transactions;