import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const LargeCard = () => {
  const router = useRouter();

  return (
    <section className="relative py-16">
      <div className="relative h-96 min-w-[300px]">
        <Image
          src="/images/large.jpg"
          fill
          className="rounded-2xl object-cover pointer-events-none"
          alt="Picture"
        />
      </div>

      <div className="absolute top-32 left-12 text-white outline-2">
        <h3 className="text-4xl mb-3 w-64  ">Still nothing to your liking?</h3>
        <p>Create your own tournament now</p>

        <button
          onClick={() => router.push("/tournaments/createTournament")}
          className="text-sm text-white bg-gray-900 px-4 py-2 rounded-lg mt-5 cursor-pointer hover:shadow-xl active:scale-90 transition duration-150 ease-out"
        >
          Create Tournament
        </button>
      </div>
    </section>
  );
};

export default LargeCard;
