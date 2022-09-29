import { Divider, ListItem, Typography, Box, Grid } from '@mui/material';
import React from 'react';
import ClientBasicInfo from '../../components/profile/client/ClientBasicInfo';
import ClientPicture from '../../components/profile/client/ClientPicture';
import ClientUserInfo from '../../components/profile/client/ClientUserInfo';
import JobFeedback from '../../components/profile/client/JobFeedback';

export default function ClientProfile() {
  return (
    <Box padding="5% 15% 10%" display="flex">
      <Grid container>
        <Grid item xs={12} lg={4}>
          <ClientPicture />
          <ClientBasicInfo />
        </Grid>
        <Grid item xs={12} lg={8}>
          <JobFeedback />
        </Grid>
      </Grid>
      {/* <Box padding="10px" width='40%'>

        </Box>
        <Box width='60%'>
          <JobFeedback />
        </Box> */}
    </Box>
  )
}
