import { Divider, ListItem, Typography, Box, Grid, Stack, Pagination } from '@mui/material';
import React from 'react';
import FilterConditions from '../components/review/job/FilterConditions';
import JobSearch from '../components/review/job/JobSearch';
import Description from '../components/review/job/Description';
import FreelancersList from '../components/review/job/FreelancersList';

const data = ['1', '2', '3'];
export default function Search() {
    return (
        <>

            <Box padding="4% 15% 10%">
                <Grid container spacing={4}>
                    <Grid item xs={12} lg={3}>
                        <FilterConditions />
                    </Grid>
                    <Grid item xs={12} lg={9}>
                        <Stack direction='column' spacing={2}>
                            {data.map((item) => {
                                return (
                                    <FreelancersList />
                                )
                            })}
                        </Stack>
                        <Stack sx={{ display: 'flex', alignItems: 'center' }} spacing={2}>
                            <Pagination count={10} variant="outlined" shape='rounded' />
                        </Stack>
                    </Grid>

                </Grid>
            </Box>
        </>
    )
}
