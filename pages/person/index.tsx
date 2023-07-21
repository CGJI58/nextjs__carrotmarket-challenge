import Link from "next/link";

export default function Person() {
  return (
    <div className="container">
      <div>This is "person"</div>
      <Link href={"/"}>home</Link>
      <style jsx>{`
        .container {
          background-color: grey;
        }
      `}</style>
    </div>
  );
}
