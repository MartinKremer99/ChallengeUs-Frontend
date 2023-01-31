import { useSession } from "next-auth/react";
import React, { useState } from "react";
import RegisterModal from "../Modals/RegisterModal";

const TournamentInfo = ({ tournament, allTeams }) => {
  const { data: session } = useSession();

  const [showModal, setShowModal] = useState(false);
  const handleOnClick = () => {
    setShowModal(true);
  };

  return (
    <div>
      <RegisterModal
        tournament={tournament}
        show={showModal}
        close={() => setShowModal(false)}
      />
      {allTeams.length != tournament.tournamentSize && session && (
        <button className="button mb-5" onClick={handleOnClick}>
          Register
        </button>
      )}

      <div className="bg-white rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="font-medium text-lg mb-2">{tournament.name}</div>
          <div className="text-sm text-gray-600 mb-4">
            <span className="font-medium">Sport: </span>
            {tournament.sport}
          </div>
          <div className="text-sm text-gray-600 mb-4">
            <span className="font-medium">Location: </span>
            {tournament.location}
          </div>
          <div className="text-sm text-gray-600 mb-4">
            <span className="font-medium">Start Date: </span>
            {tournament.startDate}
          </div>
          <div className="text-sm text-gray-600 mb-4">
            <span className="font-medium">End Date: </span>
            {tournament.endDate}
          </div>
          <div className="text-sm text-gray-600 mb-4">
            <span className="font-medium">Deadline: </span>
            {tournament.deadline}
          </div>
          <div className="text-sm text-gray-600 mb-4">
            <span className="font-medium">Team Size: </span>
            {tournament.teamSize}
          </div>
          <div className="text-sm text-gray-600 mb-4">
            <span className="font-medium">Pool Amount: </span>
            {tournament.poolAmount}
          </div>

          <div className="text-sm text-gray-600 mb-4">
            <span className="font-medium">Registered Teams: </span>
            {allTeams.length}/{tournament.tournamentSize}
          </div>
          <div className="text-sm text-gray-600 mb-4">
            <span className="font-medium">Tournament Creator: </span>
            {tournament.tournamentCreator.firstName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentInfo;
