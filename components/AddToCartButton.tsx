"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAddToCart } from "@/hooks/useCart";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";

export default function AddToCartButton({ productId }: { productId: string }) {
    const { status } = useSession();
    const router = useRouter();
    const addToCart = useAddToCart();

    const handleAddToCart = () => {
        if (status === "unauthenticated") {
            toast.error("Please login first to add products to cart");
            router.push("/login");
            return;
        }

        addToCart.mutate(productId);
    };

    return (
        <Button
            onPress={handleAddToCart}
            isLoading={addToCart.isPending}
            className="bg-black text-white w-full h-10 font-bold rounded-full hover:bg-gray-900 transition-colors"
        >
            Add to Cart
        </Button>
    );
}