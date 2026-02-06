"use client";

import Link from "next/link";

export const Footer = () => {
    const sections = {
        SHOP: ["Electronics", "Fashion", "Home & Garden", "Sports", "Deals"],
        "CUSTOMER SERVICE": ["Contact Us", "Help Center", "Track Your Order", "Returns & Exchanges", "Size Guide"],
        ABOUT: ["About ShopMart", "Careers", "Press", "Investor Relations", "Sustainability"],
        POLICIES: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Shipping Policy", "Refund Policy"],
    };

    return (
        <footer className="w-full px-10 py-16 bg-white border-t border-divider">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
                
                <div className="col-span-1">
                    <div className="flex items-center gap-2 mb-4 font-bold text-xl text-black">
                        <div className="bg-black text-white w-7 h-7 flex items-center justify-center rounded">S</div>
                        ShopMart
                    </div>
                    <p className="text-default-500 text-sm leading-relaxed mb-6 ">
                        Your one-stop destination for the latest technology, fashion, and lifestyle products.
                        Quality guaranteed with fast shipping and excellent customer service.
                    </p>
                    <div className="text-sm text-default-600 space-y-3">
                        <p className="flex items-center gap-2">📍 123 Shop Street, October City, DC 12345</p>
                        <p className="flex items-center gap-2">📞 (+20) 01093333333</p>
                        <p className="flex items-center gap-2">✉️ support@shopmart.com</p>
                    </div>
                </div>

                
                {Object.entries(sections).map(([title, items]) => (
                    <div key={title} className="flex flex-col gap-4">
                        <h4 className="font-bold text-sm tracking-wider text-black">{title}</h4>
                        <div className="flex flex-col gap-2">
                            {items.map((item) => (
                                <Link key={item} href="#" className="text-default-500 hover:text-black text-sm">
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </footer>
    );
};