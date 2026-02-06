"use client";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { UserDropdown } from "./User";
import { CartBadge } from "./CartBadge";
import { useSession } from "next-auth/react";

export const Header = () => {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const token = (session as any)?.token;


    const getLinkClass = (path: string) => {
        const isActive = pathname === path;
        return `text-sm font-medium px-4 py-2 transition-all rounded-md ${isActive
            ? "bg-black text-white"
            : "text-black hover:bg-black hover:text-white"
            }`;
    };

    return (
        <Navbar
            maxWidth="2xl"
            className="border-b border-divider bg-[#f5f5f5] text-black shadow-sm"
        >
            <NavbarBrand className="gap-2">
                <Link href="/" className="flex items-center gap-2">
                    <div className="text-white bg-black w-6 h-6 flex items-center justify-center rounded font-bold">S</div>
                    <p className="font-bold text-inherit text-xl tracking-tight">ShopMart</p>
                </Link>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link href="/products" className={getLinkClass("/products")}>
                        Products
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/brands" className={getLinkClass("/brands")}>
                        Brands
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/categories" className={getLinkClass("/categories")}>
                        Categories
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem className="cursor-pointer p-2 rounded-full transition-colors flex items-center gap-2 ">
                    <UserDropdown />
                    {token && <CartBadge />}
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};