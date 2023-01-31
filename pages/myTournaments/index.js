import axios from "axios";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import MyTournamentCard from "../../components/Cards/MyTournamentCard";

const MyTournaments = ({ myTournamentData }) => {
  const router = useRouter();

  return (
    <div>
      <main>
        <section className="flex-grow pt-14 px-6">
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            {myTournamentData.length} Tournament(s)
          </h1>

          <div className="flex flex-col">
            {myTournamentData.map((tournament) => (
              <div key={tournament.id}>
                <MyTournamentCard {...tournament} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MyTournaments;

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

  let myTournamentData = (
    await axios.get(
      `${process.env.API_URL}/tournament/getAllMyTournaments/${session.id}`
    )
  ).data;

  return {
    props: {
      myTournamentData,
      session,
    },
  };
}
