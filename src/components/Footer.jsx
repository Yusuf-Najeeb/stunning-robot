import React from "react";

const Footer = () => {
  const now = new Date();
  return (
    <main>
      <h1 className="bg-blue-500 text-white text-4xl w-full text-center fixed bottom-0">
        All rights reserved &copy; {now.getFullYear()}
      </h1>
    </main>
  );
};

export default Footer;
