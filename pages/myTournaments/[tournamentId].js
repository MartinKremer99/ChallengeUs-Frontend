import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Roles from "../../components/MyTournaments/Roles";

const Tournament = (tournamentData) => {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session.data) {
      router.push("/login");
    }
  }, [session, router]);
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
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
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
                  Roles
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
                    <Roles {...tournamentData} />
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
  const tournamentData = (
    await axios.get(
      `${process.env.API_URL}/tournament_user/getAllTournament_UsersFromTournament/${params.tournamentId}`
    )
  ).data;
  return {
    props: {
      tournamentData,
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
