const saveHandler = async (event) => {
  event.preventDefault();
  console.log("didnt find table!");
  // Get Table
    const table = document.querySelector("#resultsTable");
   const [headers, _, data] = table.rows

   const 
   console.log(headers,data)


  // Get row of table
/*   const rowLength = table.rows.length;

  for (let i = 0; i < rowLength; i++) {
    const cells = table.rows.item(i).cells;
    console.log(cells);
    const cellLength = cells.length;

    for (let j = 0; j < cellLength; j++) {
      const cellVal = cells.item(j).innerHTML;
      console.log(cellVal);
    }
  } */

  /*   if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      // If successful, redirect the browser to the profile page
      console.log("redirect now");
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  } */
};

document.querySelector("#saveResults").addEventListener("click", saveHandler);
