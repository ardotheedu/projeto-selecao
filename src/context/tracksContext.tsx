import { createContext, ReactNode, useState, useEffect } from "react"
import { api } from "../services/api";
import Router from "next/router";
import axios from "axios";

type AuthContextData = {
    getTracks(): Promise<void>;
}
type AuthProviderProps = {
    children: ReactNode;
}
export const AuthContext = createContext({} as AuthContextData);


export function AuthProvider({ children }: AuthProviderProps) {

    async function getTracks(){
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

            const tracks = await axios.get(`https://api.spotify.com/v1/recommendations`, {
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

            console.log(tracks)

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <AuthContext.Provider value={{getTracks}}>
            {children}
        </AuthContext.Provider>
    )
}