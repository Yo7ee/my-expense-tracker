import { type Transaction, type Category, CATEGORIES } from "../types";
import React, { useState } from "react";

interface Props {
	onAdd: (newTransaction: Transaction) => void;
}

interface FormState {
	title: string;
	amount: number | string;
	category: Category;
	date: string;
}

const defaultForm = {
	title: "",
	amount: "",
	category: "Food",
	date: new Date().toISOString().split("T")[0],
};

const AddTransaction = ({ onAdd }: Props) => {
	const [form, setForm] = useState<FormState>(
		JSON.parse(JSON.stringify(defaultForm)),
	);
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newTransaction: Transaction = {
			...form,
			id: Math.random().toString(36).substr(2, 9),
			amount: Number(form.amount),
		};
		onAdd(newTransaction);
		setForm(JSON.parse(JSON.stringify(defaultForm)));
	};

	return (
		<form onSubmit={onSubmit}>
			<div>
				<label htmlFor='title'>Title:</label>
				<input
					type='text'
					name='title'
					id='title'
					value={form.title}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label htmlFor='amount'>Amount:</label>
				<input
					type='number'
					name='amount'
					id='amount'
					value={form.amount}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label htmlFor='category'>Category:</label>
				<select
					name='category'
					id='category'
					value={form.category}
					onChange={handleChange}>
					{CATEGORIES.map((category) => (
						<option key={category} value={category}>
							{category}
						</option>
					))}
				</select>
			</div>
			<div>
				<label htmlFor='date'>Date:</label>
				<input
					type='date'
					name='date'
					id='date'
					value={form.date}
					onChange={handleChange}
				/>
			</div>
			<div>
				<button type='submit'>Add Transaction</button>
			</div>
		</form>
	);
};

export default AddTransaction;
