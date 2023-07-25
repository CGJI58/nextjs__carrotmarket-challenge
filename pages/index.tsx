import Link from "next/link";

export default function Home() {
  const PROJECTS = ["billionares"];
  return (
    <div className="container">
      <ul>
        {PROJECTS.map((item, index) => (
          <li key={index}>
            <Link href={`/${item}`}>{item}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
