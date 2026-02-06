"use client";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { Spinner } from "@heroui/react";
import { useParams } from "next/navigation";

export default function BrandProductsPage() {
    const { id } = useParams(); 
    const { data: products, isLoading, error } = useProducts();

    if (isLoading) return (
        <div className="h-[70vh] flex items-center justify-center">
            <Spinner color="default" size="lg" label="Loading Brand Collection..." />
        </div>
    );

    if (error) return <div className="text-center py-20 text-red-500">Error loading products.</div>;

    const brandProducts = products?.filter((p: any) => p.brand?._id === id);
    const brandName = brandProducts?.[0]?.brand?.name || "Brand";

    return (
        <main className="bg-white min-h-screen py-10 px-8 max-w-[1400px] mx-auto">
            <div className="mb-10">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-1">Official Collection</p>
                <h1 className="text-4xl font-black text-black tracking-tighter uppercase">
                    {brandName}
                </h1>
                <div className="h-1.5 w-16 bg-black mt-2"></div>
            </div>

            {brandProducts?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {brandProducts.map((item: any) => (
                        <ProductCard key={item._id} product={item} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 border-2 border-dashed border-gray-100 rounded-3xl">
                    <p className="text-gray-400 font-medium">Currently, there are no products available for this brand.</p>
                </div>
            )}
        </main>
    );
}