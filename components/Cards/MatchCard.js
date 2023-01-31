import React, { useState } from "react";
import MatchModal from "../Modals/MatchModal";

const MatchCard = (match) => {
  const [showMatchModal, setShowMatchModal] = useState(false);

  const handleOnClick = () => {
    setShowMatchModal(true);
  };

  return (
    <div
      onClick={handleOnClick}
      className="h-max w-max p-4 bg-gray-400 m-2 mt-5  rounded-xl cursor-pointer  hover:scale-105 transition transform duration-200 ease-out"
    >
      {match.finished && (
        <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
          Finished
        </span>
      )}
      <MatchModal
        show={showMatchModal}
        close={() => setShowMatchModal(false)}
        match={match}
      />
      {match.team1.name.includes("PlaceHolder") ? (
        <h2>{"-"}</h2>
      ) : (
        <h2>{match.team1.name}</h2>
      )}
      <h3>vs.</h3>
      {match.team2.name.includes("PlaceHolder") ? (
        <h2>{"-"}</h2>
      ) : (
        <h2>{match.team2.name}</h2>
      )}
    </div>
  );
};

export default MatchCard;
