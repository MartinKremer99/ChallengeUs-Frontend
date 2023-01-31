import { TrashIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ConfirmModal from "../Modals/ConfirmModal";

const RoleCard = ({ tournament_user }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    await axios.delete(
      `${process.env.API_URL}/tournament_user/deleteTournament_User/${tournament_user.userId}/${tournament_user.tournamentId}`
    );
    toast.success("User Deleted From Tournament");
    router.replace(router.asPath);
  };

  return (
    <div className="flex py-3 px-2 border-b first:border-t">
      <ConfirmModal
        show={showConfirmModal}
        close={() => setShowConfirmModal(false)}
        title={"Delete User from your Tournament?"}
        action={handleDelete}
      />
      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <div className="">{tournament_user.user.email}</div>
          <TrashIcon
            onClick={() => {
              setShowConfirmModal(true);
            }}
            className="end h-10 text-red-600  cursor-pointer  active:scale-90 transition duration-150 ease-out"
          />
        </div>

        <h4 className="text-xl">{tournament_user.role}</h4>
      </div>
    </div>
  );
};

export default RoleCard;
