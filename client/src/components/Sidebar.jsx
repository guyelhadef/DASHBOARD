import React from 'react'
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
   } from "@mui/icons-material";

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import profileImage from "assest/profile.jpg";

import { width } from '@mui/system';
import { act } from 'react-dom/test-utils';

const NavItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />
    },
    {
        text: "Client Facing",
        icon: null,
    }, {
        text: "Products",
        icon: <ShoppingCartOutlined />
    }, {
        text: "Customers",
        icon: <Groups2Outlined />
    }, {
        text: "Transactions",
        icon: <ReceiptLongOutlined />
    }, {
        text: "Geography",
        icon: <PublicOutlined />
    }, {
        text: "Sales",
        icon: null,
    }, 
    {
        text: "Overview",
        icon: <PointOfSaleOutlined />
    },
    {
        text: "Daily",
        icon: <TodayOutlined />
    }, 
    {
        text: "Monthly",
        icon: <CalendarMonthOutlined />
    },
    {
        text: "Breakdown",
        icon: <PieChartOutlined />
    }, 
     {
        text: "Management",
        icon: null,
    }, 
     {
        text: "Admin",
        icon: <AdminPanelSettingsOutlined />
    }, 
     {
        text: "Performance",
        icon: <TrendingUpOutlined />
    },  
];

const Sidebar = ({
    user,
    drawerWidth,
    isSidebarOpen,
    setSidebarOpen,
    isNonMobile,
}) => {
    const { pathname } = useLocation();
    const [active, setActive]= useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname])

  return <Box component="nav">
    {isSidebarOpen && (
        <Drawer
        open={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        variant ="persistent"
        anchor='left'
        sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper":{
            color:theme.palette.secondary[100], //TEXT COLOR MENU CATEGORIES
            backgroundColor:theme.palette.background.alt,
            boxSixing: "border-box",
            borderWidth: isNonMobile ? 0 : "2px",
            width: drawerWidth
            
            }
           }}
         >
            <Box width="100%">
                <Box m="1.5rem 2rem 2rem 3rem">
                    <FlexBetween color={theme.palette.secondary.main}>
                           <Box display="flex" alignItems="center" gap="0.5rem">
                             <Typography variant="h5" fontWeight="bold"> {/*//BIG HEADER*/}
                                REACT MONGODB 
                             </Typography>
                           </Box>
                           {!isNonMobile && (
                            <IconButton onClick={() => setSidebarOpen(!isSidebarOpen)}>
                            <ChevronLeft />
                            </IconButton>
                           )}
                    </FlexBetween>
                </Box>
                <List>
                    {NavItems.map(({ text, icon }) => {
                        if (!icon) {
                                 return (
                                    <Typography key ={text} sx={{ m: "2.25rem 0 1rem 3rem"}}>
                                        {text}
                                    </Typography>
                                 )                       
                       }
                       const lctText = text.toLocaleLowerCase();
                       return(
                         <ListItem key ={text} disablePadding>
                              <ListItemButton
                                  onClick={() => { 
                                navigate(`/${lctText}`);
                                setActive(lctText);
                              }}
                              sx= {{
                                ml: "1rem",
                                backgroundColor:
                                 active === lctText 
                                ? theme.palette.secondary[300]   /*//LIST MENUE ITEM COLOR*/
                                : "transparent",
                                
                                color: active === lctText 
                                ? theme.palette.primary[300]   /*//SELECTED LIST MENUE ITEM COLOR*/
                                : theme.palette.secondary[100], /*//NON SELECTED LIST MENUE ITEM COLOR*/
                              }}
                             >
                         <ListItemIcon
                            sx= {{
                                ml: "2rem",
                                backgroundColor:
                                 active === lctText 
                                ? theme.palette.secondary[300] /*//LIST MENUE ICON BACKGROUND COLOR*/
                                : "transparent",
                                
                                color: active === lctText 
                                ? theme.palette.primary[600]
                                : theme.palette.secondary[200], /*//LIST MENUE ICON  COLOR*/
                            }}
                             >
                                {icon}
                             </ListItemIcon>
                             <ListItemText primary ={text} />
                             {active === lctText && (
                                <ChevronRightOutlined sx={{ml:"auto"}}/>
                             )}
                          </ListItemButton>
                        </ListItem>
                       );
                    })}
                </List>
            </Box>

           <Box position = "absolute" bottom ="1.5rem">     
            {/*USER INFORMATION BOTTOM SIDEBAR*/}

           <Divider />
              <FlexBetween textTransform="none" gap="1rem" m="1.0rem 1rem 0 1rem">
                <Box 
                    component="img"
                    alt="profile"
                    src={profileImage}
                    height="40px"
                    width="40px"
                    borderRadius="50%"
                    sx={{objectFit: "cover"}}
                />
                     <Box textAlign="left">
                        <Typography 
                            fontWeight="bold" 
                            fontSize="0.9rem" 
                            sx={{ color: theme.palette.secondary[100]}}
                        >
                            {user.name}  
                        </Typography>
                        <Typography  
                            fontSize="0.8rem" 
                            sx={{ color: theme.palette.secondary[200]}}
                        >
                            {user.occupation}  
                        </Typography>
                     </Box>
                     <SettingsOutlined 
                     sx={{ color: theme.palette.secondary[300],
                     fontSize: "25px",
                    }}
                  />
                </FlexBetween>
              </Box>
       </Drawer>
     )}
  </Box>;
};

export default Sidebar;