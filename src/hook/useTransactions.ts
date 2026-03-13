import { useState, useEffect, useMemo } from "react";
import { type Transaction, type MonthFilter } from "../types";
export const useTransactions = () => {
	const [selectedMonth, setSelectedMonth] = useState<MonthFilter>("All");
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
		setTransactions((prev) =>
			prev.filter((transaction) => transaction.id !== id),
		);
	};
	const onAdd = (newTransaction: Transaction) => {
		setTransactions((prev) => [newTransaction, ...prev]);
	};

	const onMonthFilter = (month: MonthFilter): void => {
		setSelectedMonth(month);
	};

	useEffect(() => {
		localStorage.setItem("transactions", JSON.stringify(transactions));
	}, [transactions]);

	const filteredTransactions: Transaction[] = useMemo(() => {
		return selectedMonth === "All"
			? transactions
			: transactions.filter((transaction) =>
					transaction.date.split("-")[1].includes(selectedMonth),
				);
	}, [transactions, selectedMonth]);

	const total: number = useMemo(() => {
		return filteredTransactions.reduce(
			(total: number, transaction: Transaction) => {
				total = total + transaction.amount;
				return total;
			},
			0,
		);
	}, [filteredTransactions]);
	return {
		selectedMonth,
		total,
		filteredTransactions,
		onAdd,
		onDelete,
		onMonthFilter,
	};
};
