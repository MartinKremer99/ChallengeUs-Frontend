import React, { useState } from "react";
import MatchCard from "../Cards/MatchCard";
import axios from "axios";
import { useRouter } from "next/router";
import ConfirmModal from "../Modals/ConfirmModal";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const Bracket = ({ roles, tournamentData, allMatches }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleAdvance = async () => {
    try {
      await axios.put(
        `${process.env.API_URL}/tournament/advanceTournament/${tournamentData[0].tournamentId}`
      );
      toast.success("Tournament advanced");
      router.replace(router.asPath);
      setShowConfirmModal(false);
    } catch (error) {
      if (error?.response.status == 400) {
        toast.error("Not all matches finished");
        setShowConfirmModal(false);
      }
      if (error?.response.status == 401) {
        toast.info("Can not advance anymore");
        setShowConfirmModal(false);
      }
    }
  };

  return (
    <div>
      <ConfirmModal
        show={showConfirmModal}
        close={() => setShowConfirmModal(false)}
        title="Advance tournament?"
        action={handleAdvance}
      />
      {session && (
        <button
          onClick={() => {
            setShowConfirmModal(true);
          }}
          className="button"
        >
          Next Phase
        </button>
      )}

      <div className="flex overflow-x-auto">
        {allMatches.map((match, index) => (
          <div
            className="flex flex-col justify-around"
            key={"matches" + Math.random()}
          >
            {match.map((matches) => (
              <div key={"match" + matches.id}>
                <MatchCard {...matches} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bracket;
