export type ILocation = {
  id: number;
  name: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLocationDto {
  name: string;
  status?: boolean;
}

export interface UpdateLocationDto {
  name?: string;
  status?: boolean;
}