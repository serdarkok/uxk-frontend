import { baseApi } from './baseApi';
import type { IShip } from '@/types/ship';
import type { CreateShipDto, UpdateShipDto, BulkUpdateShipDto } from '@/types/ship';

export const shipsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all ships
    getAllShips: builder.query<IShip[], void>({
      query: () => '/ships',
      providesTags: ['Ships'],
    }),

    // Get all active ships
    getActiveShips: builder.query<IShip[], void>({
      query: () => '/ships/active',
      providesTags: ['Ships'],
    }),

    // Search ships by item name, spec
    searchShips: builder.query<IShip[], string>({
      query: (searchQuery) => `/ships/search?q=${encodeURIComponent(searchQuery)}`,
      providesTags: ['Ships'],
    }),

    // Get ship by ID
    getShipById: builder.query<IShip, number>({
      query: (id) => `/ships/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Ship', id }],
    }),

    // Get ships by item ID
    getShipsByItem: builder.query<IShip[], number>({
      query: (itemId) => `/ships/by-item/${itemId}`,
      providesTags: ['Ships'],
    }),

    // Get ships by location ID
    getShipsByLocation: builder.query<IShip[], number>({
      query: (locationId) => `/ships/by-location/${locationId}`,
      providesTags: ['Ships'],
    }),

    // Get ships by category ID
    getShipsByCategory: builder.query<IShip[], number>({
      query: (categoryId) => `/ships/by-category/${categoryId}`,
      providesTags: ['Ships'],
    }),

    // Create a new ship
    createShip: builder.mutation<IShip, CreateShipDto>({
      query: (data) => ({
        url: '/ships',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Ships'],
    }),

    // Update a ship
    updateShip: builder.mutation<IShip, { id: number; data: UpdateShipDto }>({
      query: ({ id, data }) => ({
        url: `/ships/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Ship', id },
        'Ships',
      ],
    }),

    // Bulk update ships
    bulkUpdateShips: builder.mutation<IShip[], BulkUpdateShipDto>({
      query: (data) => ({
        url: '/ships/bulk-update',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Ships'],
    }),

    // Delete a ship
    deleteShip: builder.mutation<void, number>({
      query: (id) => ({
        url: `/ships/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Ship', id },
        'Ships',
      ],
    }),
  }),
});

export const {
  useGetAllShipsQuery,
  useGetActiveShipsQuery,
  useSearchShipsQuery,
  useGetShipByIdQuery,
  useGetShipsByItemQuery,
  useGetShipsByLocationQuery,
  useGetShipsByCategoryQuery,
  useCreateShipMutation,
  useUpdateShipMutation,
  useBulkUpdateShipsMutation,
  useDeleteShipMutation,
} = shipsApi;
