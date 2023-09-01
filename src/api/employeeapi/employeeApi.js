// ---------------------------------- Get all Employees ------------------------------------
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
