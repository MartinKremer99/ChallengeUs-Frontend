import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UsersIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import axios from "axios";

const InfoCard = (tournament) => {
  const [registered, setRegistered] = useState(null);

  useEffect(() => {
    getRegisteredTeams();
  }, []);

  const getRegisteredTeams = async () => {
    const allTeams = (
      await axios.get(
        `${process.env.API_URL}/team/getAllTeamsFromTournament/${tournament.id}`
      )
    ).data;
    setRegistered(allTeams.length);
  };
  const router = useRouter();
  return (
    <div className="flex py-7 px-2 border-b first:border-t">
      <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0 cursor-pointer">
        <Image
          onClick={() => router.push(`/tournaments/${tournament.id}`)}
          src={tournament.image}
          alt="InfoCard"
          fill
          className="object-cover rounded-2xl"
        />
      </div>
      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <div>{tournament.location}</div>
        </div>
        <h4 className="text-xl">{tournament.name}</h4>
        <div className="border-b w-10 pt-2" />
        <p className="pt-2 text-sm text-gray-500 flex-grow">
          {tournament.deadline}
        </p>

        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center">
            <UsersIcon className="h-5 text-purple-400 pr-2" />
            {registered}/{tournament.tournamentSize}
          </p>
          <div>
            <p className="text-lg font-semibold pb-2 lg:text-2xl">
              {tournament.sport}
            </p>
            <p className="text-right font-extralight">
              Team Size: {tournament.teamSize}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
