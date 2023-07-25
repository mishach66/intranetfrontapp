// ---------------------------------- Get all News ------------------------------------
// 
export const getAllNews = async () => {
    const response = await fetch('https://mhrp2.azurewebsites.net/api/News/allNews');
    if (!response.ok) {
      throw new Error("Something went wrong.");
    }
    return await response.json();
}
// ---------------------------------- Get all News ------------------------------------

// -------------------------------- Get News by Id ------------------------------------
// export const getNewsById = async ({ queryKey }) => {
//     const [_key, { id }] = queryKey
//     const response = await fetch(`https://mhrp2.azurewebsites.net/api/News/newsById/${id}`);
    
//     if (!response.ok) {
//       throw new Error("Something went wrong.");
//     }

//     return await response.json()
// }

export const getNewsById = async ({id}) => {
    const response = await fetch(`https://mhrp2.azurewebsites.net/api/News/newsById/${id}`)
    if (!response.ok) {
      throw new Error("Something went wrong.")
    }
    return await response.json()
}
// -------------------------------- Get News by Id ------------------------------------
