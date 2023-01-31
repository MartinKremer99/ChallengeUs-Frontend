import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Banner = () => {
  const router = useRouter();

  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
      <Image
        src="/images/banner.jpg"
        fill
        className="object-cover pointer-events-none"
        alt="Image"
      />
      <div className="absolute top-1/2 w-full text-center">
        <p className="text-sm sm:text-lg font-semibold text-white">
          Not sure what to play?
        </p>
        <button
          onClick={() =>
            router.push({
              pathname: "/tournaments",
            })
          }
          className="text-purple-500 bg-white px-10 py-4 shadow-md rounded-full font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150"
        >
          All Tournaments
        </button>
      </div>
    </div>
  );
};

export default Banner;
