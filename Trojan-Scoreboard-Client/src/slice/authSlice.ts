import {LoginData} from "@/model/LoginModel";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {act} from "react-dom/test-utils";

function getInitalState() : LoginData {
    return {
        jwt: "",
        timestamp: 0
    }
}

const initialState = getInitalState();


export const loginDataSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setValue: (state, action : PayloadAction<string>) => {
            return {
                jwt: action.payload,
                timestamp : Date.now(),
            }
        },
    }
})

export const {setValue, set} = loginDataSlice.actions;

export default loginDataSlice.reducer;