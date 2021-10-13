import { useContext } from 'react';
import { AuthContext } from '../../context/tracksContext';

export function ListTracks() {

    const {data} = useContext(AuthContext)
    const saveRecomedations = () => {
        const recomendacoes = localStorage.getItem("recomendacoes");
        if (recomendacoes) {
            const recomendacoesArray = JSON.parse(recomendacoes);
            recomendacoesArray.push(data);
            localStorage.setItem("recomendacoes", JSON.stringify(recomendacoesArray));
        } else {
            localStorage.setItem("recomendacoes", JSON.stringify([data]));
        }
    }
    return (
        <div>
            <div>
                <h1>Musicas recomendadas</h1>
                <button onClick={saveRecomedations}>Salvar</button>
            </div>
            {data?.tracks.map(track => (
                <>
                    <p key={track.name}>{track.name}</p>
                </>
            ))}
        </div>
    )
}