import { configureStore, createSlice } from '@reduxjs/toolkit';

/*Initial data*/
const defaultTasks = [
  { id: '1', title: 'Something', state: 'TASK_INBOX' },
  { id: '2', title: 'Something more', state: 'TASK_INBOX' },
  { id: '3', title: 'Something else', state: 'TASK_INBOX' },
  { id: '4', title: 'Something again', state: 'TASK_INBOX' },
];
const TaskBoxData = {
  tasks: defaultTasks,
  status: 'idle', //free tasks
  error: null,
};

/*Slice with reducers for interacting with our data*/
const TasksSlice = createSlice({
    name: 'taskbox',
    initialState: TaskBoxData,
    reducers: {
        updateTaskState: (state,action) => {
            const { id, newTaskState} = action.payload;
            // const foundTask = state.tasks.find(t => t.id === id);
            const task = state.tasks.findIndex(t => t.id === id);
            if(task >= 0){
                state.tasks[task].state = newTaskState;
            }
        }
    },
});

//Actions in slice for store to dispatch
export const { updateTaskState } = TasksSlice.actions;

const store = configureStore({
    reducer: {
        taskbox: TasksSlice.reducer,
    },
})

export default store;