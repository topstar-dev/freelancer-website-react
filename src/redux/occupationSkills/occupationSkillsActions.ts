import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSkills, searchSkills, submitSuggestedSkills } from "./occupationSkillsApi";

export interface GetSkillsInterface {
    occupation_category?: string;
    page_index?: number;
    page_size?: number;
    order_by?: 'skill_name' | 'skill_stars' | 'skill_usage';
    order?: 'ASC' | 'DESC'
}

export interface SearchSkillsInterface {
    keyword: string;
    occupation_category?: string;
    page_index?: number;
    page_size?: number;
}

export interface SubmitSkillsInterface {
    occupation_category: string;
    skill_description: string;
    skill_name: string;
}

export const getSkillsList = createAsyncThunk(
    'occupationSkills/getSkills',
    async (skillsParamData: GetSkillsInterface | void, { rejectWithValue }) => {
        try {
            const response = await getSkills(skillsParamData);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)

export const searchSkillsAction = createAsyncThunk(
    'occupationSkills/searchSkills',
    async (searchParams: SearchSkillsInterface, { rejectWithValue }) => {
        try {
            const response = await searchSkills(searchParams);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)

export const submitSuggestedSkillsAction = createAsyncThunk(
    'occupationSkills/submitSuggestedSkills',
    async (submitSkillsParams: SubmitSkillsInterface, { rejectWithValue }) => {
        try {
            const response = await submitSuggestedSkills(submitSkillsParams);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)