import React, {useRef, useState, useEffect} from "react";
import {submitComment} from "../services";

function CommentsForm({slug}) {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();
  const handleCommentSubmission = () => {
    setError(false);
    const {value: comment} = commentEl.current;
    const {value: name} = nameEl.current;
    const {value: email} = emailEl.current;
    const {checked: storeData} = storeDataEl.current;
    if (!name || !comment || !email) {
      setError(true);
      return;
    }
    const commentObj = {name, email, comment, slug};
    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name", name);
      window.localStorage.removeItem("email", email);
    }
    submitComment(commentObj).then((res) => {
      console.log(res);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
    console.log(commentObj)
  };
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Comments</h3>
      <div className="grid grid-cols-1 gap-4 pb-4">
        <textarea
          ref={commentEl}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700
          "
          placeholder="Comments..."
          name="comment"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 pb-4 lg:grid-cols-2">
        <input
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700
        "
          type="text"
          ref={nameEl}
          placeholder="Name"
          name="name"
        />
        <input
          type="email"
          ref={emailEl}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700
          "
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 pb-4">
        <div>
          <input
            type="checkbox"
            name="storeData"
            id="storeData"
            value="true"
            ref={storeDataEl}
          />
          <label
            htmlFor="storeData"
            className="text-gray-500 cursor-pointer ml-2">
            Save my name,email in this browser for the next time i comment
          </label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">All fields are required</p>}
      <div className="mt-8">
        <button
          onClick={handleCommentSubmission}
          type="button"
          className="trasition duration-500 ease hover:bg-indigo-900 inline-block bg-indigo-400 text-white font-medium rounded-full px-8 py-3 cursor-pointer">
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="font-semibold mt-2 text-green-500 text-xl float-right">
            Comment submitted succesfully !
          </span>
        )}
      </div>
    </div>
  );
}

export default CommentsForm;
