import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Constants from '../../Constants';
import { 
    ResourceListResponse, 
    PeopleDetails, 
    PlanetDetails,
    FilmDetails,
    SpeciesDetails,
    VehiclesDetails,
    StarshipsDetails,
} from './Types';

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
                for (let i in response.results) {
                    if (arg.indexOf('films') == 0) {
                        response.results[i].name = response.results[i].title;
                    }

                    let type = arg.includes('?') ? arg.split('?')[0] : arg;

                    response.results[i].type = type;
                }

                return response;
            }
        }),
        getPeopleDetails: builder.query<PeopleDetails, number>({
            query: (id) => ('/people/' + id)
        }),
        getPlanetsDetails: builder.query<PlanetDetails, number>({
            query: (id) => ('/planets/' + id)
        }),
        getFilmsDetails: builder.query<FilmDetails, number>({
            query: (id) => ('/films/' + id)
        }),
        getSpeciesDetails: builder.query<SpeciesDetails, number>({
            query: (id) => ('/species/' + id)
        }),
        getVehiclesDetails: builder.query<VehiclesDetails, number>({
            query: (id) => ('/vehicles/' + id)
        }),
        getStarshipsDetails: builder.query<StarshipsDetails, number>({
            query: (id) => ('/starships/' + id)
        }),
    })
});

export const { 
    useGetResourcesQuery, 
    useGetResourceItemsQuery,
    useGetPeopleDetailsQuery,
    useGetPlanetsDetailsQuery,
    useGetFilmsDetailsQuery,
    useGetSpeciesDetailsQuery,
    useGetVehiclesDetailsQuery,
    useGetStarshipsDetailsQuery,
} = StarWarsAPI;