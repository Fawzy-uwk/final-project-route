"use client";
import { useCategories } from "@/hooks/useCategories";
import { CategoryCard } from "@/components/CategoryCard";
import Loading from "@/app/loading";


export default function CategoryGrid() {
    const { data: categories, isLoading, error } = useCategories();

    if (isLoading) return (
        <Loading />
    );

    if (error) return <div className="text-center py-20 text-red-500 font-bold">Error loading categories.</div>;

    return (
        
            <main className="bg-white min-h-screen py-12 px-8 max-w-[1440px] mx-auto w-full">
                <div className="mb-12 text-center md:text-left">
                    <h1 className="text-4xl font-black text-black tracking-tighter uppercase">Browse Categories</h1>
                    <div className="h-1.5 w-20 bg-black mt-2 mx-auto md:mx-0"></div>
                    <p className="text-gray-400 mt-4 font-medium uppercase text-xs tracking-widest">Explore our diverse collections</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                    {categories?.map((cat: any) => (
                        <CategoryCard key={cat._id} category={cat} />
                    ))}
                </div>
            </main>
        
    );
}