import tableHeader from "./tableHeader.js";
import tableRow from "./tableRow.js";

export default (model) => {
	const table = document.createElement("table");
	table.classList.add("table");
	const headers = Object.keys(model[0]);
	const th = tableHeader(headers, ["table-heading"]);
	table.append(th);
	const tbody = document.createElement("tbody");
	tbody.classList.add("table-body");
	model.forEach((row) => {
		const tr = tableRow(row);
		tbody.append(tr);
	});
	table.append(tbody);
	return table;
};
