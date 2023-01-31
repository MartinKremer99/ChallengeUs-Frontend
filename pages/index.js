import Banner from "../components/Design/Banner";
import axios from "axios";
import SmallCard from "../components/Cards/SmallCard";
import LargeCard from "../components/Cards/LargeCard";
import { useRouter } from "next/router";

export default function Home({ publicTournaments }) {
  const router = useRouter();

  return (
    <div className="">
      <Banner />
      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">
            Best public tournaments
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {publicTournaments?.map((tournament) => (
              <div
                key={tournament.id}
                onClick={() => router.push(`/tournaments/${tournament.id}`)}
              >
                <SmallCard {...tournament} />
              </div>
            ))}
          </div>
        </section>
        <LargeCard />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const baseURL = process.env.API_URL;
  const publicTournaments = (
    await axios.get(baseURL + "/tournament/getAllPublicTournaments")
  ).data;

  return {
    props: {
      publicTournaments,
    },
    revalidate: 1,
  };
}
