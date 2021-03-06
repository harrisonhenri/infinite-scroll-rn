import { useEffect, useState } from "react";

async function laptopRequest(page: number) {
  const response = await fetch(`http://localhost:3333/laptop?_page=${page}&_limit=10`);

  return response.json();
}

export interface ILaptop {
  id: number;
  Manufacturer: string;
  "Model Name": string;
  Category: string;
  "Screen Size": number;
  Screen: string;
  CPU: string;
  RAM: string;
  Storage: string;
  GPU: string;
  "Operating System": string;
  "Operating System Version": string;
  Weight: string;
  "Price (Euros)": string;
}

export function useFetchLaptop() {
  const [data, setData] = useState<ILaptop[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  function nextPage() {
    if (loading) return;

    setPage(prev => prev + 1);
  }

  useEffect(() => {
    setLoading(true);
    setError(false);

    (async () => {
      try {
        const laptopList = await laptopRequest(page);        
        setData(prev => [...prev, ...laptopList]);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [page]);
  
  return { data, loading, error, nextPage }
}