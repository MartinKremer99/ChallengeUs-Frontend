import Image from "next/image";
import React from "react";

function SmallCard(tournament) {
  return (
    <div className="flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out">
      <div className="relative h-16 w-16">
        <Image
          src={tournament.image}
          fill
          className="rounded-lg pointer-events-none"
          alt="Tournament Image"
        />
      </div>

      <div>
        <h2>{tournament.location}</h2>
        <h3 className="text-gray-500">{tournament.startDate}</h3>
      </div>
    </div>
  );
}

export default SmallCard;
