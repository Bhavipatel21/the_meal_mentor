const saveHandler = async (event) => {
  event.preventDefault();

  let nutrition;
	let cells = document.querySelectorAll("#resultsTable td");
	console.log(cells);

	for (let i = 0; i < cells.length; i += 16) {
		nutrition = {
			name: "",
			image: "",
			user_id: 0,
			title: cells[1 + i].textContent,
			calories: parseFloat(cells[7 + i].textContent),
			sugar: parseFloat(cells[8 + i].textContent),
			cholesterol: parseFloat(cells[9 + i].textContent),
			transfat: parseFloat(cells[10 + i].textContent),
			fat: parseFloat(cells[11 + i].textContent),
			fiber: parseFloat(cells[12 + i].textContent),
			carbs: parseFloat(cells[13 + i].textContent),
			protien: parseFloat(cells[13 + i].textContent),
			sodium: parseFloat(cells[14 + i].textContent)
		}		
	}

	console.log(nutrition);

};

document.querySelector("#saveResults").addEventListener("click", saveHandler);
