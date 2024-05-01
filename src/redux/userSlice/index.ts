/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
type UserSliceType = {
  parentPage: string;
  parentPageKey: string;
  childPage: string;
  childPageKey: string;
  data: Record<string, any>;
};

const initialState: UserSliceType = {
  parentPage: '',
  parentPageKey: '',
  childPage: '',
  childPageKey: '',
  data: {},
};

export const UserSlice = createSlice({
  name: 'userStore',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    SET_PARENTPAGE: (
      state,
      action: PayloadAction<{
        parentPage: string;
        parentPageKey: string;
        data: Record<string, any>;
      }>
    ) => {
      const { parentPage, parentPageKey, data } = action.payload;

      /*
       penjelasan:
       -data yang ada di state sebelumnya tetap di simpan dan data baru akan di update
       -update parentPage, parentPageKey dan data. 
       -parentPage adalah halaman utama saat ini
       -parentPageKey adalah key yang akan digunakan untuk menyimpan data dalam object
       -contoh : 
        * halaman utama adalah page user dan memiliki beberapa component seperti list, form add  dan lainnya yang muncul berdasarkan kondisi.
        * jadi parentPage adalah user dan parentPageKey adalah list atau add dan lainnya
        * data akan tersimpan berdasarkan parentPageKey
       - redux bisa disesuaikan contoh berdasarkan page aktif saat ini berdaasarkan menu atau lainnya
      */
      return {
        ...state,
        parentPage,
        parentPageKey,
        data: {
          ...state.data,
          [parentPageKey]: {
            ...state.data[parentPageKey],
            // alasan menggungkan [] , ketika key nya ada spasi, tidak error
            ...data,
          },
        },
      };
    },
    SET_CHILDPAGE: (
      state,
      action: PayloadAction<{
        childPage: string;
        childPageKey: string;
        data: Record<string, any>;
      }>
    ) => {
      const { childPage, childPageKey, data } = action.payload;
      /*
      - melanjutkan kondisi diatas,
      - saat ada beberapa component yang memiliki component lagi maka sesuaikan
      - contoh : halaman utama adalah user dan parentPage adalah add form yang memiliki component lagi seperti form profile, document dan lainnya
      - form profile dan lainnya akan tersimpan di childPage.
      - flow untuk penyimpanan sama seperti diatas
      */
      return {
        ...state,
        childPage,
        childPageKey,
        data: {
          ...state.data,
          [childPageKey]: {
            ...state.data[childPageKey],
            ...data,
          },
        },
      };
    },
  },
});

export const { SET_PARENTPAGE, SET_CHILDPAGE } = UserSlice.actions;

export default UserSlice.reducer;
