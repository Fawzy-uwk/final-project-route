"use client";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { Spinner } from "@heroui/react";
import { useParams } from "next/navigation";

export default function CategoryProductsPage() {
    const { id } = useParams();  
    const { data: products, isLoading, error } = useProducts();

    if (isLoading) return (
        <div className="h-[70vh] flex items-center justify-center">
            <Spinner color="default" size="lg" label="Loading Category Products..." />
        </div>
    );

    if (error) return <div className="text-center py-20 text-red-500">Error loading products.</div>;

    const categoryProducts = products?.filter((p: any) => p.category?._id === id);
    const categoryName = categoryProducts?.[0]?.category?.name || "Category";

    return (
        <main className="bg-white min-h-screen py-10 px-8 max-w-[1400px] mx-auto">
            <div className="mb-10">
                <h1 className="text-3xl font-black text-black tracking-tighter uppercase">
                    {categoryName} Collection
                </h1>
                <div className="h-1.5 w-16 bg-black mt-2"></div>
            </div>

            {categoryProducts?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categoryProducts.map((item: any) => (
                        <ProductCard key={item._id} product={item} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-400">No products found in this category.</p>
                </div>
            )}
        </main>
    );
}