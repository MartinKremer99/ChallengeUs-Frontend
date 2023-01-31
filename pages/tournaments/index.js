import axios from "axios";
import React from "react";
import InfoCard from "../../components/Cards/TournamentCard";

const Tournaments = ({ tournamentData }) => {
  return (
    <div>
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            {tournamentData.length} Public Tournament(s)
          </h1>

          <div className="flex flex-col">
            {tournamentData.map((tournament) => (
              <div key={tournament.id}>
                <InfoCard {...tournament} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Tournaments;

export async function getStaticProps() {
  const tournamentData = (
    await axios.get(`${process.env.API_URL}/tournament/getAllPublicTournaments`)
  ).data;

  return {
    props: {
      tournamentData,
    },
    revalidate: 1,
  };
}
