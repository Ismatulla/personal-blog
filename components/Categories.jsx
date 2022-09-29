import React from "react";
import {useEffect} from "react";
import {useState} from "react";
import {getCategories} from "../services";
import Link from "next/link";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((res) => setCategories(res));
  }, []);
  return (
    <div className="bg-white shadow-lg p-8 mb-8 rounded-lg">
      <h3 className="txt-xl mb-8 font-semibold border-b pb-4">Categories</h3>
      {categories.map((category) => (
        <Link key={category.slug} href={`/category/${category.slug}`}>
          <div className="transition duration-200 cursor-pointer display-block pb-3 mb-3 text-indigo-800 hover:text-indogo-400">
            {category.name}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
