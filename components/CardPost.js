import Link from "next/link";
import InfoPost from "@components/InfoPost";

export default function CardPost({
  thumbnailUrl,
  slug,
  category,
  title,
  shortDescription,
  authorAvatar,
  authorName,
  authorJob,
  date,
}) {
  return (
    <article>
      {/* Link untuk gambar */}
      <Link href={`/detail/${slug}`}>
        <img
          src={thumbnailUrl || "/placeholder-thumbnail.jpg"} // Fallback jika thumbnail tidak ada
          className="w-full rounded mb-4"
          alt={title}
        />
      </Link>

      {/* Link untuk title */}
      <Link href={`/detail/${slug}`}>
        <h2 className="text-xl font-bold hover:underline">{title}</h2>
      </Link>

      {/* InfoPost tanpa title */}
      <InfoPost
        category={category}
        date={date} // Pastikan tanggal disertakan jika diperlukan
        shortDescription={shortDescription}
        authorAvatar={authorAvatar || "/default-avatar.png"} // Default jika tidak ada avatar
        authorName={authorName}
        authorJob={authorJob}
      />
    </article>
  );
}
