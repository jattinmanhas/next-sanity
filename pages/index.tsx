import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/header";
import {sanityClient, urlFor} from "../sanity";
import {Post} from "../typing"

interface Props{
    posts: Post[];
}

const Home: NextPage<Props> = ({posts} : Props) => {
    console.log(posts);
  return (
    <div className="">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="flex max-w-7xl mx-auto justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0 text-left">
        <div className="px-10 space-x-5">
          <h1 className="text-6xl font-serif max-w-xl">
            {" "}
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{" "}
            is a place to write, read and connect.
          </h1>
          <h4 className="mt-5 text-lg">
            It's easy and free to post your writings on any topic and connect
            millions of readers.
          </h4>
        </div>
        <img
          className="hidden m-5 md:inline-flex h-32 lg:h-60 "
          src="https://cdn.worldvectorlogo.com/logos/medium-1.svg"
        />
      </div>

      {/* Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-4 md:p-6">
        {posts.map((post) =>(
            <Link key={post._id} href={`/post/${post.slug.current}`}>
                <div className="border rounded-lg group cursor-pointer overflow-hidden">
                    <img className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out" src={urlFor(post.mainImage).url()!} alt="Main Image" />
                    <div className="flex justify-between p-3 bg-white">
                      <div>
                        <p className="font-bold text-lg">{post.title}</p>
                        <p>{post.description} by {post.author.name}</p>
                      </div>

                      <img className="w-12 h-12 rounded-full" src={urlFor(post.author.image).url()!} alt="" />
                    </div>
                </div>
            </Link>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
    const query = `*[_type=="post"]{
        _id,
        title,
        author -> {
          name,
          image
        },
          description,
          mainImage,
          slug
      }`;

      const posts = await sanityClient.fetch(query);

      return{
        props: {
            posts,
        }
      }
}

export default Home;
