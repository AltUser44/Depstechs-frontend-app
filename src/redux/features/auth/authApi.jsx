import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/auth`, 
        credentials: 'include',
    }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: "/register",
                method: "POST",
                body: newUser,
            }),
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: "/login", 
                method: "POST",
                body: credentials,
            }),
        }),
        logoutUser: builder.mutation({
            query: (credentials) => ({
                url: '/logout', 
                method: "POST",
            }),
        }),
        getUser: builder.query({
            query: () => ({
                url: '/users/', 
                method: "GET",
            }),
            refetchOnMount: true,
            invalidatesTags: ["Users"],
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/user/${userId}`, 
                method: "DELETE",
            }),
            invalidatesTags: ["User"],
        }),
        updateUser: builder.mutation({
            query: ({userId, role}) => ({
                url: `/users/${userId}`, 
                method: "PUT",
                body: {role}
            }),
            refetchOnMount: true,
            invalidatesTags: ["Users"],
        }),
        editProfile: builder.mutation({
            query: ({ userId, username, profileImage, bio, profession}) => ({
                url: `/edit-profile`, 
                method: "PATCH",
                body: { userId, username, profileImage, bio, profession}, 
            }),
        })
    }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useGetUserQuery, useDeleteUserMutation, useUpdateUserMutation, useEditProfileMutation } = authApi;
export default authApi;
