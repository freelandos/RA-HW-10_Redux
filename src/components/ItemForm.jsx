import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_ITEM, CANCEL_EDIT_ITEM, UPDATE_ITEM, SET_FILTER } from "../redux/actions";

export const ItemForm = () => {
  const { items, editingItem }  = useSelector((state) => state.item);
  const dispatch = useDispatch();

  const [title, setTitle] = useState(editingItem ? editingItem.title : "");
  const [price, setPrice] = useState(editingItem ? editingItem.price : "");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title);
      setPrice(editingItem.price);
    } else {
      setTitle("");
      setPrice("");
    }
  }, [editingItem]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !price.trim()) return;

    if (editingItem && items.find((item) => item.id === editingItem.id)) {
      dispatch({
        type: UPDATE_ITEM,
        payload: {
          ...editingItem,
          title: title,
          price: price,
        },
      });
    } else {
      dispatch({
        type: ADD_ITEM,
        payload: {
          id: crypto.randomUUID(),
          title: title,
          price: price,
        },
      });
    }

    setTitle("");
    setPrice("");
  }

  const handleCancel = () => {
    dispatch({
      type: CANCEL_EDIT_ITEM,
    });

    setTitle("");
    setPrice("");
  }

  const handleFilter = (e) => {
    dispatch({
      type: SET_FILTER,
      payload: e.target.value,
    });

    setFilter(e.target.value);
  }

  return (
    <div className="my-24 mx-36 shadow-lg rounded">
      <form onSubmit={handleSubmit} className="flex justify-center gap-4 mx-auto bg-white p-8">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="shadow appearance-none border rounded w-[400px] py-1 px-3 text-gray-700 leading-tight focus:outline-none"
        />
        <input
          type="number"
          value={price}
          min="0"
          step="10"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="shadow appearance-none border rounded w-56 py-1 px-3 text-gray-700 leading-tight focus:outline-none"
        />
        <div className="flex justify-between items-center gap-3">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-8 rounded focus:outline-none"
          >
            {editingItem ? "Save" : "Add"}
          </button>
          {editingItem && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-6 rounded focus:outline-none"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <div className="flex justify-center gap-4 mx-auto bg-white p-8">
        <input
          type="text"
          value={filter}
          onChange={handleFilter}
          placeholder="Filter by title"
          className="shadow appearance-none border rounded w-56 py-1 px-3 text-gray-700 leading-tight focus:outline-none"
        />
      </div>
    </div>
  );
};
