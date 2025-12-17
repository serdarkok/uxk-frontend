export type IShip = {
  id: number;
  itemId: number;
  shipToTitle: string;
  shipToAddress: string;
  shipFrom: string;
  vendorId: number;
  quantity: number;
  phase: number;
  notes: string;
  locationId: number;
  categoryId: number;
  poApproval: string | null;
  hotelNeedBy: string | null;
  exceptedDelivery: string | null;
  shopsSend: string | null;
  shopsApproved: string | null;
  shopsDelivered: string | null;
  ordered: string | null;
  shipped: string | null;
  delivered: string | null;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  item: {
    id: number;
    name: string;
    description?: string;
    markup: number;
    spec: string;
    price: number;
  };
  location: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  vendor: {
    id: number;
    name: string;
  };
}

export interface CreateShipDto {
  itemId: number;
  shipToTitle: string;
  shipToAddress: string;
  shipFrom: string;
  vendorId: number;
  quantity: number;
  phase: number;
  notes?: string;
  locationId: number;
  categoryId: number;
  poApproval?: string | null;
  hotelNeedBy?: string | null;
  exceptedDelivery?: string | null;
  shopsSend?: string | null;
  shopsApproved?: string | null;
  shopsDelivered?: string | null;
  ordered?: string | null;
  shipped?: string | null;
  delivered?: string | null;
  status?: boolean;
}

export interface UpdateShipDto {
  itemId?: number;
  shipToTitle?: string;
  shipToAddress?: string;
  shipFrom?: string;
  vendorId?: number;
  quantity?: number;
  phase?: number;
  notes?: string;
  locationId?: number;
  categoryId?: number;
  poApproval?: string | null;
  hotelNeedBy?: string | null;
  exceptedDelivery?: string | null;
  shopsSend?: string | null;
  shopsApproved?: string | null;
  shopsDelivered?: string | null;
  ordered?: string | null;
  shipped?: string | null;
  delivered?: string | null;
  status?: boolean;
}

export interface BulkUpdateShipDto {
  ids: number[];
  [key: string]: any;
}
