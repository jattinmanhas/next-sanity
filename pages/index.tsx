import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/header";
import {sanityClient} from "../sanity";
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
