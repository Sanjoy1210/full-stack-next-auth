"use client";
import * as yup from "yup";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import RegularBtn from "@/components/Buttons/Buttons";
import Link from "next/link";
import dynamic from "next/dynamic";
import {useState} from "react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const FormInput = dynamic(() => import("../../../components/FormInput/FormInput"), {ssr: false});


export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = yup.object().shape({
        email: yup.string().required("Email is required").trim(),
        password: yup.string().required("Password is required")
    });

    const formMethods = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (values: {}) => {
        try {
            setIsLoading(true);
            const res = await axios.post("/api/users/login", values);
            toast("Login successfully", {duration: 3000, type: "success"});
            router.push("/profile");
        } catch (e) {
            if (e instanceof Error) {
                toast(e.message, {duration: 3000, type: "error"})
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <h1>Login Form</h1>
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit((values) => onSubmit(values))}>
                    <div className="mb-2">
                        <FormInput label="Email" name="email" type="email" placeholder="john@email.com" />
                    </div>
                    <div className="mb-2">
                        <FormInput label="Password" name="password" type="password" placeholder="*********" />
                    </div>
                    <RegularBtn type="submit" disabled={isLoading} isLoading={isLoading} text="Login" />
                </form>
            </FormProvider>
            <p className="text-sm mt-2">
                Don't have an account? {" "}
                <Link href="/signup" className="font-medium">
                    Signup
                </Link>
            </p>
        </div>
    )
}