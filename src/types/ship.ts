/**
 * Ship Types
 */

export interface Ship {
  id: number;
  name: string;
  // Add other ship properties based on your backend model
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateShipDto {
  name: string;
  // Add other required fields
}

export interface UpdateShipDto {
  name?: string;
  // Add other fields that can be updated
}

export interface BulkUpdateShipDto {
  ships: Array<{
    id: number;
    [key: string]: any;
  }>;
}
