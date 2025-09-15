import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MatrixState {
  data: any;
  dataEdit: any;
}

const initialState: MatrixState = {
  data: {
    items: [
      {
        id: '1',
        name: 'Core knowledge',
        code: 'MTT12',
        isDefault: true,
        matrixs: [
          {
            id: '1',
            name: 'Chương 1: Hàm số',
            recognition: { count: 5, score: 0.25 },
            understanding: { count: 8, score: 0.5 },
            application: { count: 7, score: 0.75 },
          },
          {
            id: '2',
            name: 'Chương 2: Phương trình',
            recognition: { count: 4, score: 0.25 },
            understanding: { count: 6, score: 0.5 },
            application: { count: 5, score: 0.75 },
          },
        ],
      },
      {
        id: '2',
        name: 'Programming & Algorithms',
        code: 'MTL11',
        isDefault: false,
        matrixs: [
          {
            id: '1',
            name: 'Chương 3: Hàm số',
            recognition: { count: 5, score: 0.25 },
            understanding: { count: 8, score: 0.5 },
            application: { count: 7, score: 0.75 },
          },
          {
            id: '2',
            name: 'Chương 4: Phương trình',
            recognition: { count: 4, score: 0.25 },
            understanding: { count: 6, score: 0.5 },
            application: { count: 5, score: 0.75 },
          },
        ],
      },
      {
        id: '2dfdffds',
        name: 'Systems & Web/Cloud/DevOps',
        code: 'MTL11',
        isDefault: false,
        matrixs: [
          {
            id: '1',
            name: 'Chương 1: Hàm số',
            recognition: { count: 5, score: 0.25 },
            understanding: { count: 8, score: 0.5 },
            application: { count: 7, score: 0.75 },
          },
          {
            id: '2',
            name: 'Chương 2: Phương trình',
            recognition: { count: 4, score: 0.25 },
            understanding: { count: 6, score: 0.5 },
            application: { count: 5, score: 0.75 },
          },
        ],
      },
      { id: 'd2', name: 'Quality & Security', code: 'MTL11', isDefault: false },
      { id: 'as2', name: 'Projects/Design', code: 'MTL11', isDefault: false },
      {
        id: 'v2',
        name: 'Soft skills & Technical English',
        code: 'MTL11',
        isDefault: false,
        matrixs: [
          {
            id: '1',
            name: 'Chương 1: Hàm số',
            recognition: { count: 5, score: 0.25 },
            understanding: { count: 8, score: 0.5 },
            application: { count: 7, score: 0.75 },
          },
          {
            id: '2',
            name: 'Chương 2: Phương trình',
            recognition: { count: 4, score: 0.25 },
            understanding: { count: 6, score: 0.5 },
            application: { count: 5, score: 0.75 },
          },
        ],
      },
    ],
    meta: {
      limit: 10,
      offset: 0,
      total: 6,
      totalPages: 1,
    },
  },
  dataEdit: null,
};

const matrixSlice = createSlice({
  initialState,
  name: 'matrixs',
  reducers: {
    addMatrix: (state, action: PayloadAction<any>) => {
      state.data.items.unshift(action.payload);
      state.data.meta.total = state.data.meta.total + 1;
    },

    setDefault: (state, action: PayloadAction<any>) => {
      state.data.items = state.data.items.map((item: any) =>
        item.id === action.payload.id
          ? {
              ...item,
              isDefault: true,
            }
          : {
              ...item,
              isDefault: false,
            },
      );
    },

    updateMatrix: (state, action: PayloadAction<any>) => {
      const index = state.data.items.findIndex(
        (item: any) => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.data.items[index] = action.payload;
      }
    },

    deleteMatrix: (state, action: PayloadAction<string>) => {
      state.data.items = state.data.items.filter(
        (item: any) => item.id !== action.payload,
      );
      state.data.meta.total = state.data.meta.total - 1;
    },

    editMatrix: (state, action: PayloadAction<any>) => {
      state.dataEdit = action.payload;
    },

    addMatrixSubject: (state, action: PayloadAction<any>) => {
      state.data.items = state.data.items.map((item: any) =>
        item.id === action.payload.id
          ? {
              ...item,
              matrixs: [...item.matrixs, action.payload.data],
            }
          : item,
      );
    },

    updateMatrixSubject: (state, action: PayloadAction<any>) => {
      state.data.items = state.data.items.map((item: any) =>
        item.id === action.payload.id
          ? {
              ...item,
              matrixs: item.matrixs.map((matrix: any) =>
                matrix.id === action.payload.matrixId
                  ? action.payload.data
                  : matrix,
              ),
            }
          : item,
      );
    },

    deleteMatrixSub: (state, action: PayloadAction<any>) => {
      const idx = state.data.items.findIndex(
        (item: any) => item.id === action.payload.id,
      );

      if (idx) {
        state.data.items[idx] = {
          ...state.data.items[idx],
          matrixs: state.data.items[idx].matrixs.filter(
            (item: any) => item.id !== action.payload.matrixId,
          ),
        };
      }
    },
  },
  extraReducers: builder => {
    builder;
  },
});

export default matrixSlice.reducer;
export const {
  addMatrix,
  updateMatrix,
  addMatrixSubject,
  deleteMatrix,
  editMatrix,
  setDefault,
  updateMatrixSubject,
  deleteMatrixSub,
} = matrixSlice.actions;
