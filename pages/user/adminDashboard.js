import axios from "axios";
import { getSession } from "next-auth/react";
import React from "react";
import ApproveCard from "../../components/Cards/ApproveCard";
import PrivateCard from "../../components/Cards/PrivateCard";
import PublicCard from "../../components/Cards/PublicCard";

const AdminDashboard = ({
  unapprovedTournamentData,
  privateTournamentData,
  publicTournamentData,
}) => {
  return (
    <div>
      <main className="">
        <section className="flex-grow pt-14 px-6">
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            {unapprovedTournamentData.length} Unapproved Tournament(s)
          </h1>

          <div className="flex flex-col">
            {unapprovedTournamentData.map((tournament) => (
              <div key={tournament.id}>
                <ApproveCard {...tournament} />
              </div>
            ))}
          </div>
        </section>
        <section className="flex-grow pt-14 px-6">
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            {privateTournamentData.length} Private Tournament(s)
          </h1>

          <div className="flex flex-col">
            {privateTournamentData.map((tournament) => (
              <div key={tournament.id}>
                <PrivateCard {...tournament} />
              </div>
            ))}
          </div>
        </section>
        <section className="flex-grow pt-14 px-6">
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            {publicTournamentData.length} Public Tournament(s)
          </h1>

          <div className="flex flex-col">
            {publicTournamentData.map((tournament) => (
              <div key={tournament.id}>
                <PublicCard {...tournament} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  let unapprovedTournamentData = (
    await axios.get(
      `${process.env.API_URL}/tournament/getAllUnapprovedTournaments`
    )
  ).data;

  let privateTournamentData = (
    await axios.get(
      `${process.env.API_URL}/tournament/getAllPrivateTournaments`
    )
  ).data;

  let publicTournamentData = (
    await axios.get(`${process.env.API_URL}/tournament/getAllPublicTournaments`)
  ).data;

  return {
    props: {
      session,
      unapprovedTournamentData,
      privateTournamentData,
      publicTournamentData,
    },
  };
}
