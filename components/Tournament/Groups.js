import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import MatchCard from "../Cards/MatchCard";
import ConfirmModal from "../Modals/ConfirmModal";

const Groups = ({ tournamentData, allPoolMatches, tournament }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleAdvance = async () => {
    try {
      await axios.put(
        `${process.env.API_URL}/tournament/advanceToBracket/${tournament.id}`
      );
      toast.success("Tournament advanced");
      router.replace(router.asPath);
      setShowConfirmModal(false);
    } catch (error) {
      if (error?.response.status == 400) {
        toast.error("Not all matches finished");
        setShowConfirmModal(false);
      }
    }
  };

  const renderPools = () => {
    let pools = [];
    let firstPool = allPoolMatches[0].poolId;
    for (let i = 0; i < tournament.poolAmount; i++) {
      pools.push(
        <div key={"pool" + allPoolMatches[i].id}>
          <section className="flex-grow pt-14 px-6">
            <h1 className="text-3xl font-semibold mt-2 mb-6">Pool {i + 1}</h1>
            <div className="flex flex-row overflow-auto">
              {allPoolMatches.map((match) => {
                if (firstPool == match.poolId) {
                  return (
                    <div key={"match" + match.id}>
                      <MatchCard {...match} />
                    </div>
                  );
                }
              })}
            </div>
          </section>
        </div>
      );
      firstPool++;
    }
    return pools;
  };
  return (
    <div>
      <ConfirmModal
        show={showConfirmModal}
        close={() => setShowConfirmModal(false)}
        title="Advance to Bracket?"
        action={handleAdvance}
      />
      {!tournament.poolAmount && <div>No Pools available</div>}
      {tournament.poolAmount > 0 && (
        <div>
          {tournamentData.length == 0 && session && (
            <button
              onClick={() => {
                setShowConfirmModal(true);
              }}
              className="button"
            >
              Advance to Bracket
            </button>
          )}

          {renderPools()}
        </div>
      )}
    </div>
  );
};

export default Groups;
