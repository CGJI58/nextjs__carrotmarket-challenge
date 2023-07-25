import Link from "next/link";

interface IBillionares {
  id: string;
  name: string;
  squareImage: string;
  netWorth: number;
  industries: [string];
}

export default function Home({ results }: any) {
  return (
    <div className="container">
      {results?.map((person: IBillionares) => (
        <Link href={`/billionares/person/${person.id}`} key={person.id}>
          <div className="grid-item">
            <img src={person.squareImage} className="photo" />
            <div className="name">{person.name}</div>
            <div className="details">{`${Math.round(
              person.netWorth / 1000
            )} Billion / ${person.industries}`}</div>
          </div>
        </Link>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background-color: #131b21;
          padding: 20px;
          gap: 20px;
        }
        .grid-item {
          display: flex;
          flex-direction: column;
          * {
            padding: 2px;
            color: white;
          }
          .photo {
            width: 100%;
            height: 100%;
          }
          .name {
            font-weight: bold;
          }
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const results = await (
    await fetch("https://billions-api.nomadcoders.workers.dev/")
  ).json();
  return {
    props: { results },
  };
}
