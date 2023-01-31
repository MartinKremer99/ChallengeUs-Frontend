import React, { useState } from "react";
import RoleModal from "../Modals/RoleModal";
import RoleCard from "../Cards/RoleCard";

const Roles = ({ tournamentData }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOnClick = () => {
    setShowModal(true);
  };

  return (
    <div>
      <button className="button mb-5" onClick={handleOnClick}>
        Add Role
      </button>
      <RoleModal show={showModal} close={() => setShowModal(false)} />
      <div className="flex flex-col">
        {tournamentData.map((tournament_user) => (
          <div key={tournament_user.userId + tournament_user.tournamentId}>
            <RoleCard tournament_user={tournament_user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roles;
