import Image from "next/image";
import React, { useEffect, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/solid";
import { LogoutIcon } from "@heroicons/react/outline";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = ({ placeholder }) => {
  const router = useRouter();

  const [navigation, setNavigation] = useState(false);

  const { data: session } = useSession();

  const handleNavigation = () => {
    setNavigation(!navigation);
  };

  const closeNavigation = () => {
    setNavigation(false);
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", (url, { shallow }) => {
      closeNavigation();
    });
  }, []);

  return (
    <header className="sticky top-0 z-50 grid grid-cols-2 bg-white shadow-md p-5 md:px-10">
      <div className="relative flex items-center h-10 my-auto">
        <Image
          onClick={() => router.push("/")}
          src="/logo.png"
          fill
          className="object-contain object-left cursor-pointer"
          sizes="33vw"
          alt="ChallengeUs"
        />
      </div>

      <div className="flex items-center space-x-4 justify-end text-gray-500">
        <div
          onClick={() => {
            handleNavigation();
          }}
          className="flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer hover:shadow-xl active:scale-90 transition duration-150 ease-out"
        >
          <UserCircleIcon className="h-8" />
        </div>

        {session && (
          <div
            onClick={() => {
              signOut();
            }}
            className="flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer hover:shadow-xl active:scale-90 transition duration-150 ease-out"
          >
            <LogoutIcon className="h-8" />
          </div>
        )}
      </div>

      {navigation && (
        <div className="col-span-3 mx-auto gap-y-10 py-5  text-gray-600">
          <div className="text-center space-y-2 text-gray-800">
            <h2 className="font-bold border-b pb-3">ChallengeUs</h2>
            <ul className="space-y-2">
              <li key="tournaments">
                <Link href="/tournaments">Tournaments</Link>
              </li>
            </ul>
            {!session && (
              <ul className="space-y-2">
                <li key="register">
                  <Link href="/register">Register</Link>
                </li>
                <li key="login">
                  <button
                    onClick={() => {
                      signIn();
                    }}
                  >
                    Login
                  </button>
                </li>
              </ul>
            )}
            {session && (
              <ul className="space-y-2">
                <li key="createTournament">
                  <Link href="/tournaments/createTournament">
                    Create Tournament
                  </Link>
                </li>
                <li key="myTournaments">
                  <Link href="/myTournaments">My Tournaments</Link>
                </li>
              </ul>
            )}
            {session?.isAdmin && (
              <ul className="space-y-2">
                <li key="adminDashboard">
                  <Link href="/user/adminDashboard">Admin Dashboard</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
