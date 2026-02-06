import { useQuery } from "@tanstack/react-query";

export const useBrands = () => {
    return useQuery({
        queryKey: ["brands"],
        queryFn: async () => {
            const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
            if (!res.ok) throw new Error("Failed to fetch brands");
            const result = await res.json();
            return result.data; 
        },
    });
};