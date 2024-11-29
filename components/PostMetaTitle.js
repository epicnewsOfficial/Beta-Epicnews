import Link from "next/link";
import InfoPost from "@components/InfoPost";
export default function PostMetaTitle({ category, title, date, center, slug }) {
  return (
    <>
      <div className="flex items-center text-white/60 space-x-4">
        <div className="uppercase">{category}</div>
        <span>&bull;</span>
        <div>{date || "Unknown date"}</div>
      </div>
      <h2 className={`text-2xl mt-4 ${center ? "text-center" : ""}`}>
        <Link href={`/${slug}`}>
          <h2 className="text-xl font-semibold cursor-pointer">{title}</h2>
        </Link>
      </h2>
    </>
  );
}
