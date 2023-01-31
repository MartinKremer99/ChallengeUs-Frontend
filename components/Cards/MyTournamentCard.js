import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TrashIcon, PencilAltIcon, UsersIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useRouter } from "next/router";
import EditTournamentModal from "../Modals/EditTournamentModal";
import ConfirmModal from "../Modals/ConfirmModal";
import { toast } from "react-toastify";

const MyTournamentCard = (tournament) => {
  const router = useRouter();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openEditModal = () => {
    setShowEditModal(true);
  };

  const openConfirmModal = () => {
    setShowConfirmModal(true);
  };

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

  const handleDelete = async () => {
    await axios.delete(
      `${process.env.API_URL}/tournament/deleteTournament/${tournament.id}`
    );
    toast.success("Tournament deleted");
    router.replace(router.asPath);
  };

  return (
    <div className="flex py-7 px-2 border-b first:border-t">
      <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
        <Image
          onClick={() => router.push(`/myTournaments/${tournament.id}`)}
          src={tournament.image}
          alt="ApproveCard"
          fill
          className="object-cover rounded-2xl cursor-pointer"
        />
        <EditTournamentModal
          show={showEditModal}
          close={() => setShowEditModal(false)}
          tournament={tournament}
        />
        <ConfirmModal
          show={showConfirmModal}
          close={() => setShowConfirmModal(false)}
          title="Delete Tournament?"
          action={handleDelete}
        />
      </div>
      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-end">
          <PencilAltIcon
            onClick={openEditModal}
            className="h-10 text-green-600  cursor-pointer  active:scale-90 transition duration-150 ease-out"
          />
          <TrashIcon
            onClick={openConfirmModal}
            className="h-10 text-red-600  cursor-pointer  active:scale-90 transition duration-150 ease-out"
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

export default MyTournamentCard;
