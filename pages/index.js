import Head from "next/head";
import FeaturedPost from "@components/FeaturedPost";
import CardPost from "@components/CardPost";
import Container from "@components/Container";
import Layout from "@components/Layout";

import { useRouter } from "next/router";

export async function getServerSideProps({ query }) {
  const BASE_URL = "http://127.0.0.1:1337";
  const category = query.category || "";

  try {
    const apiUrlFeatured = `${BASE_URL}/api/posts?filters[featured][$eq]=true&populate=author.avatar,category,thumbnail${
      category ? `&filters[category][name][$eq]=${category}` : ""
    }`;

    const apiUrlFalse = `${BASE_URL}/api/posts?filters[featured][$ne]=true&populate=author.avatar,category,thumbnail${
      category ? `&filters[category][name][$eq]=${category}` : ""
    }`;

    const [featuredRes, falseRes] = await Promise.all([fetch(apiUrlFeatured), fetch(apiUrlFalse)]);

    if (!featuredRes.ok || !falseRes.ok) {
      throw new Error("Failed to fetch data");
    }

    const [featuredData, falseData] = await Promise.all([featuredRes.json(), falseRes.json()]);

    const featuredPost = featuredData.data && featuredData.data.length > 0 ? featuredData.data[0] : null;
    const falsePosts = falseData.data || [];

    if (featuredPost) {
      const thumbnail = featuredPost.attributes.thumbnail?.data?.attributes?.url;
      const authorAvatar = featuredPost.attributes.author?.data?.attributes?.avatar?.data?.attributes?.url;

      featuredPost.attributes.thumbnailUrl = thumbnail ? `${BASE_URL}${thumbnail}` : null;
      featuredPost.attributes.authorAvatar = authorAvatar ? `${BASE_URL}${authorAvatar}` : null;
      featuredPost.attributes.date = featuredPost.attributes.createdAt
        ? new Date(featuredPost.attributes.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "Unknown date";
    }

    const processedPosts = falsePosts.map((post) => {
      const thumbnail = post.attributes.thumbnail?.data?.attributes?.url;
      const authorAvatar = post.attributes.author?.data?.attributes?.avatar?.data?.attributes?.url;

      return {
        slug: post.attributes.slug,
        category: post.attributes.category?.data?.attributes?.name || "Uncategorized",
        title: post.attributes.title,
        date: post.attributes.createdAt
          ? new Date(post.attributes.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "Unknown date",
        shortDescription: post.attributes.headline || "No description available",
        thumbnailUrl: thumbnail ? `${BASE_URL}${thumbnail}` : "/placeholder-thumbnail.jpg",
        authorAvatar: authorAvatar ? `${BASE_URL}${authorAvatar}` : "/placeholder-avatar.jpg",
        authorName: post.attributes.author?.data?.attributes?.name || "Unknown",
        authorJob: post.attributes.author?.data?.attributes?.job || "Contributor",
      };
    });

    return {
      props: {
        featured: featuredPost,
        posts: processedPosts,
      },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);

    return {
      props: {
        featured: null,
        posts: [],
      },
    };
  }
}

export default function Home({ featured, posts, categories }) {
  const router = useRouter();
  console.log(categories);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  return (
    <Layout>
      <Head>
        <title>Home &mdash; Epictetus</title>
      </Head>
      <Container>
        {/* nilai fitur = true ygy */}
        {featured ? (
          <FeaturedPost
            category={featured.attributes.category?.data?.attributes?.name}
            title={featured.attributes.title}
            shortDescription={featured.attributes.headline}
            thumbnailUrl={featured.attributes.thumbnailUrl}
            authorAvatar={featured.attributes.authorAvatar}
            authorName={featured.attributes.author?.data?.attributes?.name}
            authorJob={featured.attributes.author?.data?.attributes?.job}
            slug={featured.attributes.slug}
            date={featured.attributes.date}
          />
        ) : (
          <div>No featured post found</div>
        )}

        {/* nilai fitur = false ygy */}
        {posts.length > 0 ? (
          <div className="flex -mx-4 flex-wrap mt-6">
            {posts.map((post) => (
              <div key={post.slug} className="md:w-4/12 w-full px-4 py-6">
                <CardPost
                  slug={post.slug}
                  category={post.category}
                  title={post.title}
                  shortDescription={post.shortDescription}
                  thumbnailUrl={post.thumbnailUrl}
                  authorAvatar={post.authorAvatar}
                  authorName={post.authorName}
                  authorJob={post.authorJob}
                  date={post.date}
                />
              </div>
            ))}
          </div>
        ) : (
          <div>No posts found in this category</div>
        )}
      </Container>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </Layout>
  );
}
