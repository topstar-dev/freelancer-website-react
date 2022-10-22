import { styled } from "@mui/material/styles";

import {
    Box,
    Typography,
    MenuItem as MuiMenuItem
} from "@mui/material";

export const CustomForm = styled("form")({
    display: "flex",
    flexDirection: "column",
    gap: "20px"
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