// import { createSlice } from '@reduxjs/toolkit'


// const initialState = {
//     user : null
// }
  
//   export const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//       setUserDetails : (state,action)=>{
//         state.user = action.payload
//       }
//     },
//   })
  
//   // Action creators are generated for each case reducer function
//   export const { setUserDetails } = userSlice.actions
  
//   export default userSlice.reducer


import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload)); // Persist user data
        },
        clearUserDetails: (state) => {
            state.user = null;
            localStorage.removeItem('user'); // Clear user data on logout
        }
    },
});

// Action creators are generated for each case reducer function
export const { setUserDetails, clearUserDetails } = userSlice.actions;

export default userSlice.reducer;
