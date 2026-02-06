"use client";
import {
    Button, Card, CardBody, Image, Modal, ModalContent,
    ModalHeader, ModalBody, ModalFooter, useDisclosure, Input
} from "@heroui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

export default function CartPage() {
    const { data: session, status } = useSession();
    const queryClient = useQueryClient();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const token = (session as any)?.token;

    const { data: cartData, isLoading } = useQuery({
        queryKey: ["cart"],
        queryFn: async () => {
            const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: { token },
            });
            return res.json();
        },
        enabled: !!token && status === "authenticated",
    });

    const cart = cartData?.data;
    const products = cart?.products || [];

    const onlinePayment = useMutation({
        mutationFn: async (shippingAddress: any) => {
            const currentUrl = window.location.origin;
            const res = await fetch(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartData?.data?._id}?url=${currentUrl}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json", token },
                    body: JSON.stringify({ shippingAddress })
                }
            );
            return res.json();
        },
        onSuccess: (data) => {
            if (data.status === "success") {
                toast.loading("Redirecting to secure payment page...");
                window.location.href = data.session.url;
            } else {
                toast.error("Failed to create payment session");
            }
        },
        onError: () => toast.error("Connection error")
    });

    const updateCount = useMutation({
        mutationFn: async ({ id, count }: { id: string; count: number }) => {
            const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", token },
                body: JSON.stringify({ count }),
            });
            return res.json();
        },
        onMutate: async (variables) => {
            await queryClient.cancelQueries({ queryKey: ["cart"] });
            const previousCart = queryClient.getQueryData(["cart"]);
            queryClient.setQueryData(["cart"], (old: any) => {
                let newTotal = 0;
                const newProducts = old.data.products.map((p: any) => {
                    if (p.product._id === variables.id) {
                        newTotal += p.price * variables.count;
                        return { ...p, count: variables.count };
                    }
                    newTotal += p.price * p.count;
                    return p;
                });
                return { ...old, data: { ...old.data, products: newProducts, totalCartPrice: newTotal } };
            });
            return { previousCart };
        },
        onError: (err, vars, context) => queryClient.setQueryData(["cart"], context?.previousCart),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
    });

    const removeItem = useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                method: "DELETE",
                headers: { token },
            });
            return res.json();
        },
        onSuccess: () => {
            toast.success("Item removed");
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        }
    });

    const clearCart = useMutation({
        mutationFn: async () => {
            const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
                method: "DELETE",
                headers: { token },
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.setQueryData(["cart"], null);
            toast.success("Cart cleared");
        }
    });

    const formik = useFormik({
        initialValues: { city: "", details: "", phone: "" },
        validationSchema: Yup.object({
            city: Yup.string().required("City is required"),
            details: Yup.string().required("Details are required"),
            phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number").required("Required"),
        }),
        onSubmit: (values) => onlinePayment.mutate(values),
    });

    if (isLoading) return <div className="min-h-screen flex items-center justify-center font-bold text-xl">Loading...</div>;

    return (
        <div className="w-full mx-auto p-6 min-h-screen bg-gray-50/30">
            <h1 className="text-4xl font-black mb-1 tracking-tight text-black">Shopping Cart</h1>
            <p className="text-gray-400 mb-10 font-medium">{products.length} items in your cart</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 flex flex-col gap-5">
                    {products.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-gray-100">
                            <p className="text-gray-700 font-bold text-lg">Your cart is empty</p>
                            <Button as={Link} href="/" variant="light" className="mt-4 font-black underline">Shop Now</Button>
                        </div>
                    ) : (
                        products.map((item: any) => (
                            <Card key={item._id} shadow="none" className="border border-gray-100 rounded-[2rem] p-4 bg-gray-100">
                                <CardBody className="flex flex-row items-center gap-6">
                                    <Image src={item.product.imageCover} className="w-38 h-38 object-cover rounded-2xl bg-gray-50" />
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg text-black">{item.product.title.split(" ").slice(0, 3).join(" ")}</h3>
                                        <p className="text-gray-400 text-sm mt-1">{item.product.category?.name}</p>
                                        <div className="flex items-center gap-4 mt-6">
                                            <Button isIconOnly size="sm" radius="full" className="bg-gray-600" variant="flat" onPress={() => updateCount.mutate({ id: item.product._id, count: item.count - 1 })} isDisabled={item.count <= 1}><AiOutlineMinus /></Button>
                                            <span className="font-bold text-black">{item.count}</span>
                                            <Button isIconOnly size="sm" radius="full" className="bg-gray-600" variant="flat" onPress={() => updateCount.mutate({ id: item.product._id, count: item.count + 1 })}><AiOutlinePlus /></Button>
                                        </div>
                                    </div>
                                    <div className="text-right flex flex-col justify-between h-28">
                                        <span className="font-black text-xl text-black">EGP {(item.price * item.count).toLocaleString()}</span>
                                        <button className="text-red-500 font-bold text-sm hover:underline" onClick={() => removeItem.mutate(item.product._id)}>Remove</button>
                                    </div>
                                </CardBody>
                            </Card>
                        ))
                    )}
                </div>

                <div className="lg:col-span-1">
                    <Card shadow="none" className="border border-gray-100 rounded-[2.5rem] p-8 bg-white">
                        <h2 className="text-2xl font-black mb-8 text-black">Order Summary</h2>
                        <div className="flex flex-col gap-6 font-bold">
                            <div className="flex justify-between text-gray-400 text-sm"><span>Subtotal</span><span className="text-black">EGP {cart?.totalCartPrice?.toLocaleString()}</span></div>
                            <div className="flex justify-between text-gray-400 text-sm"><span>Shipping</span><span className="text-green-500">Free</span></div>
                            <div className="h-[1px] bg-gray-100 my-2" />
                            <div className="flex justify-between text-xl font-black text-black"><span>Total</span><span>EGP {cart?.totalCartPrice?.toLocaleString()}</span></div>

                            <Button
                                onPress={onOpen}
                                className="bg-black text-white font-black h-14 mt-8 text-md shadow-xl"
                                radius="full"
                                isDisabled={products.length === 0}
                            >
                                Proceed to Checkout
                            </Button>

                            <Button as={Link} href="/" variant="bordered" className="border-gray-200 font-bold h-14 text-gray-400" radius="full">Continue Shopping</Button>
                        </div>
                    </Card>
                    <button className="w-full mt-6 text-red-500 text-xs font-black flex items-center justify-end gap-1 px-4 hover:opacity-70" onClick={() => clearCart.mutate()} disabled={products.length === 0}><AiOutlineDelete size={16} /> clear cart</button>
                </div>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" className="rounded-lg bg-white">
                <ModalContent className="p-4">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <h2 className="text-xl font-black text-black">Add Address</h2>
                                <p className="text-gray-400 text-xs font-normal">Add a shipping address to proceed to card payment.</p>
                            </ModalHeader>
                            <ModalBody>
                                <form id="stripe-form" onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
                                    <Input label="City :" labelPlacement="outside" placeholder="e.g. Cairo" variant="bordered" {...formik.getFieldProps("city")} isInvalid={formik.touched.city && !!formik.errors.city} errorMessage={formik.errors.city} />
                                    <Input label="Details :" labelPlacement="outside" placeholder="Street / Building" variant="bordered" {...formik.getFieldProps("details")} isInvalid={formik.touched.details && !!formik.errors.details} errorMessage={formik.errors.details} />
                                    <Input label="Phone Number :" labelPlacement="outside" placeholder="01xxxxxxxxx" variant="bordered" {...formik.getFieldProps("phone")} isInvalid={formik.touched.phone && !!formik.errors.phone} errorMessage={formik.errors.phone} />
                                </form>
                            </ModalBody>
                            <ModalFooter className="mt-4 gap-4">
                                <Button variant="bordered" onPress={onClose} className="rounded-xl font-bold border-gray-200 px-8 text-black">Cancel</Button>
                                <Button
                                    type="submit" form="stripe-form"
                                    className="bg-black text-white rounded-xl font-bold px-8"
                                    isLoading={onlinePayment.isPending}
                                >
                                    Proceed to Payment
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}