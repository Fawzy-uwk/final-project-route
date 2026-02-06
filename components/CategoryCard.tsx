"use client";
import { Card, CardFooter, Image } from "@heroui/react";
import Link from "next/link";

export const CategoryCard = ({ category }: { category: any }) => {
    return (
        <Link href={`/categories/${category._id}`} className="block">
            <Card isFooterBlurred className="border-none h-[300px] group overflow-hidden bg-transparent">
                <Image
                    alt={category.name}
                    className="z-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={category.image}
                />
                <CardFooter className="justify-center before:bg-white/80 border-white/20 border-1 overflow-hidden py-3 absolute before:rounded-xl rounded-large bottom-4 w-[calc(100%_-_2rem)] shadow-small ml-4 z-10">
                    <p className="text-sm font-extrabold text-white uppercase tracking-widest drop-shadow-md">
                        {category.name}
                    </p>
                </CardFooter>
            </Card>
        </Link>
    );
};