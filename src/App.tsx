import { type MonthFilter, MONTH_LABELS, MONTH } from "./types";
import TransactionList from "./component/TransactionList";
import AddTransaction from "./component/AddTransaction";
import "./App.css";
import { useTransactions } from "./hook/useTransactions";

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
