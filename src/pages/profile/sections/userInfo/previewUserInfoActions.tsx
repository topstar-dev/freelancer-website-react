import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import ShareIcon from '@mui/icons-material/Share';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { deleteStarUserAction, getStarUserAction, starUserAction } from '../../../../redux/star/starActions';
import { useEffect, useState } from 'react';
import { addStarUser } from '../../../../redux/star/starSlice';
import CustomBackdrop from '../../../../components/customBackdrop/CustomBackdrop';

const PreviewUserInfoActions = ({ username = '' }: any) => {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    const { userInfo } = useAppSelector(state => state.auth)
    const { staredUsers } = useAppSelector(state => state.star)

    const [called, setCalled] = useState(false);
    const [backdrop, setBackdrop] = useState(false);

    useEffect(() => {
        if (!called && userInfo) {
            setCalled(true)
            setBackdrop(true)
            dispatch(getStarUserAction()).then((res: any) => {
                if (res.payload.success) {
                    dispatch(addStarUser([...staredUsers, ...Array.from(new Set(res.payload.data.records.map((e: any) => e.username)))]))
                } else {

                }
            }).catch((err) => {

            }).finally(() => {
                setBackdrop(false)
            })
        }
    }, [dispatch, called])

    return (<Box className="user-info-edit">
        {userInfo && <IconButton
            style={{ marginLeft: 'auto', paddingLeft: 6, paddingRight: 6 }}
            onClick={() => {
                if (staredUsers.indexOf(username) !== -1) {
                    setBackdrop(true)
                    dispatch(deleteStarUserAction(username)).then((res: any) => {
                        if (res.payload.success) {
                            dispatch(addStarUser([...staredUsers].splice(staredUsers.indexOf(username), 0)))
                        } else {
                            enqueueSnackbar(res.payload.message)
                        }
                    }).catch((err: any) => {
                        enqueueSnackbar(err.message)
                    }).finally(() => {
                        setBackdrop(false)
                    })
                } else {
                    setBackdrop(true)
                    dispatch(starUserAction(username)).then((res: any) => {
                        if (res.payload.success) {
                            dispatch(addStarUser([username]))
                        } else {
                            enqueueSnackbar(res.payload.message)
                        }
                    }).catch((err: any) => {
                        enqueueSnackbar(err.message)
                    }).finally(() => {
                        setBackdrop(false)
                    })
                }
            }}
        >
            {staredUsers.indexOf(username) !== -1 ?
                <StarIcon style={{ fontSize: '29px' }} className="user-info-edit-icon" />
                :
                <StarOutlineIcon style={{ fontSize: '29px' }} className="user-info-edit-icon" />
            }
        </IconButton>}
        <IconButton onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            enqueueSnackbar(t('profile.share-link-copied-to-clipboard'))
        }}>
            <ShareIcon className="user-info-edit-icon" />
        </IconButton>
        <CustomBackdrop loading={backdrop} />
    </Box>)
}

export default PreviewUserInfoActions;