import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await fetch("https://ecommerce.routemisr.com/api/v1/products");
            if (!res.ok) throw new Error("Failed to fetch products");
            const result = await res.json();
            return result.data; 
        },
    });
};