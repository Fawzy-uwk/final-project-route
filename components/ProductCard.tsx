"use client";
import { Card, CardBody, CardFooter, Image, Button } from "@heroui/react";
import Link from "next/link";
import { AiFillStar, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import AddToCartButton from "./AddToCartButton";

interface ProductProps {
    product: any;
}

export const ProductCard = ({ product }: ProductProps) => {
    return (
        <Card shadow="sm" className="border border-gray-100 rounded-xl bg-white  transition-all">
            <Link href={`/productdetails/${product._id}`} className="block">
                <CardBody className="p-0 relative h-[350px] overflow-hidden">
                    <Image
                        alt={product.title}
                        className="w-full object-cover h-[350px]  bg-[#f9f9f9] hover:scale-110 transition-transform delay-300 ease-in-out"
                        src={product.imageCover}
                        width="100%"
                    />
                </CardBody>
            </Link>

            <CardFooter className="flex-col items-start px-4 py-4 gap-1">
                <div className="flex justify-between w-full items-start">
                    <p className="text-[10px] text-gray-400  uppercase tracking-wider">
                        {product.category?.name}
                    </p>
                    <div className="flex items-center gap-1">
                        <AiFillStar color="yellow" size={14} />
                        <span className="text-[12px] text-gray-500 font-medium">
                            {product.ratingsAverage}
                        </span>
                    </div>
                </div>

                <h3 className="text-sm font-bold text-gray-800 line-clamp-1 mt-1">
                    {product.title}
                </h3>

                <p className=" text-base text-black mt-2">
                    {product.price} <span className="text-[10px]">EGP</span>
                </p>

                <div className="flex items-center gap-2 w-full mt-4">
                    <AddToCartButton productId={product._id} />
                    <Button
                        isIconOnly
                        variant="flat"
                        radius="md"
                        className="bg-gray-100 text-gray-950 hover:text-red-600 transition-colors h-10 w-10"
                    >
                        <FaHeart size={22} />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};