export type ICategory = {
  id: number;
  name: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryDto {
  name: string;
  status?: boolean;
}

export interface UpdateCategoryDto {
  name?: string;
  status?: boolean;
}