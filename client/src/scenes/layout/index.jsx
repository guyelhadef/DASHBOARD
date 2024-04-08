import React, { useState } from 'react';
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom"; 
import { UseSelector, useSelector } from 'react-redux';
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from 'state/api';

//import Header from 'components/Header';
import Products from 'scenes/products';


const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);

  //console.log("🚀 ~ Layout ~ data:", data); for testing data is coming back from server
  //console.log('data', data);
  ////console.log('data', Products);
   

  return ( 
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
    <Sidebar
    user ={data || {}}
    isNonMobile={isNonMobile}
    drawerWidth="250px"
    isSidebarOpen={isSidebarOpen}
    setIsSidebarOpen={setIsSidebarOpen}
    />
    <Box flexGrow={1}>
        <Navbar 
        user ={data || {}}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
        
        
    </Box>
  </Box>
 );
};

export default Layout;