import React, { useMemo, useState } from 'react';
import { Box, useTheme } from "@mui/material";
import Header from 'components/Header';
import { useGetSalesQuery } from 'state/api';
import { ResponsiveLine } from "@nivo/line";



const Monthly = () => {

    const { data } = useGetSalesQuery();
    const theme =useTheme();

    const [formttedData]= useMemo(() => {
        if (!data) return [];

        const { monthlyData } = data;
        const totalSalesLine = {
            id: "totalSales",
            color: theme.palette.secondary.main,
            data: [],
        };
        const totalUnitsLine = {
            id: "totalUnits",
            color: theme.palette.secondary[600],
            data: [],
        };

    Object.values(monthlyData).forEach(({ month, totalSales, totalUnits}) =>{
      
                totalSalesLine.data = [
                ...totalSalesLine.data, { x: month, y: totalSales },
                ];

                totalUnitsLine.data = [
                ...totalUnitsLine.data, { x: month, y: totalUnits },
                ];
            
        });
           
        const formttedData = [totalSalesLine, totalUnitsLine]

        return [formttedData];

       }, [data]) // eslint-disable-line react-hooks/exhaustive-deps



       return (
      <Box mt= "2rem" ml="1rem" mr= "2rem">
        <Header title="MONTHLY SALES" subtitle="Chart of Monthly Sales" />
            <Box height="75vh" mt= "40px"> {/**dropdown menue */}
      

                {data ? (
                 <ResponsiveLine
                 data={formttedData} 
                 theme={{
                    axis: {
                        domain:{
                            line:{stroke: theme.palette.primary.light}
                        },
                        legend: {
                            text:{fill:theme.palette.secondary[600]}
                        },
                        ticks: {
                            line:{stroke: theme.palette.secondary[200],
                                strokeWidth: 1,
                            },
                            text:{fill:theme.palette.secondary[200]}
                        }
                        },
                        legends: {
                        text:{fill: theme.palette.primary[300]}
                        },
                        tooltip: {
                        container:{color: theme.palette.primary.dark}
                       }
                    }}

                    colors ={{ datum: "color"}}
                    margin={{ top: 50, right: 50, bottom: 50, left: 70 }}
                    xScale={{ type: 'point' }}
                    yScale={{
                        type: 'linear',
                        min: 'auto',
                        max: 'auto',
                        stacked: false,
                        reverse: false
                    }}
                    yFormat=" >-.2f"
                    //curve="catmullRom"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 90,
                        legend:"Month",
                        legendOffset: 60,
                        legendPosition: "middle",
                        truncateTickAt: 0
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend:"Total",
                        legendOffset: -50,
                        legendPosition: 'middle',
                        truncateTickAt: 0
                    }}
                    enableGridX={false}
                    enableGridY={false}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabelYOffset={-12}
                    enableArea={true}
                    enableTouchCrosshair={true}
                    useMesh={true}
                    legends={[
                              {
                                anchor: 'top-right',
                                direction: 'column',
                                justify: false,
                                translateX: -10,
                                translateY: 0,
                                itemsSpacing: 0,
                                itemDirection: 'left-to-right',
                                itemWidth: 80,
                                itemHeight: 50,
                                itemOpacity: 0.75,
                                symbolSize: 12,
                                symbolShape: 'circle',
                                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                effects: [
                                            {
                                                on: 'hover',
                                                style: {
                                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                                    itemOpacity: 1,
                                                      },
                                           },
                                         ],
                               },
                            ]}
        />
        ): <>"Loading...";</>}
    </Box>       
 </Box>
);
};

export default Monthly;