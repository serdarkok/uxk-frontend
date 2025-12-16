import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IShip } from '@/types/ship';
import type { RootState } from '../store';

interface SelectedShipState {
  selectedShip: IShip | null;
  isDrawerOpen: boolean;
}

const initialState: SelectedShipState = {
  selectedShip: null,
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
  },
});

export const {
  setSelectedShip,
  updateSelectedShip,
  clearSelectedShip,
  setDrawerOpen,
} = selectedShipSlice.actions;

// Selectors
export const selectSelectedShip = (state: RootState) => state.selectedShip.selectedShip;
export const selectIsDrawerOpen = (state: RootState) => state.selectedShip.isDrawerOpen;

export default selectedShipSlice.reducer;
