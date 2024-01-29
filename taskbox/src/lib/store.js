import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/*Initial Data*/
const TaskBoxData = {
  tasks: [],
  status: "idle",
  error: null,
};

export const fetchTasks = createAsyncThunk(
  "todos/fetchTodos",
  async () => {
    const response = await fetch(
     'https://jsonplaceholder.typicode.com/todos?userId=1'
    );
    const result = data.map((task) => ({
      id: `${task.id}`,
      title: task.title,
      state: task.completed ? 'TASK_ARCHIVED' : 'TASK_INBOX',
     }));
     return result;
  }
);

const TasksSlice = createSlice({
  name: "taskbox",
  initialState: TaskBoxData,
  reducers: {
    updateTaskState: (state, action) => {
      const { id, newTaskState } = action.payload;
      const task = state.tasks.findIndex((task) => task.id === id);
      if (task >= 0) {
        state.tasks[task].state = newTaskState;
      }
    },
  },

  //Async actions
  extraReducers: (builder) => {
    builder
    .addCase(fetchTasks.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
        state.tasks = [];
    })
    .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeed";
        state.error = null;
        state.tasks = action.payload;
      })
    .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Something went wrong";
        state.tasks = [];
      });
  },
});

// The actions contained in the slice are exported for usage in our components
export const { updateTaskState } = TasksSlice.actions;

const store = configureStore({
  reducer: {
    taskbox: TasksSlice.reducer,
  },
});

export default store;
