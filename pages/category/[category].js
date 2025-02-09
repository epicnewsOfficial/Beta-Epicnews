import Layout from "@components/Layout";
import Container from "@components/Container";
import CardPost from "@components/CardPost";
import SectionHeader from "@components/SectionHeader";
import Head from "next/head";

export async function getServerSideProps(context) {
  const { category } = context.params;
  const BASE_URL = "http://127.0.0.1:1337";

  try {
    const apiUrl = `${BASE_URL}/api/posts?filters[category][slug][$eq]=${category}&populate=author,thumbnail,category,author.avatar`;
    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    const response = await res.json();
    const posts = response.data.map((post) => {
      const { attributes } = post;
      const thumbnail = attributes.thumbnail?.data?.attributes?.url;
      const author = attributes.author?.data?.attributes || {};
      const authorAvatar = author.avatar?.data?.attributes?.url;
      const date = attributes.createdAt;

      return {
        id: post.id,
        slug: attributes.slug,
        category:
          attributes.category?.data?.attributes?.name || "Uncategorized",
        title: attributes.title,
        date: date ? new Date(date).toLocaleDateString() : "Unknown date",
        shortDescription: attributes.headline || "No description available.",
        thumbnailUrl: thumbnail
          ? `${BASE_URL}${thumbnail}`
          : "/placeholder-thumbnail.jpg",
        authorAvatar: authorAvatar
          ? `${BASE_URL}${authorAvatar}`
          : "/placeholder-avatar.jpg",
        authorName: author.name || "Unknown",
        authorJob: author.job || "Contributor",
      };
    });

    return {
      props: {
        posts,
        category,
      },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      props: {
        posts: [],
        category: category || "Uncategorized",
      },
    };
  }
}

export default function Posts({ posts, category }) {
  return (
    <Layout>
      <Head>
        <title>{category} Posts &mdash; Epictetus</title>
      </Head>
      <Container>
        <SectionHeader>{category}</SectionHeader>
        {!posts.length ? (
          <div className="text-center py-20">
            <h2 className="text-6xl">No result 😥</h2>
            <p className="text-xl mt-4 text-white/60 md:w-6/12 w-full mx-auto">
              We couldn’t find any posts with the specified filters. Please try
              another keyword.
            </p>
          </div>
        ) : (
          <div className="flex -mx-4 flex-wrap mt-6">
            {posts.map((post) => (
              <div key={post.id} className="md:w-4/12 w-full px-4 py-6">
                <CardPost {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </Layout>
  );
}
