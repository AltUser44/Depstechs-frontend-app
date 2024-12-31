import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';

const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/products`,
        credentials: 'include', // This is correct as 'include'
    }),
    tagTypes: ["Product"],
    endpoints: (builder) => ({
        fetchAllProducts: builder.query({
            query: ({ 
                category, 
                color, 
                minPrice, 
                maxPrice, 
                page = 1, 
                limit = 10 
            }) => {
                const queryParams = new URLSearchParams({
                    category: category || '',
                    color: color || '',
                    minPrice: minPrice?.toString() || '0',
                    maxPrice: maxPrice?.toString() || '',
                    page: page.toString(),
                    limit: limit.toString(),
                }).toString();
                return `/?${queryParams}`;
            },
            providesTags: ["Product"], 
        }),

        fetchProductsById: builder.query({
            query: (id) => `${id}`,
            providesTags: (result, error, id) => [{ type: "Product", id }],
        }),

        AddProduct: builder.mutation({
            query: (newProduct) => ({
                url: "/create-product",
                method: "POST",
                body: newProduct,
                credentials: "include", // Corrected to 'include'
            }),
            invalidatesTags: ["Product"], // Fixed tag to "Product"
        }),

        fetchRelatedProducts: builder.query({
            query: (id) => `/related${id}`,
        }),

        updateProduct: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/update-product/${id}`,
                method: "PATCH",
                body: rest,
                credentials: "include", // Corrected to 'include'
            }),
            invalidatesTags: ["Product"], // Fixed tag to "Product"
        }),

        deleteProduct: builder.mutation({
            query: ({ id }) => ({
                url: `/${id}`,
                method: "DELETE",
                credentials: "include", // Corrected to 'include'
            }),
            invalidatesTags: (result, error, id) => [{ type: "Product", id }],
        }),
    }),
});

export const { 
    useFetchAllProductsQuery, 
    useFetchProductsByIdQuery, 
    useAddProductMutation, 
    useUpdateProductMutation, 
    useDeleteProductMutation, 
    useFetchRelatedProductsQuery 
} = productsApi;

export default productsApi;
