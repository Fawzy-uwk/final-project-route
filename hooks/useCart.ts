import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export const useAddToCart = () => {
    const { data: session } = useSession();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (productId: string) => {
            const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": (session as any)?.token, 
                },
                body: JSON.stringify({ productId }),
            });
            if (!res.ok) throw new Error("Failed to add to cart");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            toast.success("Product added successfully!");
        },
    });
};