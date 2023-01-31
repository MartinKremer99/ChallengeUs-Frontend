import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const MatchModal = ({ close, show, match }) => {
  const router = useRouter();
  const [score1, setScore1] = useState(match.score1);
  const [score2, setScore2] = useState(match.score2);

  const { data: session } = useSession();
  const handleCancel = () => {
    toast.warning("Action canceled");
    close();
  };

  const handleFinish = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`${process.env.API_URL}/match/finishMatch/${match.id}`);
      toast.success("Match finished");
      close();
      router.replace(router.asPath);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();

    let body = {
      score1,
      score2,
    };

    try {
      await fetch(`${process.env.API_URL}/match/putMatch/${match.id}`, {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(body),

        headers: new Headers({
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }),
        withCredentials: true,
        credentials: "same-origin",
      })
        .then((response) => response.json())
        .then((data) => {
          toast.success("Match score saved");
          close();
          router.replace(router.asPath);
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
                    {match.finished && (
                      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Match finished
                      </h2>
                    )}
                    {!match.finished && session && (
                      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Put in Score
                      </h2>
                    )}
                    {!session && !match.finished && (
                      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Ongoing Score
                      </h2>
                    )}
                  </div>
                  <form className="w-full max-w-lg" onSubmit={handleSave}>
                    <div className="flex flex-wrap -mx-3 mb-6 w-max">
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          {match.team1.name}
                        </label>
                        <input
                          value={score1}
                          min={0}
                          disabled={match.finished || !session}
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          type="number"
                          placeholder="Score 1"
                          onChange={(e) => setScore1(e.target.value)}
                        />
                      </div>

                      <div className="w-full md:w-1/3 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          {match.team2.name}
                        </label>

                        <input
                          value={score2}
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="number"
                          disabled={match.finished || !session}
                          min={0}
                          placeholder="Score 2"
                          onChange={(e) => setScore2(e.target.value)}
                        />
                      </div>
                    </div>
                    {!match.finished && session && (
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-0">
                          <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-purple-600 py-2 px-4 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 mb-3"
                          >
                            Save Scores
                          </button>
                          <button
                            type="button"
                            onClick={handleFinish}
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mb-3"
                          >
                            Finish Match
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
                    )}
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
