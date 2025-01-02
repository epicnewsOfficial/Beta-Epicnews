import Layout from "@components/Layout";
import Container from "@components/Container";
import PostMetaTitle from "@components/PostMetaTitle";
import PostAuthor from "@components/PostAuthor";
import Head from "next/head";
import ReactMarkdown from "react-markdown";

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const BASE_URL = "http://127.0.0.1:1337";

  try {
    const res = await fetch(
      `${BASE_URL}/api/posts?filters[slug][$eq]=${slug}&populate=author.avatar,category,thumbnail`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch post details");
    }

    const response = await res.json();
    const post = response.data[0];

    if (!post) {
      return { notFound: true };
    }

    const attributes = post.attributes;
    return {
      props: {
        post: {
          id: post.id,
          title: attributes.title,
          content: attributes.content,
          date: new Date(attributes.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          thumbnail: attributes.thumbnail?.data?.attributes?.url
            ? `${BASE_URL}${attributes.thumbnail.data.attributes.url}`
            : "/placeholder-thumbnail.jpg",
          author: {
            name: attributes.author?.data?.attributes?.name || "Unknown",
            job: attributes.author?.data?.attributes?.job || "Contributor",
            avatar: attributes.author?.data?.attributes?.avatar?.data
              ?.attributes?.url
              ? `${BASE_URL}${attributes.author.data.attributes.avatar.data.attributes.url}`
              : "/placeholder-avatar.jpg",
          },
          category:
            attributes.category?.data?.attributes?.name || "Uncategorized",
        },
      },
    };
  } catch (error) {
    console.error("Error fetching post details:", error);
    return { notFound: true };
  }
}

export default function Detail({ post }) {
  return (
    <Layout>
      <Head>
        <title>{post.title} &mdash; Epictetus</title>
      </Head>
      <Container>
        <div className="md:w-6/12 w-full mx-auto flex items-center flex-col pt-10">
          <PostMetaTitle
            category={post.category}
            date={post.date}
            title={post.title}
            center
          />
          <PostAuthor
            authorName={post.author.name}
            authorJob={post.author.job}
            authorAvatar={post.author.avatar}
          />
        </div>
        <div className="md:w-10/12 w-full mx-auto my-10">
          <img src={post.thumbnail} className="w-full rounded-lg" />
        </div>
        <div className="md:w-8/12 w-full mx-auto leading-relaxed pb-10">
          <ReactMarkdown className="prose">{post.content}</ReactMarkdown>
        </div>
      </Container>
    </Layout>
  );
}
