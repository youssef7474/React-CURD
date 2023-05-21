import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";

const initialState = { records: [], loading: false, error: null ,record:null};


export const fetchPosts=createAsyncThunk("posts/fetchPosts",async(_,thunkAPI)=>{

    const {rejectWithValue}=thunkAPI;
    try {
        const res = await fetch("http://localhost:5000/posts");
        const data= await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})




export const deletePost=createAsyncThunk("posts/deletePost",async(id,thunkAPI)=>{

    const {rejectWithValue}=thunkAPI;

    try {
        await fetch(`http://localhost:5000/posts/${id}`,{
            method: "DELETE"
        })
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})



export const insertPost = createAsyncThunk("posts/insertPost",async (item, thunkAPI) => {
      const { rejectWithValue,getState} = thunkAPI;
      const {auth}=getState();
      item.userId=auth.id;
  
      try {
        const res = await fetch("http://localhost:5000/posts", {
          method: "POST",
          body: JSON.stringify(item),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data = await res.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
});

export const fetchPost =createAsyncThunk("posts/fetchPost",async(id,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI;
    try {
        const res = await fetch(`http://localhost:5000/posts/${id}`)
        const data= await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})


export const editPost = createAsyncThunk(
    "posts/editPost",
    async (item, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await fetch(`http://localhost:5000/posts/${item.id}`, {
          method: "PATCH",
          body: JSON.stringify(item),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data = await res.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    cleanRecords:(state) => {
        state.record = null;
    }
  },
  extraReducers: {
    [fetchPosts.pending]:(state,action)=>{
        state.loading=true;
        state.error=null;
    }
    ,
    [fetchPosts.fulfilled]:(state,action)=>{
        state.loading=false;
        state.records=action.payload
    }
    ,
    [fetchPosts.rejected]:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    }
    ,
    [deletePost.pending]:(state,action)=>{
        state.loading=true;
        state.error=null;
    }
    ,
    [deletePost.fulfilled]:(state,action)=>{
        state.loading=false;
        state.records=state.records.filter((el)=>el.id!==action.payload);
    }
    ,
    [deletePost.rejected]:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    }
    ,
    [insertPost.pending]:(state,action)=>{
        state.loading=true;
        state.error=null;
    }
    ,
    [insertPost.fulfilled]:(state,action)=>{
        state.loading=false;
        state.records.push(action.payload);
    }
    ,
    [insertPost.rejected]:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    }
    ,
    [fetchPost.pending]:(state,action)=>{
        state.loading=true;
        state.error=null;
 
    }
    ,
    [fetchPost.fulfilled]:(state,action)=>{
        state.loading=false;
        state.record=action.payload;
    }
    ,
    [fetchPost.rejected]:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    }
    ,
    [editPost.pending]: (state) => {
        state.loading = true;
        state.error = null;
      },
      [editPost.fulfilled]: (state, action) => {
        state.loading = false;
        state.record = action.payload;
      },
      [editPost.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
  },
});
export const {cleanRecords} =postSlice.actions
export default postSlice.reducer;