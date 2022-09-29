import moment from "moment/moment";
import Link from "next/link";
import {useEffect} from "react";
import {useState} from "react";
import {getSimilarPosts, getRecentPosts} from "../services";

const PostWidget = ({categories, slug}) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((res) => setRelatedPosts(res));
    } else {
      getRecentPosts().then((res) => setRelatedPosts(res));
    }
  }, [slug]);

  return (
    <div className="bg-white shadow-lg p-8 mb-8 rounded-lg">
      <h3 className="txt-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts.map((post) => (
        <div key={post.title} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <img
              src={post.featuredImage.url}
              alt={post.title}
            
              className="align-middle img_author object-cover"
            />
          </div>
          <div className="transition duration-200 flex-grow ml-4 border-b text-indigo-800 hover:text-indigo-400">
            <p className="text-gray-500 font-xs">
              {moment(post.createdAt).format("MMM DD,YYYY")}
            </p>
            <Link href={`/post/${post.slug}`}>{post.title}</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
