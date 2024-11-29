import Link from 'next/link';
import InfoPost from '@components/InfoPost';

export default function FeaturedPost({
  category,
  title,
  shortDescription,
  thumbnailUrl,
  authorAvatar,
  authorName,
  authorJob,
  slug,
  date
}) {
  return (
    <article>
      <div className="flex -mx-4 lg:items-center items-start flex-wrap">
        <div className="px-4 lg:w-8/12 md:w-7/12 w-full">
          {/* Link untuk gambar */}
          <Link href={`/detail/${slug}`}>
            <img
              src={thumbnailUrl || "/featured-thumbnail.png"} // Default jika tidak ada thumbnail
              className="rounded-xl w-full mb-4 md:mb-0"
              alt={title}
            />
          </Link>
        </div>
        <div className="lg:w-4/12 md:w-5/12 w-full px-4">
          {/* Link untuk title */}
          <Link href={`/detail/${slug}`}>
            <h2 className="text-xl font-bold hover:underline">{title}</h2>
          </Link>
          <InfoPost
            category={category}
            date={date}
            shortDescription={shortDescription}
            authorAvatar={authorAvatar || "/default-avatar.png"} // Default jika tidak ada avatar
            authorName={authorName}
            authorJob={authorJob}
          />
        </div>
      </div>
      <hr className="border-white/10 mt-10 md:hidden" />
    </article>
  );
}
