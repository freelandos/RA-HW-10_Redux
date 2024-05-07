import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EDIT_ITEM, DELETE_ITEM } from "../redux/actions";

export const ItemList = () => {
	const { items, filter } = useSelector((state) => state.item);
	const dispatch = useDispatch();
	const [filteredItems, setFilteredItems] = useState(items);

	useEffect(() => {
		const filtered = filter
			? items.filter((item) => item.title.toLowerCase().includes(filter.toLowerCase()))
			: items;

		setFilteredItems(filtered);
	}, [items, filter])

	const handleEdit = (item) => {
		dispatch({
			type: EDIT_ITEM,
			payload: item,
		});
	};

	const handleDelete = (item) => {
		dispatch({
			type: DELETE_ITEM,
			payload: item,
		});
	};

	return (
		<div className="overflow-x-auto flex justify-center mx-36">
			<table className="w-full table-auto border border-gray-500 min-w-min max-w-max">
				<thead>
					<tr>
						<th className="w-[450px] border border-gray-500 px-4 py-2">Title</th>
						<th className="w-[150px] border border-gray-500 px-4 py-2">Price</th>
						<th className="w-[150px] border border-gray-500 px-4 py-2">Actions</th>
					</tr>
				</thead>
				<tbody>
				{filteredItems.map((item) => (
          <tr key={item.id}>
            <td className="border border-gray-500 px-4 py-2">{item.title}</td>
            <td className="border border-gray-500 px-4 py-2 text-center">{item.price}</td>
            <td className="border border-gray-500 px-4 py-2 text-center">
              <button className="w-6 h-7 mr-3" onClick={() => handleEdit(item)}>
                <i className="bi bi-pencil"></i>
              </button>
              <button className="w-6 h-7" onClick={() => handleDelete(item)}>
                <i className="bi bi-trash"></i>
              </button>
            </td>
          </tr>
				))}
				</tbody>
			</table>
		</div>
	);
};
