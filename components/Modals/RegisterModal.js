import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSession } from "next-auth/react";

const RegisterModal = ({ close, show, tournament }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  const handleTeamMembersChange = (e, index) => {
    const newTeamMembers = [...teamMembers];
    newTeamMembers[index] = e.target.value;
    setTeamMembers(newTeamMembers);
  };

  const validateForm = () => {
    return teamName.length > 0 && teamMembers.length == tournament.teamSize;
  };

  const renderTeamMembersFields = () => {
    let teamMembersFields = [];
    for (let i = 0; i < tournament.teamSize; i++) {
      teamMembersFields.push(
        <div key={i} className="w-full px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Player {i + 1} Name:
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            onChange={(e) => handleTeamMembersChange(e, i)}
          />
        </div>
      );
    }
    return teamMembersFields;
  };

  const handleCancel = () => {
    toast.warning("Action canceled");
    close();
  };

  const handleSave = async (event) => {
    event.preventDefault();

    let body = {
      name: teamName,
      members: teamMembers.join(),
      userId: session.id,
    };

    try {
      await fetch(`${process.env.API_URL}/team/addTeam/${tournament.id}`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(body),

        headers: new Headers({
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }),
        withCredentials: true,
        credentials: "same-origin",
      }).then((response) => {
        if (response.status < 300) {
          toast.success("Registered successfully");
          close();
          router.replace(router.asPath);
        } else if (response.status == 400) {
          toast.error("Please provide correct input");
        }
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };

  return (
    <div>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        open={show}
        onClose={close}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0" />

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            ></Dialog.Title>
            <div className="mt-2">
              <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                  <div className="">
                    <div className="relative flex items-center h-10 my-auto">
                      <Image
                        className="mx-auto w-auto object-contain"
                        fill
                        src="/logo.png"
                        alt="ChallengeUs Logo"
                      />
                    </div>

                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                      Register to {tournament.name}
                    </h2>
                  </div>
                  <form className="w-full max-w-lg" onSubmit={handleSave}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Team Name
                        </label>
                        <input
                          value={teamName}
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          type="text"
                          placeholder="A Team"
                          onChange={(e) => setTeamName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      {renderTeamMembersFields()}
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3 mb-6 md:mb-0">
                        <button
                          disabled={!validateForm()}
                          type="submit"
                          className="group relative flex w-full justify-center rounded-md border border-transparent bg-purple-600 py-2 px-4 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 mb-3"
                        >
                          Register to Tournament
                        </button>
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="group relative flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default RegisterModal;
