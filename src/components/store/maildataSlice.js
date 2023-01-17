import { createSlice } from "@reduxjs/toolkit";

const initialState = { inboxData: [], outBox: [], Totalunreadmsg: 0 }

const mailDataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        getInboxData(state, action) {
            state.inboxData = action.payload

            // console.log(state.inboxData);

        },
        getoutBoxData(state, action) {
            state.outBox = action.payload

        },
        deleteFromInbox(state, action) {
            const deleteMailId = action.payload

            // console.log(deleteMailId);


            state.inboxData = state.inboxData.filter(item => item.senderId !== deleteMailId)

            // console.log(state.inboxData.senderId);



        },

        deleteFromOutbox(state, action) {
            const deleteMailId = action.payload

            // console.log(deleteMailId);


            state.outBox = state.outBox.filter(item => item.senderId !== deleteMailId)

            // console.log(state.inboxData.senderId);



        },

        isReadMail(state, action) {
            const id = action.payload;
            // console.log(id);
            // console.log(state.inboxData[0].senderId);
            const readMail = state.inboxData.find(item => {
                return (item.senderId === id)

            })

            readMail.isRead = true


        },
        getTotalUnreadMsg(state, action) {

            const inboxData = action.payload;
            // console.log(inboxData);

            const total = inboxData.reduce((accumulator, value) => {
                if (!value.isRead) {
                    return accumulator + 1;
                }

                return accumulator;
            }, 0);

            state.Totalunreadmsg = total


        }

    }
})

export default mailDataSlice
export const mailDataAction = mailDataSlice.actions