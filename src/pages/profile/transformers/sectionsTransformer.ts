import dayjs from 'dayjs';

export const transformUserInfoData = (data: any) => {
    const {
        avatar_file_name,
        avatar_original_name,
        first_name,
        full_name,
        last_name,
        profile_file_name,
        profile_original_name,
        identity_status,
        username,
    } = data;

    return {
        avatar_file_name,
        avatar_original_name,
        first_name,
        full_name,
        last_name,
        profile_file_name,
        profile_original_name,
        identity_status,
        username
    }
}

export const transformUBasicInformationData = (data: any) => {
    const {
        location,
        join_time
    } = data;

    return {
        location,
        join_date: dayjs(new Date(join_time)).format('YYYY-MM-DD')
    }
}