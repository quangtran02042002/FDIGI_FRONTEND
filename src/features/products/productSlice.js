import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { productService } from "./productService"



export const getAllProducts = createAsyncThunk("product/get", async (data, thunkAPI) => {
    try {
        return await productService.getProducts(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const getAProduct = createAsyncThunk('product/getAProduct', async (id, thunkAPI) => {
    try {
        return await productService.getSingleProduct(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const addToWishList = createAsyncThunk(
    "product/wishlist",
    async (prodId, thunkAPI) => {
        try {
            return await productService.addToWishList(prodId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const addRating = createAsyncThunk(
    "product/rating",
    async (data, thunkAPI) => {
        try {
            return await productService.rateProduct(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const productState = {
    product: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const productSlice = createSlice({
    name: "product",
    initialState: productState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.product = action.payload
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(addToWishList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToWishList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.addToWishList = action.payload;
                state.message = "Product Added To Wishlist"
            })
            .addCase(addToWishList.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getAProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAProduct.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "Product Fetched Successfully";
                state.singleproduct = action.payload;
            })
            .addCase(getAProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(addRating.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addRating.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "Rating added Successfully";
                state.rating = action.payload;
                if (state.isSuccess) {
                    toast.success("Rating added Successfully")
                }
            })
            .addCase(addRating.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

    }
})

export default productSlice.reducer;
