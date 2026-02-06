import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
            if (!res.ok) throw new Error("Failed to fetch categories");
            const result = await res.json();
            return result.data;
        },
    });
};