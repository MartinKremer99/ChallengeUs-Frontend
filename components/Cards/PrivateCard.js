import React, { useEffect, useState } from "react";
import Image from "next/image";
import { EyeIcon, UsersIcon } from "@heroicons/react/solid";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import ConfirmModal from "../Modals/ConfirmModal";

const PrivateCard = (tournament) => {
  const router = useRouter();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [title, setTitle] = useState("");

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

  const handlePublic = async () => {
    await axios.put(
      `${process.env.API_URL}/tournament/publicTournament/${tournament.id}`
    );
    toast.success("Tournament made public");
    router.replace(router.asPath);
  };

  let action = handlePublic;

  return (
    <div className="flex py-7 px-2 border-b first:border-t">
      <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
        <Image
          onClick={() => router.push(`/tournaments/${tournament.id}`)}
          src={tournament.image}
          alt="ApproveCard"
          fill
          className="object-cover rounded-2xl cursor-pointer"
        />
        <ConfirmModal
          show={showConfirmModal}
          close={() => setShowConfirmModal(false)}
          title={title}
          action={action}
        />
      </div>
      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-end">
          <EyeIcon
            onClick={() => {
              setTitle("Make Tournament public?");
              action = handlePublic;
              setShowConfirmModal(true);
            }}
            className="h-10 cursor-pointer text-green-500  active:scale-90 transition duration-150 ease-out"
          />
        </div>
        <div>{tournament.location}</div>
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

export default PrivateCard;
