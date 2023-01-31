import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Image from "next/image";
import { DateRange } from "react-date-range";
import { useSession } from "next-auth/react";

const EditTournamentModal = ({ close, show, tournament }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [name, setName] = useState(tournament.name);
  const [location, setLocation] = useState(tournament.location);
  const [startDate, setStartDate] = useState(new Date(tournament.startDate));
  const [endDate, setEndDate] = useState(new Date(tournament.endDate));
  const [deadLine, setDeadLine] = useState(
    Math.round(
      (new Date(tournament.endDate) - new Date(tournament.startDate)) / 86400000
    )
  );
  const [tournamentSize, setTournamentSize] = useState(
    tournament.tournamentSize
  );
  const [poolSize, setPoolSize] = useState(tournament.poolSize);
  const [sport, setSport] = useState(tournament.sport);
  const [teamSize, setTeamSize] = useState(tournament.teamSize);

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const openDateRange = () => {
    if (!visible) setVisible(true);
  };

  const closeDateRange = () => {
    if (visible) {
      setTimeout(() => {
        setVisible(false);
      }, "500");
    }
  };

  const [visible, setVisible] = useState(false);

  const handleCancel = () => {
    toast.warning("Action canceled");
    close();
  };

  const validateForm = () => {
    return name.length > 0 && location.length > 0 && sport.length > 0;
  };

  const handleSave = async (event) => {
    event.preventDefault();
    let copyStartDate = new Date(startDate);
    let newDeadLine = copyStartDate.setDate(copyStartDate.getDate() - deadLine);
    let body = {
      name,
      startDate,
      endDate,
      deadline: newDeadLine,
      tournamentSize,
      poolAmount: poolSize,
      location,
      sport,
      teamSize,
      userId: session.id,
    };

    try {
      await fetch(
        `http://88.208.226.157:8080/tournament/putTournament/${tournament.id}`,
        {
          method: "PUT",
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
          toast.success("Tournament saved");
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
                      Change Tournament
                    </h2>
                  </div>
                  <form className="w-full max-w-lg" onSubmit={handleSave}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Tournament Name
                        </label>
                        <input
                          value={name}
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          type="text"
                          placeholder="ChallengeUs Cup"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Location
                        </label>
                        <input
                          value={location}
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="text"
                          placeholder="Stade de Luxembourg"
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Start Date
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          type="text"
                          onFocus={openDateRange}
                          value={startDate.toLocaleDateString()}
                          readOnly={true}
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          End Date
                        </label>
                        <input
                          onFocus={openDateRange}
                          value={endDate.toLocaleDateString()}
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="text"
                          readOnly={true}
                        />
                      </div>
                      {visible && (
                        <div onBlur={closeDateRange}>
                          <DateRange
                            color="#ba3bdc"
                            ranges={[selectionRange]}
                            minDate={new Date()}
                            rangeColors={["#ba3bdc"]}
                            onChange={handleSelect}
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Deadline
                        </label>
                        <h1>How many days before Start Date</h1>
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Deadline
                        </label>
                        <input
                          value={deadLine}
                          onChange={(e) => setDeadLine(e.target.value)}
                          type="number"
                          min={1}
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Tournament Size
                        </label>
                        <select
                          value={tournamentSize}
                          onChange={(e) => setTournamentSize(e.target.value)}
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        >
                          <option value={2}>2 Teams</option>
                          <option value={4}>4 Teams</option>
                          <option value={8}>8 Teams</option>
                          <option value={16}>16 Teams</option>
                          <option value={32}>32 Teams</option>
                          <option value={64}>64 Teams</option>
                          <option value={128}>128 Teams</option>
                        </select>
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Pool Size
                        </label>
                        <select
                          value={poolSize}
                          onChange={(e) => setPoolSize(e.target.value)}
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        >
                          <option value={0}>0 Pools</option>
                          <option value={2}>2 Pools</option>
                          <option value={4}>4 Pools</option>
                          <option value={8}>8 Pools</option>
                          <option value={16}>16 Pools</option>
                          <option value={32}>32 Pools</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Sport
                        </label>
                        <input
                          value={sport}
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          type="text"
                          placeholder="Basketball"
                          onChange={(e) => setSport(e.target.value)}
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Team Size
                        </label>
                        <input
                          value={teamSize}
                          onChange={(e) => setTeamSize(e.target.value)}
                          type="number"
                          min={1}
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3 mb-6 md:mb-0">
                        <button
                          disabled={!validateForm()}
                          type="submit"
                          className="group relative flex w-full justify-center rounded-md border border-transparent bg-purple-600 py-2 px-4 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 mb-3"
                        >
                          Save Tournament
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

export default EditTournamentModal;
