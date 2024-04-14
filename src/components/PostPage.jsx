import React, { useEffect, useState, useRef } from "react";
import { BsPlus, BsX } from "react-icons/bs";

const API_URL = "http://localhost:3500/items";
const PostPage = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const inputRef = useRef();

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
  const handleCheck = (id) => {
    const checkItem = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(checkItem);
  };
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className="p-1 border border-black"
          type="text"
          autoFocus
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item..."
          ref={inputRef}
        />
        <button
          className="border p-1 rounded"
          // eslint-disable-next-line jsx-a11y/aria-role
          role="submit"
          onClick={() => {
            inputRef.current.focus();
            // addItem();
            // setNewItem("");
          }}
        >
          <BsPlus size={30} />
        </button>
      </form>
      {items.length ? (
        items.map((item) => {
          return (
            <ul key={item.id}>
              <li className="flex gap-4 items-center">
                {item.id}.
                <input
                  type="checkbox"
                  onChange={(e) => {
                    e.preventDefault();
                    handleCheck(item.id);
                  }}
                />
                <p>{item.item}</p>
                <BsX
                  // onClick={() => handleUpdate(item.id)}
                  aria-label="button"
                  size={20}
                  className="border bg-red-800 rounded text-white cursor-pointer"
                />
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
