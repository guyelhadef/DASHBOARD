import React, { useState } from "react";
import Header from "components/Header";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useGetProductsQuery } from "state/api";

const Product =({
_id,
name,
description,
price,
rating,
category,
supply,
stat,
}) => {
  const theme = useTheme();
  const [isExpended, setIsExpended]= useState(false);

  return (
    <Card
    sx={{
      backgroundImage: "none",
      backgroundColor: theme.palette.background.alt,
      borderRadius: "0.55rem",
    }}    
    >
    <CardContent>
      <Typography sx={{ fontSize: 14}} color={theme.palette.secondary[700]} gutterBottom>
        {category}
      </Typography>

      <Typography variant="5h" component="div">
        {name}
      </Typography>

      <Typography sx={{ mb: "1.5rem"}} color={theme.palette.secondary[400]}>
        ${Number(price).toFixed(2)}
      </Typography>

      <Rating value={rating} readOnly />

      <Typography variant="body2">{description}</Typography>
      

    </CardContent>

    <CardActions>

      <button 
      variant="primary"
      size="small"
      onClick={() => setIsExpended(!isExpended)}
      >
        See More
      </button>
    </CardActions>

    <Collapse
    in={isExpended}
    timeout="auto"
    unmountOnExit
    sx={{
      color: theme.palette.neutral[300]
    }}
    >
    
    <CardContent>
      <Typography>id: {_id}</Typography>
      <Typography>Supply Left: {supply}</Typography>
      <Typography>Yearly Sales This Year: {stat.yearlyTotalSoldUnits}</Typography>
      <Typography>id: {_id}</Typography>
      
    </CardContent>
    </Collapse>
    </Card>
  )
}


const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 100px)");

  //console.log("data", data);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0 ,1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div":{ gridColumn: isNonMobile ? undefined : "span 4" }
          }}
        >
          {data.map(
          ({
            _id,
            name,
            description,
            price,
            rating,
            category,
            supply,
            stat,

          }) => (

            <Product 
            
            key={_id}
            _id={_id}
            name={name}
            description={description}
            price={price}
            rating={rating}
            category={category}
            supply={supply}
            stat={stat}
            
            />
          )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;
