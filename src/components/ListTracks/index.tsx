import { useContext } from 'react';
import { AuthContext, TracksListData } from '../../contexts/tracksContext';

export interface TracksListDataSaved extends TracksListData {
    savedAt: string;
}

export function ListTracks() {

    const {data} = useContext(AuthContext)
    const saveRecomedations = () => {
        const recomendacoes = localStorage.getItem("recomendacoes");
        if (recomendacoes) {
            const newData: TracksListDataSaved = {
                ...data,
                savedAt: new Date().toISOString(),
            }
            console.log(newData)
            const recomendacoesArray = JSON.parse(recomendacoes);
            recomendacoesArray.push(newData);
            localStorage.setItem("recomendacoes", JSON.stringify(recomendacoesArray));
        } else {
            localStorage.setItem("recomendacoes", JSON.stringify([data]));
        }
    }
    if (data.tracks === undefined) {
        return (
            <div></div>
        )
    }
    return (
        <div>
            <div>
                <h1>Musicas recomendadas</h1>
                <button onClick={saveRecomedations}>Salvar</button>
            </div>
            {data.tracks.map(track => (
                <>
                    <p key={track.name}>{track.name}</p>
                </>
            ))}
        </div>
    )
}