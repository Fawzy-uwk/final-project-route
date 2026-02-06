"use client";
import { useBrands } from "@/hooks/useBrands";
import { BrandCard } from "@/components/BrandCard";
import Loading from "@/app/loading";

export default function BrandGrid() {
    const { data: brands, isLoading, error } = useBrands();

    if (isLoading) return (
        <Loading />
    );

    if (error) return <div className="text-center py-20 text-red-500">Error loading brands.</div>;

    return (
        <main className="bg-white min-h-screen py-12 px-8 max-w-[1440px] mx-auto">
            <div className="mb-12">
                <h1 className="text-4xl font-black text-black tracking-tighter uppercase">Our Brands</h1>
                <div className="h-1.5 w-16 bg-black mt-2"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {brands?.map((brand: any) => (
                    <BrandCard key={brand._id} brand={brand} />
                ))}
            </div>
        </main>
    );
}