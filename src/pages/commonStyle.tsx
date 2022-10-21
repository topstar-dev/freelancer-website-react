import React from "react";
import { styled } from "@mui/material/styles";

import {
    Dialog,
    DialogActions,
    DialogTitle,
    Chip,
    Box,
    Typography,
    Button,
    MenuItem as MuiMenuItem,
    TableCell,
    TableRow,
    TableHead,
} from "@mui/material";

export const DecideButton = styled(Button)(() => ({
    textTransform: 'none',
    // marginTop: '-10px',
    borderRadius: '20px',
    // marginBottom: '5px',
    padding: '8px 20px',
    "&:hover": {
        backgroundColor: 'rgba(51, 109, 239 , 0.24)',
    },
}));

export const BlueButton = styled(Button)((props: any) => ({
    color: "white",
    backgroundColor: "#336def",
    borderRadius: "24px",
    padding: "8px 20px",
    textTransform: "none",
    height: props.height || 49,
    width: props.width || 129,
    "&:hover": {
        background: "#336def",
    },
}));

export const CustomForm = styled("form")({
    display: "flex",
    flexDirection: "column",
    gap: "20px"
});

export const FormBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
});

export const FlexBox = styled(Box)({
    display: 'flex',
})

export const TabPanel = (props: any) => {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </Box>
    );
};

export const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
    height: "60px",
    fontSize: "20px",
}));

export const TableBox = styled(Box)(() => ({
    marginLeft: '7%',
    marginRight: '7%',
    marginTop: '4%'
}));

export const CustomModal = (props: any) => {
    const { name, children, onClose } = props;

    return (
        <Dialog
            maxWidth='xs'
            style={{ width: '100%' }}
            open={true}
            onClose={onClose}
        >
            <DialogTitle className='dialog-title'>
                {name}
            </DialogTitle>
            {children}
            <DialogActions>
                <BlueButton onClick={onClose} autoFocus>
                    Apply
                </BlueButton>
            </DialogActions>
        </Dialog>
    );
}
export const MuiChip = styled(Chip)(() => ({
    "&:hover": {
        background: "#ccccff",
    },
    color: "#336def",
}));

export const CustomTableHeadWithTwoActions = (props: any) => {
    const header = props.name;
    return (
        <TableHead>
            <TableRow
                className="user-admin-console-tablerow">
                {
                    header.map((item: string) => {
                        return <TableCell align="left">{item}</TableCell>
                    })
                }
                <TableCell></TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
    )
}
export const CustomTableHeadWithOneActions = (props: any) => {
    const header = props.name;
    return (
        <TableHead>
            <TableRow
                className="user-admin-console-tablerow">
                {
                    header.map((item: string) => {
                        return <TableCell align="left">{item}</TableCell>
                    })
                }
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
    )
}
export const CustomTableHeadWithNoActions = (props: any) => {
    const header = props.name;
    return (
        <TableHead>
            <TableRow
                className="user-admin-console-tablerow">
                {
                    header.map((item: string) => {
                        return <TableCell align="left">{item}</TableCell>
                    })
                }
            </TableRow>
        </TableHead>
    )
}

export const SeeMoreBox = styled(Box)(() => ({
    height: '60px',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#336def',
    display: 'flex',
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: '#cccccc',
    }
}))

export const TextButton = styled(Typography)(() => ({
    '&:hover': {
        cursor: 'pointer',
    }
}))