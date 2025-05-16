"use client";

import { useParamsStore } from "@/store/paramsStore";
import { useEffect } from "react";

const useParamsHook = () => {
  const {
    params,
    setParams: setParamsStore,
    removeParams: setRemoveParams,
  } = useParamsStore();

  useEffect(() => {
    const url = new URL(window.location.toString());
    url.searchParams.forEach((value, key) => {
      setParamsStore(key, value);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setParams = (name: string, value: string | number) => {
    const url = new URL(window.location.toString());
    url.searchParams.set(name, value.toString());
    setParamsStore(name, value.toString());
    window.history.replaceState(window.history.state, "", url);
  };

  const removeParams = (
    names: string[] | string,
    newParams?: {
      [key: string]: string;
    },
  ) => {
    const url = new URL(window.location.toString());

    if (Array.isArray(names)) {
      names.forEach((name) => {
        url.searchParams.delete(name);
        setRemoveParams(name);
      });
    } else {
      url.searchParams.delete(names);
      setRemoveParams(names);
    }

    if (newParams) {
      Object.keys(newParams).forEach((key) => {
        url.searchParams.set(key, newParams[key]);
      });
    }

    window.history.replaceState(window.history.state, "", url.toString());
  };

  return { params, setParams, removeParams };
};

export default useParamsHook;
