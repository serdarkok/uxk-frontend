/**
 * Ship API Service
 */

import { apiClient } from './api';
import type { IShip, CreateShipDto, UpdateShipDto, BulkUpdateShipDto } from '@/types/ship';

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
  getActive: async (): Promise<IShip[]> => {
    return apiClient.get<IShip[]>(`${SHIP_ENDPOINT}/active`);
  },

  /**
   * Get a single ship by ID
   */
  getById: async (id: number): Promise<IShip> => {
    return apiClient.get<IShip>(`${SHIP_ENDPOINT}/${id}`);
  },

  /**
   * Get ships by item ID
   */
  getByItem: async (itemId: number): Promise<IShip[]> => {
    return apiClient.get<IShip[]>(`${SHIP_ENDPOINT}/by-item/${itemId}`);
  },

  /**
   * Get ships by location ID
   */
  getByLocation: async (locationId: number): Promise<IShip[]> => {
    return apiClient.get<IShip[]>(`${SHIP_ENDPOINT}/by-location/${locationId}`);
  },

  /**
   * Get ships by category ID
   */
  getByCategory: async (categoryId: number): Promise<IShip[]> => {
    return apiClient.get<IShip[]>(`${SHIP_ENDPOINT}/by-category/${categoryId}`);
  },

  /**
   * Create a new ship
   */
  create: async (data: CreateShipDto): Promise<IShip> => {
    return apiClient.post<IShip>(SHIP_ENDPOINT, data);
  },

  /**
   * Update a ship
   */
  update: async (id: number, data: UpdateShipDto): Promise<IShip> => {
    return apiClient.patch<IShip>(`${SHIP_ENDPOINT}/${id}`, data);
  },

  /**
   * Bulk update ships
   */
  bulkUpdate: async (data: BulkUpdateShipDto): Promise<IShip[]> => {
    return apiClient.post<IShip[]>(`${SHIP_ENDPOINT}/bulk-update`, data);
  },

  /**
   * Delete a ship
   */
  delete: async (id: number): Promise<void> => {
    return apiClient.delete<void>(`${SHIP_ENDPOINT}/${id}`);
  },
};
