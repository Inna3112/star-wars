import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://swapi.dev/api/'
})

export const starWarsAPI = {
    getPeoples(id?: number, page?: number, search?: string) {
        return instance.get<GetPeopleResponse>('people', {params: {id, page, search}})
    }
}

//types
type GetPeopleResponse = {
    count: number
    next: string
    previous: string | null
    results: PeopleType[]
}
export type PeopleType = {
    name: string
    height: string
    mass: string
    hair_color: string
    skin_color: string
    eye_color: string
    birth_year: string
    gender: string
    homeworld: string
    films: string[]
    species: []
    vehicles: string[]
    starships: string[]
    created: string
    edited: string
    url: string
}