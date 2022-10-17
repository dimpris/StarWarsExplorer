import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Constants from '../../Constants';
import { ResourceListResponse } from './Types';

export const StarWarsAPI = createApi({
    reducerPath: 'StarWarsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: Constants.BaseAPIURL }),
    endpoints: (builder) => ({
        getResources: builder.query<object, string>({
            query: () => ''
        }),
        getResourceItems: builder.query<ResourceListResponse, string>({
            query: (resource) => resource,
            transformResponse: (response: ResourceListResponse, meta, arg) => {
                if (arg === 'films') {
                    for (let i in response.results) {
                        response.results[i].name = response.results[i].title;
                    }
                }

                return response;
            }
        }),
    })
});

export const { useGetResourcesQuery, useGetResourceItemsQuery } = StarWarsAPI;