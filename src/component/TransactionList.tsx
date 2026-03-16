import {
	CATEGORIES,
	type Transaction,
	type PartialTransaction,
} from "../types";
import React, { useState, useRef, useEffect } from "react";

interface Props {
	items: Transaction[];
	editingId: string | null;
	onEdit: (id: string, item: Transaction) => void;
	onDelete: (id: string) => void;
	onSave: (id: string, updatedTransaction: PartialTransaction) => void;
	onCancel: () => void;
}
interface TransactionViewRowProps {
	item: Transaction;
	onEdit: (id: string, item: Transaction) => void;
	onDelete: (id: string) => void;
}

interface TransactionEditRowProps {
	item: Transaction;
	onSave: (id: string, updatedTransaction: PartialTransaction) => void;
	onCancel: () => void;
}

const TransactionViewRow = ({
	item,
	onEdit,
	onDelete,
}: TransactionViewRowProps) => {
	return (
		<tr key={item.id}>
			<td>{item.category}</td>
			<td>{item.title}</td>
			<td>{item.amount}</td>
			<td>{item.date}</td>
			<td>
				<button onClick={() => onEdit(item.id, item)}>Update</button>
				<button onClick={() => onDelete(item.id)}>Delete</button>
			</td>
		</tr>
	);
};

const TransactionEditRow = ({
	item,
	onSave,
	onCancel,
}: TransactionEditRowProps) => {
	const titleRef = useRef<HTMLSelectElement>(null);
	const [tempData, setTempData] = useState<PartialTransaction>(item);
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		console.log(name, value);
		setTempData({
			...tempData,
			[name]: value,
		});
	};
	const handleSave = (id: string) => {
		const parsedAmount = Number(tempData.amount);
		const finalAmount = isNaN(parsedAmount) ? 0 : parsedAmount;
		const editTransaction: PartialTransaction = {
			...tempData,
			amount: finalAmount,
		};
		onSave(id, editTransaction);
	};
	useEffect(() => {
		titleRef.current?.focus();
	}, []);
	return (
		<tr>
			<td>
				<select
					name='category'
					id='category'
					ref={titleRef}
					value={tempData.category}
					onChange={handleChange}>
					{CATEGORIES.map((category) => (
						<option key={category} value={category}>
							{category}
						</option>
					))}
				</select>
			</td>
			<td>
				<input
					type='text'
					name='title'
					id='title'
					value={tempData.title}
					onChange={handleChange}
				/>
			</td>
			<td>
				<input
					type='number'
					name='amount'
					id='amount'
					value={tempData.amount}
					onChange={handleChange}
				/>
			</td>

			<td>
				<input
					type='date'
					name='date'
					id='date'
					value={tempData.date}
					onChange={handleChange}
				/>
			</td>
			<td>
				<button onClick={() => handleSave(tempData.id)}>Save</button>
				<button onClick={() => onCancel()}>Cancel</button>
			</td>
		</tr>
	);
};

const TransactionList = React.memo(
	({ items, editingId, onSave, onCancel, onEdit, onDelete }: Props) => {
		return items.length === 0 ? (
			<div>There is no transaction.</div>
		) : (
			<table>
				<thead>
					<tr>
						<th>Category</th>
						<th>Title</th>
						<th>Amount</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item) =>
						editingId === item.id ? (
							<TransactionEditRow
								key={item.id}
								item={item}
								onSave={onSave}
								onCancel={onCancel}
							/>
						) : (
							<TransactionViewRow
								key={item.id}
								item={item}
								onEdit={onEdit}
								onDelete={onDelete}
							/>
						),
					)}
				</tbody>
			</table>
		);
	},
);
export default TransactionList;
