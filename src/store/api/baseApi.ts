import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL + '/api',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      // Add authentication token if needed
      // const token = getToken();
      // if (token) {
      //   headers.set('authorization', `Bearer ${token}`);
      // }
      return headers;
    },
  }),
  tagTypes: ['Ships', 'Ship', 'Locations', 'Location', 'Categories', 'Category'],
  endpoints: () => ({}),
});
