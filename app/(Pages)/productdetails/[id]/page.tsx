"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Image, Button, Spinner } from "@heroui/react";
import { AiFillStar, AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { FaHeart, FaStar } from "react-icons/fa";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductDetails() {
    const { id } = useParams();
    const [activeImage, setActiveImage] = useState<string | null>(null);

    const { data: product, isLoading } = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
            const result = await res.json();
            return result.data;
        },
    });

    if (isLoading) return (
        <div className="h-[70vh] flex items-center justify-center">
            <Spinner color="default" size="lg" />
        </div>
    );

    return (
        <main className="min-h-[calc(100vh-100px)] flex items-center justify-center bg-gray-50/30 p-4">
            <div className="bg-white w-full max-w-4xl rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row overflow-hidden max-h-[550px]">

                <div className="md:w-1/2 flex gap-3 p-4 bg-[#fcfcfc]">
                    <div className="flex flex-col gap-2 overflow-y-auto max-h-[400px] pr-1 scrollbar-hide">
                        {[product.imageCover, ...product.images].map((img, index) => (
                            <div
                                key={index}
                                onClick={() => setActiveImage(img)}
                                className={`w-14 h-14 rounded-lg border-2 cursor-pointer transition-all flex-shrink-0 overflow-hidden ${(activeImage === img || (!activeImage && img === product.imageCover))
                                    ? "border-black shadow-sm" : "border-transparent opacity-60 hover:opacity-100"
                                    }`}
                            >
                                <Image src={img} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>

                    <div className="flex-grow flex items-center justify-center overflow-hidden rounded-xl bg-white border border-gray-50">
                        <Image
                            src={activeImage || product.imageCover}
                            className="max-h-[380px] object-contain transition-transform duration-500 hover:scale-110 p-2"
                        />
                    </div>
                </div>

                <div className="md:w-1/2 p-6 flex flex-col justify-center gap-8">
                    <div className="space-y-1">
                        <div className="mb-3">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{product.brand?.name}</p>
                            <h1 className="text-xl font-black text-black leading-tight line-clamp-2 uppercase">
                                {product.title}
                            </h1>
                        </div>

                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-4">
                            {product.description}
                        </p>


                        <p className="text-[10px] text-gray-400 font-light uppercase tracking-wider">
                            {product.category?.name}
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < Math.round(product.ratingsAverage) ? "text-yellow-400" : "text-gray-200"}>
                                        <AiFillStar size={16} />
                                    </span>
                                ))}
                            </div>
                            <span className="text-[10px] text-gray-400 font-bold">({product.ratingsQuantity} REVIEWS)</span>
                        </div>

                    </div>

                    <div className="space-y-4">
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-normal text-black">EGP {product.price}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <AddToCartButton productId={product._id} />
                            <Button
                                isIconOnly
                                variant="bordered"
                                radius="lg"
                                className="h-10 w-8 border-gray-200 hover:bg-gray-50 hover:text-red-600 text-black"
                            >
                                <FaHeart size={20} />
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}