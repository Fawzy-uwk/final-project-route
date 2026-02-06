"use client";
import { signIn } from "next-auth/react";
import { Button, Input, Card, CardBody } from "@heroui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState("");

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Required"),
            password: Yup.string().min(6, "Must be 6 chars").required("Required"),
        }),
        onSubmit: async (values) => {
            setError("");
            const res = await signIn("credentials", {
                ...values,
                redirect: false,
            });

            if (res?.ok) {
                router.push("/");
                router.refresh();
                console.log(values)
            } else {
                setError("Invalid email or password. Please try again.");
            }
        },
    });

    return (
        <div className="min-h-screen py-12 flex flex-col items-center justify-center gap-8 bg-white px-4">
            <h1 className="text-3xl font-bold text-black tracking-tight">
                Welcome Back !
            </h1>

            <Card
                shadow="none"
                className="w-full max-w-[500px] border border-gray-100 rounded-[2.5rem] bg-white p-4"
            >
                <CardBody className="p-8">                    {error && (
                    <div className="bg-red-50 text-red-500 text-xs p-3 rounded-xl mb-6 text-center font-bold border border-red-100">
                        {error}
                    </div>
                )}

                    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
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

                        <Button
                            type="submit"
                            className="bg-[#1a1a1a] text-white font-bold h-14 mt-2 text-md shadow-sm active:scale-95 transition-transform"
                            radius="full"
                            isLoading={formik.isSubmitting}
                        >
                            Submit
                        </Button>
                    </form>
                </CardBody>
            </Card>

            <p className="text-gray-600 font-medium">
                If you don't have account, please{" "}
                <Link
                    href="/register"
                    className="text-blue-600 font-bold hover:underline underline-offset-4"
                >
                    SignUp Now
                </Link>
            </p>
        </div>
    );
}