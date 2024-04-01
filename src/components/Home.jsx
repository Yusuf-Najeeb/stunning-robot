import React, { useEffect, useRef, useState } from "react";
import apiRequest from "../apiRequest";
import { BsPlus } from "react-icons/bs";

const Home = () => {
  const API_URL = "http://localhost:3500/items";
  const [items, setItems] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Creating a new Item
  const [newItem, setNewItem] = useState("");
  const inputRef = useRef();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Couldn't get data");
        const DATA = await response.json();

        setFetchError(null);
        setItems(DATA);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    setInterval(() => {
      fetchData();
    }, 2000);
  }, []);

  const addItem = async () => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, newItem };

    const newListItem = [...items, myNewItem];
    setItems(newListItem);
    // console.log(newListItem);
    const postOptions = {
      method: "POST",
      header: {
        "content-type": "application/json",
      },
      body: JSON.stringify(myNewItem),
    };

    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  };

  const handleCheck = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);

    const myCheckedItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ checked: myCheckedItem[0].checked }),
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
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
          role="submit"
          onClick={() => {
            inputRef.current.focus();
            addItem();
            setNewItem("");
          }}
        >
          <BsPlus size={30} />
        </button>
      </form>
      <div>
        {isLoading && <p>Loading items...</p>}

        {!fetchError &&
          !isLoading &&
          items.map((item, i) => {
            return (
              <div key={i} className="flex flex-row items-center p-3 gap-3">
                <form>
                  <input
                    type="checkbox"
                    onChange={() => handleCheck(item.id)}
                  />
                </form>
                <p>{item.item}</p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Home;
