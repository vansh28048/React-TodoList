import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 px-8 py-4 text-white flex justify-around items-center">
      <h1 className="text-2xl font-bold">iTask</h1>
      <ul className="flex list-none gap-4"> 
        <li>
          <a href="#" className="hover:underline font-medium">Home</a>
        </li>
        <li>
          <a href="#" className="hover:underline font-medium">Todo</a>
        </li>
        <li>
          <a href="#" className="hover:underline font-medium">About</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
