import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../baseQuery";
import { api } from "../../endpoints";
import { RenameFileApiProps } from "@/types";

export const renameFileApi = createApi({
   reducerPath: "RenameFile Api",

   baseQuery,

   endpoints: (builder) => ({
      renameFile: builder.mutation({
         query: ({ filename, projectId }: RenameFileApiProps) => ({
            url: api.renameFile + projectId,
            method: "POST",
            body: { filename },
         }),
      }),
   }),
});

export const { useRenameFileMutation } = renameFileApi;
