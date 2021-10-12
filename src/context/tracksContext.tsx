import { createContext, ReactNode, useState, useEffect } from "react"
import { api } from "../services/api";
import Router from "next/router";
import axios from "axios";

interface Tracks {
    tracks: {
        name: string;
        href: string;
        artists: {
            name: string;
        }[]
        album: {
            imagens: {
                url: string;
            }[]
        }  
    }[]
}

interface TracksListData extends Tracks{
    temperature: string;
    city: string;
    category: string
}

type AuthContextData = {
    getTracks(temperature: string, city: string): Promise<void>;
    data: TracksListData | undefined;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);


export function AuthProvider({ children }: AuthProviderProps) {
    const [data, setData] = useState<TracksListData>()
    async function getTracks(temperature: string, city: string){
        try {
            
            const response = await api.post('/access_token')

            const {access_token} = response.data;

            const pop_artists_seeds = "5D56dZmhE9DgT01XixdHiD,"
            const rock_artists_seeds = "1dfeR4HaWDbWqFHLkxsg1d"
            const classica_artists_seeds = "2wOqMjp9TyABvtHdOSOTUS"
            const lofi_artists_seeds = "4Yccu9UQwMSEegvhhS6tRK"

            const pop_genres_seeds = "pop"
            const rock_genres_seeds = "rock"
            const classica_genres_seeds = "classical"
            const lofi_genres_seeds = "sleep"

            const pop_tracks_seeds = "5y1vdBmkTHZNGCz5qswQzM"
            const rock_tracks_seeds = "1GbtB4zTqAsyfZEsm1RZfx"
            const classica_tracks_seeds = "4bNwPPpk01D8pVV9IFSBde"
            const lofi_tracks_seeds = "3U5vBZK5EKPZPGUK35Bksa"

            

            const response_tracks = await axios.get<Tracks>(`https://api.spotify.com/v1/recommendations`, {
                params: {
                    market: "BR",
                    seed_artists: pop_artists_seeds,
                    seed_genres: pop_genres_seeds,
                    seed_tracks: pop_tracks_seeds
                },
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            
            let dataFormatted: TracksListData = {
                temperature,
                city,
                category: "pop",
                tracks: response_tracks.data.tracks
            }
            console.log(response_tracks.data)
            console.log(dataFormatted)
            setData(dataFormatted)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <AuthContext.Provider value={{getTracks, data}}>
            {children}
        </AuthContext.Provider>
    )
}