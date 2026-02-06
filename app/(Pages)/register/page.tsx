"use client";
import { Button, Input, Card, CardBody } from "@heroui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
    const router = useRouter();
    const [apiError, setApiError] = useState("");

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().min(3, "Name is too short").required("Name is required"),
            email: Yup.string().email("Invalid email format").required("Email is required"),
            password: Yup.string().min(6, "Min 6 characters").required("Password is required"),
            rePassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required("Please confirm your password"),
            phone: Yup.string()
                .matches(/^01[0125][0-9]{8}$/, "Must be a valid Egyptian phone number")
                .required("Phone is required"),
        }),
        onSubmit: async (values) => {
            setApiError("");
            try {
                const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values)
                });
                const data = await res.json();

                if (res.ok) {
                    router.push("/login");
                } else {
                    setApiError(data.message || "Registration failed");
                }
            } catch (err) {
                setApiError("Check your internet connection");
            }
        }
    });

    return (
        <div className="min-h-screen py-12 flex flex-col items-center justify-center gap-8 bg-white px-4">
            <h1 className="text-3xl font-bold text-black tracking-tight">
                Register now and Join US
            </h1>

            <Card
                shadow="none"
                className="w-full max-w-[500px] border border-gray-100 rounded-[2.5rem] bg-white p-4"
            >
                <CardBody className="p-8">
                    {apiError && (
                        <div className="bg-red-50 text-red-500 text-xs p-3 rounded-xl mb-6 text-center font-bold border border-red-100">
                            {apiError}
                        </div>
                    )}

                    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
                        <Input
                            label="Name"
                            labelPlacement="outside"
                            placeholder="Ahmed"
                            variant="bordered"
                            radius="lg"
                            classNames={{
                                label: "font-bold text-black mb-1",
                                inputWrapper: "h-12 border-gray-200 focus-within:!border-black transition-colors",
                            }}
                            {...formik.getFieldProps("name")}
                            isInvalid={formik.touched.name && !!formik.errors.name}
                            errorMessage={formik.errors.name}
                        />

                        <Input
                            label="Email"
                            labelPlacement="outside"
                            placeholder="ahmed@gmail.com..."
                            variant="bordered"
                            radius="lg"
                            classNames={{
                                label: "font-bold text-black mb-1",
                                inputWrapper: "h-12 border-gray-200 focus-within:!border-black transition-colors",
                            }}
                            {...formik.getFieldProps("email")}
                            isInvalid={formik.touched.email && !!formik.errors.email}
                            errorMessage={formik.errors.email}
                        />

                        <Input
                            label="Password"
                            labelPlacement="outside"
                            placeholder="Ahmed@123"
                            type="password"
                            variant="bordered"
                            radius="lg"
                            classNames={{
                                label: "font-bold text-black mb-1",
                                inputWrapper: "h-12 border-gray-200 focus-within:!border-black transition-colors",
                            }}
                            {...formik.getFieldProps("password")}
                            isInvalid={formik.touched.password && !!formik.errors.password}
                            errorMessage={formik.errors.password}
                        />

                        <Input
                            label="Confirm Password"
                            labelPlacement="outside"
                            placeholder="Ahmed@123"
                            type="password"
                            variant="bordered"
                            radius="lg"
                            classNames={{
                                label: "font-bold text-black mb-1",
                                inputWrapper: "h-12 border-gray-200 focus-within:!border-black transition-colors",
                            }}
                            {...formik.getFieldProps("rePassword")}
                            isInvalid={formik.touched.rePassword && !!formik.errors.rePassword}
                            errorMessage={formik.errors.rePassword}
                        />

                        <Input
                            label="Phone"
                            labelPlacement="outside"
                            placeholder="01009000900"
                            variant="bordered"
                            radius="lg"
                            classNames={{
                                label: "font-bold text-black mb-1",
                                inputWrapper: "h-12 border-gray-200 focus-within:!border-black transition-colors",
                            }}
                            {...formik.getFieldProps("phone")}
                            isInvalid={formik.touched.phone && !!formik.errors.phone}
                            errorMessage={formik.errors.phone}
                        />

                        <Button
                            type="submit"
                            className="bg-[#1a1a1a] text-white font-bold h-14 mt-4 text-md shadow-sm active:scale-95 transition-transform"
                            radius="full"
                            isLoading={formik.isSubmitting}
                        >
                            Submit
                        </Button>
                    </form>
                </CardBody>
            </Card>

            {/* الرابط السفلي */}
            <p className="text-gray-600 font-medium">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="text-blue-600 font-bold hover:underline underline-offset-4"
                >
                    Login Now
                </Link>
            </p>
        </div>
    );
}