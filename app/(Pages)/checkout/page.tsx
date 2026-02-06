"use client";
import {
    Button, Card, CardBody, Image, Modal, ModalContent,
    ModalHeader, ModalBody, ModalFooter, useDisclosure, Input
} from "@heroui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

export default function CartPage() {
    const { data: session } = useSession();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const token = (session as any)?.token;

    // 1. جلب بيانات الكارت للحصول على الـ Cart ID
    const { data: cartData } = useQuery({
        queryKey: ["cart"],
        queryFn: async () => {
            const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: { token },
            });
            return res.json();
        },
        enabled: !!token,
    });

    // 2. ميوتيشن الدفع عبر Stripe (Online Payment)
    const onlinePayment = useMutation({
        mutationFn: async (shippingAddress: any) => {
            // ملاحظة: الرابط هنا يختلف (checkout-session) ويحتاج الـ URL الخاص بموقعك للعودة إليه
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
                // التوجيه المباشر لصفحة Stripe التي تظهر في السكرين
                window.location.href = data.session.url;
            } else {
                toast.error("Failed to initiate payment session");
            }
        },
        onError: () => toast.error("Connection error")
    });

    const formik = useFormik({
        initialValues: { city: "", details: "", phone: "" },
        validationSchema: Yup.object({
            city: Yup.string().required("City is required"),
            details: Yup.string().required("Details are required"),
            phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone").required("Required"),
        }),
        onSubmit: (values) => {
            onlinePayment.mutate(values);
        }
    });

    return (
        <div className="w-full mx-auto p-6 min-h-screen">
            {/* ... باقي كود عرض المنتجات ... */}

            {/* زر الدفع في الـ Summary */}
            <Button
                onPress={onOpen}
                className="bg-black text-white font-bold h-14 w-full mt-4"
                radius="full"
            >
                Proceed to Online Payment
            </Button>

            {/* الـ Modal لجمع البيانات قبل التوجيه لـ Stripe */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" className="rounded-[2rem]">
                <ModalContent className="p-4">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <h2 className="text-xl font-bold">Shipping Address</h2>
                                <p className="text-gray-400 text-sm">Please provide address to proceed to card payment.</p>
                            </ModalHeader>
                            <ModalBody>
                                <form id="stripe-form" onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                                    <Input label="City" labelPlacement="outside" variant="bordered" {...formik.getFieldProps("city")} isInvalid={formik.touched.city && !!formik.errors.city} errorMessage={formik.errors.city} />
                                    <Input label="Details" labelPlacement="outside" variant="bordered" {...formik.getFieldProps("details")} isInvalid={formik.touched.details && !!formik.errors.details} errorMessage={formik.errors.details} />
                                    <Input label="Phone" labelPlacement="outside" variant="bordered" {...formik.getFieldProps("phone")} isInvalid={formik.touched.phone && !!formik.errors.phone} errorMessage={formik.errors.phone} />
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="bordered" onPress={onClose} className="rounded-xl font-bold">Cancel</Button>
                                <Button
                                    type="submit" form="stripe-form"
                                    className="bg-black text-white rounded-xl font-bold"
                                    isLoading={onlinePayment.isPending}
                                >
                                    Go to Payment
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}