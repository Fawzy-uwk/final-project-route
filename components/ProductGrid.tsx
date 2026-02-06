"use client";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { Spinner } from "@heroui/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { data } from "framer-motion/client";

export const ProductGrid = () => {
  const { data: products, isLoading, error } = useProducts();
  

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
      <div className="flex items-center gap-2">
        <div className="text-white bg-black w-7 h-7 flex items-center justify-center rounded font-bold">S</div>
        <p className="font-bold text-black text-2xl tracking-tighter">ShopMart</p>
      </div>


      <Spinner
        color="default"
        labelColor="foreground"
        className="text-black"

        size="lg"
      />
    </div>
  );

  if (error) return (
    <div className="text-center py-20 w-full">
      <p className="text-red-500 font-bold">Failed to load products. Please try again.</p>
    </div>
  );

  return (
    <section className="max-w-[1400px] mx-auto px-8 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-lg lg:text-3xl font-black text-black tracking-tighter uppercase">Our Collection</h2>
          <div className="h-1 w-12 bg-black mt-1"></div>
        </div>
        <p className="text-gray-400 text-sm font-medium">{products?.length} Products available</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {products?.map((item: any) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
    </section>
  );
};