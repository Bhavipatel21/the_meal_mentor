const saveHandler = async (event) => {
  event.preventDefault();

  let nutrition;
	let cells = document.querySelectorAll("#resultsTable td");
	console.log(cells);

	for (let i = 0; i < cells.length; i += 16) {
		nutrition = {
		  name: "",
			image: "", 
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

  if (nutrition) {
    console.log('any inpit', nutrition);

    const response = await fetch('/api/nutrition', {
        method: 'POST',
        body: JSON.stringify({ nutrition }),
        headers: {
            'Content-type': 'application/json'
        },
    });
if (response.ok) {
    document.location.replace('/dashboard');
}   else {
    alert('Failed to create post');
}
}


};

document.querySelector("#saveResults").addEventListener("click", saveHandler);
