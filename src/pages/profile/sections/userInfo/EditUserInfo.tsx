import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import { Box } from '@mui/system';

const EditUserInfo = () => {
    return (<Box className="user-info-edit">
        <EditIcon
            className="user-info-edit-icon"
            style={{ marginLeft: 'auto' }}
        />
        <ShareIcon className="user-info-edit-icon" />
    </Box>)
}

export default EditUserInfo;