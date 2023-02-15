import { apiCall } from "../apiCall";
import { GetSkillsInterface, SearchSkillsInterface, SubmitSkillsInterface } from "./occupationSkillsActions";

export const getOcuupationCategories = () => {
    const requestOptions: RequestInit = {
        method: 'GET'
    };
    return apiCall(`/user/v1/occupation-categories`, requestOptions);
};

export const getSkills = (getSkillsParam: GetSkillsInterface | void) => {
    const requestOptions: RequestInit = {
        method: 'GET'
    };
    const queryString = getSkillsParam ? `?${new URLSearchParams(getSkillsParam as unknown as Record<string, any>).toString()}` : '';
    return apiCall(`/user/v1/skills${queryString}`, requestOptions);
};

export const searchSkills = (searchParams: SearchSkillsInterface) => {
    const requestOptions: RequestInit = {
        method: 'GET'
    };
    const queryString = searchParams ? `?${new URLSearchParams(searchParams as unknown as Record<string, any>).toString()}` : '';
    return apiCall(`/user/v1/skills/${searchParams.keyword}${queryString}`, requestOptions);
};

export const submitSuggestedSkills = (submitSkillsParams: SubmitSkillsInterface) => {
    const requestOptions: RequestInit = {
        method: 'POST',
        body: JSON.stringify(submitSkillsParams)
    };
    return apiCall(`/user/v1/suggested-skills`, requestOptions);
};
