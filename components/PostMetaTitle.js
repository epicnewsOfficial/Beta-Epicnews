import Link from "next/link";

export default function PostMetaTitle({ category, title, date, center }) {
  return (
    <>
      <h2 className={`text-2xl ${center ? "text-center" : ""}`}>
        <Link legacyBehavior href="/detail">
          <a>{title}</a>
        </Link>
      </h2>
      <div className="flex items-center text-white/60 space-x-4 mt-4">
        <div className="uppercase">{category}</div>
        <span>&bull;</span>
        <div>{date}</div>
      </div>
    </>
  );
}
