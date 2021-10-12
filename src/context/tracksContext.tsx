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
    temperature: number;
    city: string;
    category: string
}

type AuthContextData = {
    getTracks(temperature: number, city: string): Promise<void>;
    data: TracksListData | undefined;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

const pop_artists_seeds = "5D56dZmhE9DgT01XixdHiD"
const rock_artists_seeds = "1dfeR4HaWDbWqFHLkxsg1d"
const classical_artists_seeds = "2wOqMjp9TyABvtHdOSOTUS"
const lofi_artists_seeds = "4Yccu9UQwMSEegvhhS6tRK"

const pop_genres_seeds = "pop"
const rock_genres_seeds = "rock"
const classical_genres_seeds = "classical"
const lofi_genres_seeds = "sleep"

const pop_tracks_seeds = "5y1vdBmkTHZNGCz5qswQzM"
const rock_tracks_seeds = "1GbtB4zTqAsyfZEsm1RZfx"
const classical_tracks_seeds = "4bNwPPpk01D8pVV9IFSBde"
const lofi_tracks_seeds = "3U5vBZK5EKPZPGUK35Bksa"

export function AuthProvider({ children }: AuthProviderProps) {
    const [data, setData] = useState<TracksListData>()
    async function getTracks(temperature: number, city: string){
        try {
            
            const response = await api.post('/access_token')

            const {access_token} = response.data;
            let category = ''
            let seed_artists = ''
            let seed_genres = ''
            let seed_tracks = ''
            
            if(temperature > 32) {
                category = 'rock'
                seed_artists = rock_artists_seeds;
                seed_genres = rock_genres_seeds;
                seed_tracks = rock_tracks_seeds;
            }else if(temperature < 32 && temperature > 24) {
                category = 'pop'
                seed_artists = pop_artists_seeds;
                seed_genres = pop_genres_seeds;
                seed_tracks = pop_tracks_seeds;
            }else if(temperature < 24 && temperature > 16) {
                category = 'classica'
                seed_artists = classical_artists_seeds;
                seed_genres = classical_genres_seeds;
                seed_tracks = classical_tracks_seeds;
            } else if (temperature > 16) {
                category = 'sleep'
                seed_artists = lofi_artists_seeds;
                seed_genres = lofi_genres_seeds;
                seed_tracks = lofi_tracks_seeds;
            }

            const response_tracks = await axios.get<Tracks>(`https://api.spotify.com/v1/recommendations`, {
                params: {
                    market: "BR",
                    seed_artists,
                    seed_genres,
                    seed_tracks,
                },
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            
            let dataFormatted: TracksListData = {
                temperature,
                city,
                category,
                tracks: response_tracks.data.tracks
            }

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