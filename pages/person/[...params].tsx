import Link from "next/link";

interface IInfo {
  name: string;
  netWorth: string;
  industries: string;
  squareImage: string;
  country: string;
  about: string;
}

export default function Person({ results }: any) {
  const { name, netWorth, industries, squareImage, country, about } = results;
  const info: IInfo = {
    name,
    netWorth,
    industries,
    squareImage,
    country,
    about,
  };
  return (
    <div className="container">
      <Link href={"/"}>🔙</Link>
      <img src={info.squareImage} />
      <div>{info.name}</div>
      <div>{`${Math.round(Number(info.netWorth) / 1000)} Billions`}</div>
      <div>{`Country: ${country}`}</div>
      <div>{`Industry: ${industries}`}</div>
      <div>{about}</div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps({ params: { params } }: any) {
  const id = params[0].toString();
  const results = await (
    await fetch(`https://billions-api.nomadcoders.workers.dev/person/${id}`)
  ).json();
  return {
    props: { results },
  };
}
