import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";

const MatchModal = ({ close, show }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Admin");

  const handleCancel = () => {
    toast.warning("Action canceled");
    close();
  };

  const validateForm = () => {
    return email.length > 0;
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      let userId;
      await axios
        .get(`${process.env.API_URL}/user/getUserWithEmail/${email}`)
        .then((user) => {
          userId = user.data;
        });
      let tournamentId = router.query.tournamentId;
      if (userId) {
        let body = {
          email,
          role,
          userId,
          tournamentId,
        };
        await fetch(
          `${process.env.API_URL}/tournament_user/addTournament_User/`,
          {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(body),

            headers: new Headers({
              "content-type": "application/json",
              "Access-Control-Allow-Origin": "*",
            }),
            withCredentials: true,
            credentials: "same-origin",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            toast.success("User added");
            close();
            router.replace(router.asPath);
          });
      } else {
        toast.error("No User with that Email");
      }
    } catch (error) {
      console.error(error);
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

          <div className="my-8 inline-block max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                      Add to Tournament
                    </h2>
                  </div>
                  <form className="w-full max-w-lg" onSubmit={handleSave}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Email
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          type="email"
                          placeholder="Email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Role
                        </label>

                        <select
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="text"
                          placeholder="Role"
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <option value="Admin">Admin</option>
                          <option value="Scorer">Scorer</option>
                          <option value="Photographer">Photographer</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3 mb-6 md:mb-0">
                        <button
                          disabled={!validateForm()}
                          type="submit"
                          className="group relative flex w-full justify-center rounded-md border border-transparent bg-purple-600 py-2 px-4 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 mb-3"
                        >
                          Add User
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

export default MatchModal;
