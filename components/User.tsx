"use client";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { AiOutlineUser } from "react-icons/ai";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export const UserDropdown = () => {
    const { data: session } = useSession();

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Button isIconOnly variant="light" radius="full">
                    <AiOutlineUser size={24}  color="black"/>
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
                {session ? (
                    [
                        <DropdownItem key="profile" textValue="profile" className="h-14 gap-2 border-b border-gray-100">
                            <p className="font-bold">My Account</p>
                            <p className="text-xs text-gray-500">{session.user?.email}</p>
                        </DropdownItem>,
                        <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
                            Logout
                        </DropdownItem>
                    ]
                ) : (
                    [
                        <DropdownItem key="login" textValue="login">
                            <Link href="/login" className="w-full block">Login</Link>
                        </DropdownItem>,
                        <DropdownItem key="register" textValue="register">
                            <Link href="/register" className="w-full block">Register</Link>
                        </DropdownItem>
                    ]
                )}
            </DropdownMenu>
        </Dropdown>
    );
};