"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";

export function CartBadge() {
    const { data: session } = useSession();

    const { data } = useQuery({
        queryKey: ["cart"],
        queryFn: async () => {
            const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: { "token": (session as any)?.token }
            });
            return res.json();
        },
        enabled: !!(session as any)?.token,
    });

    const count = data?.numOfCartItems || 0;

    return (
        <Link href="/cart" className="relative">
            <AiOutlineShoppingCart size={28} />
            {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white font-bold">
                    {count}
                </span>
            )}
        </Link>
    );
}