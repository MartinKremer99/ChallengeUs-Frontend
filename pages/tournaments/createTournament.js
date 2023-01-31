import React, { useState } from "react";
import Image from "next/image";
import { DateRange } from "react-date-range";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { toast } from "react-toastify";

const CreateTournament = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [deadLine, setDeadLine] = useState(1);
  const [tournamentSize, setTournamentSize] = useState(4);
  const [poolSize, setPoolSize] = useState(0);
  const [sport, setSport] = useState("");
  const [teamSize, setTeamSize] = useState(1);

  const { data: session } = useSession();

  const validateForm = () => {
    return name.length > 0 && location.length > 0 && sport.length > 0;
  };

  const [visible, setVisible] = useState(false);

  const router = useRouter();

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const makePoolSize = () => {
    return tournamentSize / 4;
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const openDateRange = () => {
    console.log(poolSize);
    if (!visible) setVisible(true);
  };

  const closeDateRange = () => {
    if (visible) {
      setTimeout(() => {
        setVisible(false);
      }, "500");
    }
  };

  const handleSubmit = async (event) => {
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
      await fetch(`${process.env.API_URL}/tournament/addTournament`, {
        method: "POST",
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
          toast.success("Tournament created");
          router.push({ pathname: "/myTournaments" });
        });
    } catch (error) {
      if (error.response) {
        toast.error("Something went wrong");
        console.log(error.response);
      }
    }
  };

  return (
    <div>
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
              Create your tournament
            </h2>
          </div>
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
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
                  Tournament Size
                </label>
                <select
                  value={tournamentSize}
                  onChange={(e) => setTournamentSize(e.target.value)}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
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
                  <option value={makePoolSize()}>{makePoolSize()} Pools</option>
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
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Start Date
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={startDate.toLocaleDateString()}
                  onFocus={openDateRange}
                  readOnly={true}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  End Date
                </label>
                <input
                  onFocus={openDateRange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  value={endDate.toLocaleDateString()}
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
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Deadline before Start
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
              <div className="w-full px-3 mb-6 md:mb-0">
                <button
                  disabled={!validateForm()}
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-purple-600 py-2 px-4 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Create Tournament
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTournament;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
