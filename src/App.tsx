import { useState, useEffect } from "react";
import {
	type Transaction,
	type MonthFilter,
	MONTH_LABELS,
	MONTH,
} from "./types";
import TransactionList from "./component/TransactionList";
import AddTransaction from "./component/AddTransaction";
import "./App.css";

function App() {
	const [selectedMonth, setSelectedMonth] = useState<MonthFilter>("All");
	const monthList: MonthFilter[] = ["All", ...MONTH];
	function getLocalStorageTransactions(): Transaction[] {
		const localStorageTransactions: string | null =
			localStorage.getItem("transactions");
		return localStorageTransactions
			? (JSON.parse(localStorageTransactions) as Transaction[])
			: [];
	}
	const [transactions, setTransactions] = useState<Transaction[]>(() => {
		return getLocalStorageTransactions();
	});
	const onDelete = (id: string) => {
		setTransactions(
			transactions.filter((transaction) => transaction.id !== id),
		);
	};
	const onAdd = (newTransaction: Transaction) => {
		const oldTransactions: Transaction[] = transactions ? transactions : [];
		const newTransactions = [newTransaction, ...oldTransactions];
		setTransactions(newTransactions);
	};

	const onMonthFilter = (month: MonthFilter): void => {
		setSelectedMonth(month);
	};

	useEffect(() => {
		localStorage.setItem("transactions", JSON.stringify(transactions));
	}, [transactions]);

	const filteredTransactions: Transaction[] =
		selectedMonth === "All"
			? transactions
			: transactions.filter((transaction) =>
					transaction.date.split("-")[1].includes(selectedMonth),
				);
	const total: number = filteredTransactions.reduce(
		(total: number, transaction: Transaction) => {
			total = total + transaction.amount;
			return total;
		},
		0,
	);

	return (
		<>
			<section id='center'>
				<div>
					<h1>Expense Tracker</h1>
					<select
						value={selectedMonth}
						onChange={(e) => onMonthFilter(e.target.value as MonthFilter)}>
						{monthList.map((month) => (
							<option key={month} value={month}>
								{MONTH_LABELS[month]}
							</option>
						))}
					</select>
					<p>
						Month: {MONTH_LABELS[selectedMonth]}, Total amount: {total}
					</p>
				</div>
				<TransactionList items={filteredTransactions} onDelete={onDelete} />
				<AddTransaction onAdd={onAdd} />
			</section>
		</>
	);
}

export default App;
