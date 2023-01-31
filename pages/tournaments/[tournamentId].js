import axios from "axios";
import React, { useState } from "react";
import Bracket from "../../components/Tournament/Bracket";
import Groups from "../../components/Tournament/Groups";
import TournamentInfo from "../../components/Tournament/TournamentInfo";

const Tournament = (props) => {
  const [openTab, setOpenTab] = useState(1);
  return (
    <div>
      <div>
        <div className="flex flex-wrap">
          <div className="w-full">
            <ul
              className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
              role="tablist"
            >
              <li
                key="information"
                className="-mb-px mr-2 last:mr-0 flex-auto text-center"
              >
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 1
                      ? "text-white bg-purple-600"
                      : "text-purple-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  Information
                </a>
              </li>
              <li
                key="pools"
                className="-mb-px mr-2 last:mr-0 flex-auto text-center"
              >
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 2
                      ? "text-white bg-purple-600"
                      : "text-purple-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  Pools
                </a>
              </li>
              <li
                key="bracket"
                className="-mb-px mr-2 last:mr-0 flex-auto text-center"
              >
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 3
                      ? "text-white bg-purple-600"
                      : "text-purple-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  Bracket
                </a>
              </li>
            </ul>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="px-4 py-5 flex-auto">
                <div className="tab-content tab-space">
                  <div
                    className={openTab === 1 ? "block" : "hidden"}
                    id="link1"
                  >
                    <TournamentInfo {...props} />
                  </div>
                  <div
                    className={openTab === 2 ? "block" : "hidden"}
                    id="link2"
                  >
                    <Groups {...props} />
                  </div>
                  <div
                    className={openTab === 3 ? "block" : "hidden"}
                    id="link3"
                  >
                    <Bracket {...props} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tournament;

export async function getStaticProps({ params }) {
  const tournament = (
    await axios.get(
      `${process.env.API_URL}/tournament/getTournament/${params.tournamentId}`
    )
  ).data;

  const allTeams = (
    await axios.get(
      `${process.env.API_URL}/team/getAllTeamsFromTournament/${params.tournamentId}`
    )
  ).data;

  const tournamentData = (
    await axios.get(
      `${process.env.API_URL}/match/getAllMatchesFromTournament/${params.tournamentId}`
    )
  ).data;
  let phases = Math.log2(tournamentData[0]?.matchTournament.tournamentSize);
  let allMatches = [];
  for (let i = 1; i <= phases; i++) {
    let matches = (
      await axios.get(
        `${process.env.API_URL}/match/getAllMatchesFromPhase/${i}/FromTournament/${tournamentData[0].tournamentId}`
      )
    ).data;
    allMatches.push(matches);
  }

  const allPoolMatches = (
    await axios.get(
      `${process.env.API_URL}/match/getAllMatchesFromPoolPhase/${params.tournamentId}`
    )
  ).data;

  const roles = (
    await axios.get(
      `${process.env.API_URL}/tournament_user/getAllTournament_UsersFromTournament/${params.tournamentId}`
    )
  ).data;

  return {
    props: {
      tournamentData,
      allMatches,
      tournament,
      allTeams,
      allPoolMatches,
      roles,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  let paths = [];
  try {
    const publicTournaments = (
      await axios.get(`${process.env.API_URL}/tournament/getAllTournaments`)
    ).data;
    paths = publicTournaments.map((tournament) => ({
      params: { tournamentId: tournament.id.toString() },
    }));
  } catch (err) {
    console.error(err);
  }
  return { paths, fallback: false };
}
