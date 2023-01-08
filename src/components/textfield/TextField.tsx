import { TextField as MuiTextField } from '@mui/material';
import { styled } from "@mui/material/styles";

const TextField = styled(MuiTextField)((theme) => {
    const { palette } = theme.theme;
    const { primary } = palette;
    return {
        borderColor: primary.main,
        color: primary.main,
        height: '40px',
        fontSize: '14px',
        borderRadius: '20px',
    }
})

export default TextField;