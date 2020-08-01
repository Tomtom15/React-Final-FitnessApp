import * as Types from "./Types";
export const apiCallStarted = () => ({
    type: Types.TEST
});
export const setUserProfile =(data)=>({
    type: Types.USER_PROFILE,
    payload:data
})
export const setInstructor=(data)=>({
    type:Types.INSTRUCTOR,
    payload:data
})