import { useContext } from 'react';
import { AuthContext } from '../../context/tracksContext';

export function ListTracks() {

    const {data} = useContext(AuthContext)

    return (
        <div>
          {data?.tracks.map(track => (
              <p>{track.name}</p>
          ))}
        </div>
    )
}