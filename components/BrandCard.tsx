"use client";
import { Card, CardBody, Image } from "@heroui/react";
import Link from "next/link";

export const BrandCard = ({ brand }: { brand: any }) => {
    return (

        <Card
            shadow="sm"
            isPressable
            className="border border-gray-100 bg-white hover:border-black transition-all group rounded-2xl h-[250px]"
        >
            <Link href={`/brands/${brand._id}`} className="block">
                <CardBody className="flex flex-col items-center justify-center p-8">
                    <Image
                        alt={brand.name}
                        className="w-full h-32 object-contain grayscale hover:scale-110 transition-transform delay-200 ease-in-out"
                        src={brand.image}
                    />
                    <p className="mt-6 font-bold text-gray-800 uppercase tracking-widest text-sm">
                        {brand.name}
                    </p>
                </CardBody>
            </Link >
        </Card>

    );
};