// ---------------------------------- Get all Employees ------------------------------------

import axios from "axios";

//
export const getAllEmployees = async (pageNumber, LIMIT) => {
  // const response = await fetch('https://localhost:7071/api/Employee/allEmployees');
  const response = await fetch(
    `https://localhost:7071/api/Employee/allEmployees?PageNumber=${pageNumber}&PageSize=${LIMIT}`
  );
  if (!response.ok) {
    throw new Error("Something went wrong.");
  }
  return await response.json();
};
// ---------------------------------- Get all Employees ------------------------------------

// ---------------------------------- Create Employee ------------------------------------
export const createEmployee = async (data) => {
  //console.log("employee API data is: ", data);
  //console.log("employee API data.empl is: ", data.empl);
  //console.log("employee API data.empl.Givenname is: ", data.empl.Givenname);

  // const response = await fetch(
  //   "https://localhost:7071/api/Employee/createEmployee",
  //   {
  //     method: "POST",
  //     // headers: {
  //     //   // "Content-Type": "multipart/form-data",
  //     //   // "Content-Type": "application/json",
  //     // },
  //     body: JSON.stringify(data.empl),
  //     //body: data,
  //   }
  // );
  // if (!response.ok) {
  //   throw new Error(response.json().message);
  // }
  // return await response.json();

  const response = await axios.post(
    "https://localhost:7071/api/Employee/createEmployee",
    data.empl,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  if (!response.statusText === "OK") {
    throw new Error(response.statusText);
  }
  return response.statusText;
};
// ---------------------------------- Create Employee ------------------------------------
