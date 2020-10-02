import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_ROOMS_QUERY } from '../../Graphql';

const LobbyPage = () => {
  const { data: { rooms } = {}, loading } = useQuery(GET_ROOMS_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul>
        {rooms.map((room) => {
          return (
            <li key={room.id}>
              <Link to={`rooms/${room.id}`}> Room /{room.name}/ </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LobbyPage;
