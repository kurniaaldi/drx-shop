/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ParamsState = {
  params: Record<string, string>;
  setParams: (name: string, value: string) => void;
  removeParams: (name: string) => void;
  clearParams: () => void;
};

const initialParamsSearch = {
  params: {},
};

export const useParamsStore = create(
  persist<ParamsState>(
    (set: any) => ({
      ...initialParamsSearch,
      setParams: (name: string, value: string) => {
        set((state: any) => ({
          params: { ...state.params, [name]: value },
        }));
      },
      removeParams: (name: string) => {
        set((state: any) => {
          const obj = { ...state.params };
          delete obj[name];

          return {
            params: { ...obj },
          };
        });
      },
      clearParams: () => {
        set(() => ({
          ...initialParamsSearch,
        }));
      },
    }),
    {
      name: "query",
    },
  ),
);
