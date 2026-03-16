import { type MonthFilter, MONTH_LABELS, MONTH } from "./types";
import TransactionList from "./component/TransactionList";
import AddTransaction from "./component/AddTransaction";
import "./App.css";
import { useTransactions } from "./hook/useTransactions";
import { useState } from "react";

function App() {
	const {
		selectedMonth,
		total,
		filteredTransactions,
		editingId,
		onAdd,
		onEdit,
		onSave,
		onCancel,
		onDelete,
		onMonthFilter,
	} = useTransactions();

	const monthList: MonthFilter[] = ["All", ...MONTH];
	const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
	return (
		<>
			<section
				id='center'
				className={`theme ${isDarkMode ? "dark-mode" : "light-mode"}`}>
				<div className='flex'>
					<h1>Expense Tracker</h1>
					<button onClick={() => setIsDarkMode(!isDarkMode)}>
						{isDarkMode ? "Light Mode" : "Dark Mode"}
					</button>
				</div>
				<div>
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
				<TransactionList
					items={filteredTransactions}
					editingId={editingId}
					onEdit={onEdit}
					onSave={onSave}
					onCancel={onCancel}
					onDelete={onDelete}
				/>
				<AddTransaction onAdd={onAdd} />
			</section>
		</>
	);
}

export default App;
