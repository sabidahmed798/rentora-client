const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";


export  const createproduct = async (data: FormData) => {
   const res = await fetch(`${BASE_URL}/product`,{
    method: "POST",
    headers: {
        'content-type': 'application/json',
    },
    body: data,

   } );
   return res.json(); 
}