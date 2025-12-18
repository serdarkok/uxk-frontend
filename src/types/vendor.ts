export type IVendor = {
  id: number;
  name: string;
  address?: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVendorDto {
  name: string;
  address?: string;
  status?: boolean;
}

export interface UpdateVendorDto {
  name?: string;
  address?: string;
  status?: boolean;
}