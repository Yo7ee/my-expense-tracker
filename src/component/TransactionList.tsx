import { type Transaction } from "../types";
interface Props {
	items: Transaction[];
	onDelete: (id: string) => void;
}

const TransactionList = ({ items, onDelete }: Props) => {
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
				{items.map((item) => (
					<tr key={item.id}>
						<td>{item.category}</td>
						<td>{item.title}</td>
						<td>{item.amount}</td>
						<td>{item.date}</td>
						<td>
							<button onClick={() => onDelete(item.id)}>Delete</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
export default TransactionList;
