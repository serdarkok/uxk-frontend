import { baseApi } from './baseApi';
import type { IVendor } from '@/types/vendor';

export const vendorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVendors: builder.query<IVendor[], void>({
      query: () => '/vendors',
    }),
  }),
});

export const { useGetVendorsQuery } = vendorApi;