import React from "react";
import { useUserData } from "../hooks/useUserData";

export const PlayQueue = () => {
  const userData = useUserData();
  const playQueue = userData?.playQueue;

  // TODO: Add react-dnd
  return (playQueue ?
    (<ul>
      {playQueue.map((episodeId) => <li key={episodeId}>{episodeId}</li>)}
    </ul>) : <span>{JSON.stringify(userData)}</span>
  );
};
