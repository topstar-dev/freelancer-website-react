import { Divider, ListItem, Typography, Box } from '@mui/material';
import React from 'react';
import ClientBasicInfo from './client/ClientBasicInfo';
import ClientPicture from './client/ClientPicture';
import ClientUserInfo from './client/ClientUserInfo';
import JobFeedback from './client/JobFeedback';
import About from './freelancer/About';
import Education from './freelancer/Education';
import Experience from './freelancer/Experience';
import Language from './freelancer/Language';
import Skills from './freelancer/Skills';

export default function FreelancerProfile() {
  return (
    <>
      <ListItem>
        <Typography ml={1}> Client profile </Typography>
      </ListItem>
      <Divider />
      <Box padding="5% 15% 10%" display="flex">
        <Box padding="10px" width='40%'>
          <ClientPicture />
          <ClientBasicInfo />
          <ClientUserInfo />
          <JobFeedback />
        </Box>
        <Box width='60%'>
          <About />
          <Skills />
          <Experience />
          <Education />
          <Language />
        </Box>

      </Box>
    </>
  )
}
