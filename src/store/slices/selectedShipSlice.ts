import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IShip } from '@/types/ship';
import type { RootState } from '../store';

interface SelectedShipState {
  selectedShip: IShip | null;
  selectedRows: IShip[];
  drawerType: 'single' | 'bulk' | 'updateTracking';
  isDrawerOpen: boolean;
}

const initialState: SelectedShipState = {
  selectedShip: null,
  selectedRows: [],
  drawerType: 'single',
  isDrawerOpen: false,
};

export const selectedShipSlice = createSlice({
  name: 'selectedShip',
  initialState,
  reducers: {
    setSelectedShip: (state, action: PayloadAction<IShip | null>) => {
      state.selectedShip = action.payload;
      if (action.payload) {
        state.isDrawerOpen = true;
        state.drawerType = 'single';
      }
    },
    updateSelectedShip: (state, action: PayloadAction<Partial<IShip>>) => {
      if (state.selectedShip) {
        state.selectedShip = {
          ...state.selectedShip,
          ...action.payload,
        };
      }
    },
    clearSelectedShip: (state) => {
      state.selectedShip = null;
      state.isDrawerOpen = false;
    },
    setDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
      if (!action.payload) {
        state.selectedShip = null;
      }
    },
    setDrawerType: (state, action: PayloadAction<'single' | 'bulk' | 'updateTracking'>) => {
      state.drawerType = action.payload;
      state.isDrawerOpen = true;
      if (action.payload === 'single' && state.selectedShip) {
        state.selectedShip = null;
      }
    },
    setSelectedRows: (state, action: PayloadAction<IShip[]>) => {
      state.selectedRows = action.payload;
    },
    addSelectedRow: (state, action: PayloadAction<IShip>) => {
      const exists = state.selectedRows.find(row => row.id === action.payload.id);
      if (!exists) {
        state.selectedRows.push(action.payload);
      }
    },
    removeSelectedRow: (state, action: PayloadAction<number>) => {
      state.selectedRows = state.selectedRows.filter(row => row.id !== action.payload);
    },
    clearSelectedRows: (state) => {
      state.selectedRows = [];
      state.isDrawerOpen = false;
    },
  },
});

export const {
  setSelectedShip,
  updateSelectedShip,
  clearSelectedShip,
  setDrawerOpen,
  setDrawerType,
  setSelectedRows,
  addSelectedRow,
  removeSelectedRow,
  clearSelectedRows,
} = selectedShipSlice.actions;

// Selectors
export const selectSelectedShip = (state: RootState) => state.selectedShip.selectedShip;
export const selectDrawerType = (state: RootState) => state.selectedShip.drawerType;
export const selectIsDrawerOpen = (state: RootState) => state.selectedShip.isDrawerOpen;
export const selectSelectedRows = (state: RootState) => state.selectedShip.selectedRows;

export default selectedShipSlice.reducer;
