import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import produce from "immer";
import config from "config/config";
import toast from "utils/toast";

const baseQuery = fetchBaseQuery({
  baseUrl: `${config.apiUrl}/api/`,
});

export interface IQueryArgs extends FetchArgs {
  showToast?: boolean;
}

const baseQueryWithToast: BaseQueryFn<IQueryArgs> = async (
  { showToast = true, ...args }: IQueryArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  const response = await baseQuery(args, api, extraOptions);
  let transformedResponse = produce(response, (draft) => {
    if (draft.data) {
      draft.data = (draft.data as any).result as typeof response.data;
    }
  });
  if (transformedResponse.error) {
    const err = (transformedResponse.error as any).data?.error;

    if (showToast) {
      const message =
        err?.message && typeof err?.message === "string"
          ? err.message
          : err.message.message;
      const hasVariable = /{{[^)]*}}/.test(message);
      const variablesValues = hasVariable
        ? {
            ...err.metaData,
          }
        : undefined;

      toast({
        status: "error",
        title: "Error",
        description: message
          ? (message as string, variablesValues)
          : "Oh no, there was an error!",
        isClosable: true,
      });
    }
  }

  return transformedResponse;
};

const api = createApi({
  baseQuery: baseQueryWithToast,
  endpoints: () => ({}),
  tagTypes: ["Proposal"],
});

export default api;
