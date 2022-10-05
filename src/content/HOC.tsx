import React from 'react'
import { useSelector } from "react-redux"
import MobileHeader from './layout/MobileHeader';
import MediaQuery from 'react-responsive'
import { Box } from '@mui/material';

const HOC = (props: any) => {
    const closed = useSelector((state: any) => state.mobile.check);
    return (
        closed ?
            <Box>
                <MediaQuery maxWidth='900px'><MobileHeader /></MediaQuery>
                <MediaQuery minWidth='901px'>{props.children}</MediaQuery>
            </Box>
            :
            props.children
    )
}

export default HOC;