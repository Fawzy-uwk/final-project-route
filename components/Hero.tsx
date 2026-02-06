"use client";
import { Button } from "@heroui/react";
import Link from "next/link";

export const Hero = () => {
    return (
        <section className="flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-wide text-black mb-6">
                Welcome to ShopMart
            </h1>
            <p className="max-w-2xl text-default-500 text-lg md:text-xl mb-10">
                Discover the latest technology, fashion, and lifestyle products.
                Quality guaranteed with fast shipping and excellent customer service.
            </p>

            <div className="flex gap-4">
                <Link href="/products">
                    <Button
                        className="bg-black text-white px-10 h-12 font-semibold hover:bg-gray-800"
                        radius="sm"
                    >
                        Shop Now
                    </Button>
                </Link>

                <Link href="/categories">
                    <Button
                        variant="bordered"
                        className="border-black text-black px-10 h-12 font-semibold"
                        radius="sm"
                    >
                        Browse Categories
                    </Button>
                </Link>
            </div>
        </section>
    );
};