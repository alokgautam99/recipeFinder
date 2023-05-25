"use client"; // this is a client component 
interface Person {
    Endpoint: string;
}

const usefetch = async ({Endpoint}:Person) => {
    try{
        const res = await fetch(Endpoint);
        const data = await res.json();
        return data;
    }catch (error){
        console.log('Fetch Error: Contact the admin');
    }
}

export default usefetch;