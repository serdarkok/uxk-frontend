import { baseApi } from './baseApi';
import type { ILocation } from '@/types/location';

export const locationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLocations: builder.query<ILocation[], void>({
      query: () => '/locations',
      providesTags: ['Locations'],
    }),
  }),
});

export const { useGetLocationsQuery } = locationsApi;