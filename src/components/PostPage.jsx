import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:3500/items";
const PostPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        const listItems = await response.json();
        setItems(listItems);
      } catch (err) {
        console.log(err.stack);
      }
    };

    fetchItems();
  }, []);
  return (
    <>
      {items.length ? (
        items.map((item) => {
          return (
            <ul key={item.id}>
              <li>
                {item.id}. {item.item}
              </li>
            </ul>
          );
        })
      ) : (
        <p>No data found</p>
      )}
    </>
  );
};

export default PostPage;
