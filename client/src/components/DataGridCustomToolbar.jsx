import React from 'react';
import { Search } from '@mui/icons-material';
import { IconButton, TextField, InputAdornment } from '@mui/material';
import {
   GridToolbarDensitySelector,
   GridToolbarContainer,
   GridToolbarExport,
   GridToolbarColumnsButton,
} from '@mui/x-data-grid';
import FlexBetween from './FlexBetween';

const DataGridCustomToolbar = ({searchInput, setSearchInput,setSearch}) => {
    return (
        <GridToolbarContainer>
            <FlexBetween width="100%">
                <FlexBetween>
                    {/* Show columns button */}
                    <GridToolbarColumnsButton />
                    {/* Density selector for row height */}
                    <GridToolbarDensitySelector />
                    {/* Export data button */}
                    <GridToolbarExport />
                </FlexBetween>
                {/* Search input field */}
                <TextField
                    label="Search..."
                    sx={{ mb: "0.5rem", width: "15rem" }}
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                    variant='standard'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {/* Search icon button */}
                                <IconButton onClick={() => {
                                  setSearch(searchInput);
                                  setSearchInput("");
                                }}>
                                    <Search />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </FlexBetween>
        </GridToolbarContainer>
    );
}
export default DataGridCustomToolbar;
