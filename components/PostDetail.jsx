import React from "react";
import moment from "moment/moment";

function PostDetail({post}) {

  const getContentFragment = (idx, text, obj, type) => {
    let modifiedText = text;
    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={idx}>text</b>;
      }
      if (obj.italic) {
        modifiedText = <i key={idx}>{text}</i>;
      }
      if (obj.underline) {
        modifiedText = <u key={idx}>{text}</u>;
      }
    }
    switch (type) {
      case "heading-three":
        return (
          <h3 key={idx} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={idx} className="mb-8">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "image":
        return (
          <img
            src={obj.src}
            alt={obj.title}
            key={idx}
            width={obj.width}
            className="img"
          />
        );
      default:
        return modifiedText;
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-lg lg:p-8 mb-12 pb-12">
      <div className="relative overflow-hidden shadow-md mb-6">
        <img
          src={post.featuredImage.url}
          alt={post.name}
          className="object-top h-full w-full rounded-t-lg"
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 width-full">
          <div className="flex items-center  mb-4 lg:mb-0 w-full lg:w-auto  mr-8 w-full">
            <img
              src={post.author.photo.url}
              alt={post.author.title}
             
              className="align-middle img"
            />
            <p className="inline align-middletext-gray-700 mx-2 text-2xl">
              {post.author.name}
            </p>
            <div className="font-medium text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline mr-2 text-pink-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
            </div>
          </div>
        </div>
        <h1 className="mb-8 text-3xl font-semibold">
          {post.categories.map((category) => category.name)}
        </h1>
        {post.content.raw.children.map((typeObj, idx) => {
          const children = typeObj.children.map((item, itemIdx) =>
            getContentFragment(itemIdx, item.text, item)
          );
          return getContentFragment(idx, children, typeObj, typeObj.type);
        })}
      </div>
    </div>
  );
}

export default PostDetail;
