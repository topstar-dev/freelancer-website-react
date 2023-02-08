import { Backdrop, CircularProgress } from "@mui/material"

const CustomBackdrop = ({ loading }: any) => {
    return (
        <Backdrop
            className='only-backdrop'
            sx={{ color: '#fff', zIndex: 999 }}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default CustomBackdrop;