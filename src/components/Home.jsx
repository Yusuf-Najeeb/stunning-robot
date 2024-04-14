import React, { useEffect, useRef, useState } from "react";
import apiRequest from "../apiRequest";
import { BsPlus, BsX, BsPen } from "react-icons/bs";
const API_URL = "http://localhost:3500/items";

const Home = () => {
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
        const allItems = await response.json();

        setItems(allItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      fetchData();
    }, 2000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addItem = async () => {
    const id = items.length ? +items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item: newItem };

    const newListItem = [...items, myNewItem];
    setItems(newListItem);
    const postOptions = {
      method: "POST",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
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

    // Updates JSON Server
    const myCheckedItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myCheckedItem[0].checked }),
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  };

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOptions = {
      method: "DELETE",
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);

    if (result) setFetchError(result);
  };
  const handleEdit = (id) => {
    const itemToEdit = items.filter((item) => item.id === id);

    console.log(...itemToEdit);
    // setNewItem(itemToEdit[0].item);

    const updatedItem = {
      id,
      checked: !itemToEdit[0].checked,
      item: newItem.item,
    };

    // Patch request

    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = apiRequest(reqUrl, updateOptions);

    if (result) setFetchError(result);
  };

  const handleUpdate = () => {
    console.log("Updated");
  };

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center gap-4 my-4"
      >
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
          className="border p-1 rounded bg-blue-500"
          // eslint-disable-next-line jsx-a11y/aria-role
          role="submit"
          onClick={() => {
            inputRef.current.focus();
            addItem();
            setNewItem("");
          }}
        >
          <BsPlus size={25} />
        </button>
        <button
          className="border py-1 px-3 rounded bg-green-950 text-white"
          onClick={() => handleUpdate()}
        >
          Update
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
                    onChange={() => {
                      handleCheck(item.id);
                    }}
                  />
                </form>
                <p>{item.item}</p>
                <BsPen
                  size={30}
                  className="border bg-red-400 p-2 rounded-lg"
                  onClick={() => handleEdit(item.id)}
                />
                <BsX
                  size={30}
                  className="border bg-red-400 p-2 rounded-lg"
                  onClick={() => handleDelete(item.id)}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Home;
