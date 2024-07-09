import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Categories from "../../models/categories";

interface CategoryState {
    CatList: Categories[];
}
const initialState: CategoryState = {
    CatList: [],
}

export const CategoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories(state:CategoryState, action: PayloadAction<Categories[]>) {
            state.CatList = action.payload
        },
    },
    extraReducers: () => {},
})

export default CategoriesSlice.reducer;
