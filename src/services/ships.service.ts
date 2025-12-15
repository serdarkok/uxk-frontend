/**
 * Ship API Service
 */

import type { IShip } from '@/modules/dataTable/Columns';
import { apiClient } from './api';
import type { Ship, CreateShipDto, UpdateShipDto, BulkUpdateShipDto } from '@/types/ship';

const SHIP_ENDPOINT = '/api/ships';

export const shipService = {
  /**
   * Get all ships
   */
  getAll: async (): Promise<IShip[]> => {
    return apiClient.get<IShip[]>(SHIP_ENDPOINT);
  },

  /**
   * Get all active ships
   */
  getActive: async (): Promise<Ship[]> => {
    return apiClient.get<Ship[]>(`${SHIP_ENDPOINT}/active`);
  },

  /**
   * Get a single ship by ID
   */
  getById: async (id: number): Promise<Ship> => {
    return apiClient.get<Ship>(`${SHIP_ENDPOINT}/${id}`);
  },

  /**
   * Get ships by item ID
   */
  getByItem: async (itemId: number): Promise<Ship[]> => {
    return apiClient.get<Ship[]>(`${SHIP_ENDPOINT}/by-item/${itemId}`);
  },

  /**
   * Get ships by location ID
   */
  getByLocation: async (locationId: number): Promise<Ship[]> => {
    return apiClient.get<Ship[]>(`${SHIP_ENDPOINT}/by-location/${locationId}`);
  },

  /**
   * Get ships by category ID
   */
  getByCategory: async (categoryId: number): Promise<Ship[]> => {
    return apiClient.get<Ship[]>(`${SHIP_ENDPOINT}/by-category/${categoryId}`);
  },

  /**
   * Create a new ship
   */
  create: async (data: CreateShipDto): Promise<Ship> => {
    return apiClient.post<Ship>(SHIP_ENDPOINT, data);
  },

  /**
   * Update a ship
   */
  update: async (id: number, data: UpdateShipDto): Promise<Ship> => {
    return apiClient.patch<Ship>(`${SHIP_ENDPOINT}/${id}`, data);
  },

  /**
   * Bulk update ships
   */
  bulkUpdate: async (data: BulkUpdateShipDto): Promise<Ship[]> => {
    return apiClient.post<Ship[]>(`${SHIP_ENDPOINT}/bulk-update`, data);
  },

  /**
   * Delete a ship
   */
  delete: async (id: number): Promise<void> => {
    return apiClient.delete<void>(`${SHIP_ENDPOINT}/${id}`);
  },
};
