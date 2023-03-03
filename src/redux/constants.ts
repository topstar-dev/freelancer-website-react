export const USER_TYPES = {
    CLIENT: 'CLIENT',
    FREELANCER: 'FREELANCER'
}

export const FUNCTION_TYPES = {
    USER_AVATAR: 'USER_AVATAR',
    USER_PROFILE: 'USER_PROFILE',
    USER_REPORT: 'USER_REPORT',
    USER_FEEDBACK: 'USER_FEEDBACK'
}

export const COUNTRY_ID_CHINA = '49';

interface LanguageSkill {
    [x: string]: string
}
export const LANGUAGE_SKILLS: LanguageSkill = {
    BEGINNER: 'beginner',
    INTERMEDIATE: 'intermediate',
    PROFICIENT: 'proficient',
    FLUENT: 'fluent',
    NATIVE: 'native-fluent'
}

export const FREELANCER_REQ_TYPES = {
    FREELANCER_PERSONALIZED: 'FREELANCER_PERSONALIZED',
    FREELANCER_RECENTLY: 'FREELANCER_RECENTLY',
    SKILL_INTERESTED: 'SKILL_INTERESTED',
    SKILL_POPULAR: 'SKILL_POPULAR'
}