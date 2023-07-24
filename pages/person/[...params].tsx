import Link from "next/link";

interface IInfo {
  name: string;
  netWorth: string;
  industries: string;
  squareImage: string;
  country: string;
  about: string;
}

interface IFinanacialAsset {
  exchange: string;
  currencyCode: string;
  exchangeRate: number;
  numberOfShares: number;
  sharePrice: number;
  ticker: string;
}

export default function Person({ results }: any) {
  console.log(results);
  const {
    name,
    netWorth,
    industries,
    squareImage,
    country,
    about,
    financialAssets,
  } = results;
  const info: IInfo = {
    name,
    netWorth,
    industries,
    squareImage,
    country,
    about,
  };
  return (
    <div className="background">
      <Link href={"/"}>
        <div className="exitIcon">🔙</div>
      </Link>
      <div className="upContainer">
        <img src={info.squareImage} className="image" />
        <div className="name">{info.name}</div>
        <div className="netWorth">{`${Math.round(
          Number(info.netWorth) / 1000
        )} Billions`}</div>
        <div className="country">{`Country: ${country}`}</div>
        <div className="industry">{`Industry: ${industries}`}</div>
        <div className="about">{about}</div>
      </div>
      <div className="downContainer">
        <h3 className="downContainerTitle">Financial Assets</h3>
        <div className="financialAssets">
          {financialAssets?.map((item: IFinanacialAsset, index: number) => (
            <div key={index} className="financialAsset">
              <span>Ticker: {item.ticker}</span>
              <span>Shares: {item.numberOfShares}</span>
              <span>Share Price: ${item.sharePrice}</span>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .background {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background-color: black;
          * {
            color: white;
          }
        }
        .upContainer {
          padding: 20px;
          margin-bottom: 50px;
          background-color: #131b21;
          display: flex;
          flex-direction: column;
          * {
            margin-bottom: 20px;
          }
          .exitIcon {
            width: min-content;
            height: min-content;
            margin: 20px 0;
            padding: 5px;
            border: 1px purple solid;
            border-radius: 50%;
          }
          .image {
            width: 250px;
            height: 250px;
          }
          .name {
            font-size: 24px;
            font-weight: bold;
          }
        }
        .downContainer {
          background-color: #131b21;
          padding: 30px;
          .downContainerTitle {
            font-size: 24px;
            margin-bottom: 10px;
          }
          .financialAssets {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            .financialAsset {
              display: flex;
              flex-direction: column;
              border: 1px solid rgba(255, 255, 255, 0.3);
              border-radius: 10px;
              padding: 10px;
            }
          }
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
