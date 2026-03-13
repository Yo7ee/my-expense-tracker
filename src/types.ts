export interface Transaction {
	id: string;
	title: string;
	amount: number;
	category: Category;
	date: string;
}

export const CATEGORIES = [
	"Food",
	"Transport",
	"Rent",
	"Sport",
	"Entertainment",
	"Investment",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const MONTH = [
	"01",
	"02",
	"03",
	"04",
	"05",
	"06",
	"07",
	"08",
	"09",
	"10",
	"11",
	"12",
] as const;

export type Month = (typeof MONTH)[number];

export type MonthFilter = Month | "All";

export const MONTH_LABELS: Record<MonthFilter, string> = {
	All: "All Months",
	"01": "January",
	"02": "February",
	"03": "March",
	"04": "April",
	"05": "May",
	"06": "June",
	"07": "July",
	"08": "August",
	"09": "September",
	"10": "October",
	"11": "November",
	"12": "December",
} as const;
