import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json"

const taskSlice = createSlice({
    name: "task",
    initialState: data,
    reducers: {
        actvbrd(state, action) {
            state.boards.map(e => {
                if (e.name == action.payload) {
                    e.isActive = true;
                } else {
                    e.isActive = false;
                }
            })
        },
        crtbrd(state, action) {
            console.log(action.payload)
            state.boards.push(action.payload)
        },
        dltbrd(state) {
            let arr = [];
            for (let i = 0; i < state.boards.length; i++) {
                if (state.boards[i].isActive !== true) {
                    arr.push(state.boards[i])
                }
            }
            state.boards = arr;
            state.boards[0] = {
                ...state.boards[0],
                "isActive": true
            }
        },
        edtbrd(state, action) {
            let id
            let col = []
            for (let i = 0; i < state.boards.length; i++) {
                if (state.boards[i].isActive == true) {
                    id = i
                    break
                }
            }
            state.boards[id] = []
            state.boards[id] = action.payload[0];
        },
        //Task
        crtsk(state, action) {
            let act;
            for (let i = 0; i < state.boards.length; i++) {
                if (state.boards[i].isActive == true) {
                    act = i;
                    break;
                }
            }
            state.boards[act].columns.map(e => {
                if (e.name == action.payload[0].status) {
                    e.tasks.push(action.payload[0]);
                }
            })
        },
        edtsbtsk(state, action) {
            state.boards[action.payload[0]].columns[action.payload[1]].tasks[action.payload[2]].subtasks.map(e => {
                if (e.title == action.payload[3]) {
                    e.isCompleted = action.payload[4].isCompleted
                }
            })
        },
        chnstas(state, action){
            console.log(action.payload)
                let arr=[]
                for(let i=0;i<state.boards[action.payload[0]].columns[action.payload[1]].tasks.length;i++){
                    if(i==action.payload[2]) continue;
                    arr.push(state.boards[action.payload[0]].columns[action.payload[1]].tasks[i])
                }
                state.boards[action.payload[0]].columns[action.payload[1]].tasks=arr       
                state.boards[action.payload[0]].columns.map(e=>{
                    if(e.name==action.payload[3]){
                        e.tasks.push(action.payload[4])
                    }
                })          
        },
        dlttsk(state,action){
            // console.log(action.payload)
            let arr=[]
            for(let i=0;i<state.boards[action.payload[0]].columns[action.payload[1]].tasks.length;i++){
                if(i==action.payload[2]) continue
                arr.push(state.boards[action.payload[0]].columns[action.payload[1]].tasks[i])
            }
            state.boards[action.payload[0]].columns[action.payload[1]].tasks=arr
        },
        edttsk(state,action){
            state.boards[action.payload[0]].columns[action.payload[1]].tasks[action.payload[2]]=action.payload[3]
        }

    }
})

export const { actvbrd, crtbrd, dltbrd, edtbrd } = taskSlice.actions
export const { crtsk, edtsbtsk, chnstas, dlttsk, edttsk } = taskSlice.actions
export default taskSlice.reducer;