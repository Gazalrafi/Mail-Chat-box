import { configureStore } from "@reduxjs/toolkit";
import authDetailSlice from "./authDetailSlice";
import mailDataSlice from "./maildataSlice";

const store = configureStore({
    reducer: {

        auth: authDetailSlice.reducer,
        mailData: mailDataSlice.reducer

    }
})

export default store