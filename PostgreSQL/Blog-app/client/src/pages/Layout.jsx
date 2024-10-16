import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-green-200">
      {/* <header> */}
      <div className="border">
        <div className="p-5 bg-gray-100  flex justify-center gap-[100px] lg:gap-[300px]">
            {/* left */}
            <span className="font-extrabold text-2xl">Blog</span>
            {/* center */}
            <ul className="flex gap-2">
                <li><Link><span>Category</span></Link></li>
                <li><Link><span>Category</span></Link></li>
            </ul>
            {/* right */}
            <button className="border px-5 py-1 rounded-xl cursor-pointer">
                <Link>New Post</Link>
            </button>
        </div>
      </div>
      {/* body */}
      <div className="flex mx-auto px-5 py-20 items-center bg-gray-200 md:px-20">
        <Outlet></Outlet>
      </div>
      {/* bottom */}
      <div className="bg-gray-100 p-5">
        <h3>Copyright</h3>
      </div>
    </div>
  );
};

export default Layout;
