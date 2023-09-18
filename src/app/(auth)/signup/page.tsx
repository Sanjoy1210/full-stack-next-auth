"use client";
import {FormProvider, useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import dynamic from "next/dynamic";
import RegularBtn from "@/components/Buttons/Buttons";
import Link from "next/link";
import {useState} from "react";
import toast from "react-hot-toast";
import axios from "axios";
import {useRouter} from "next/navigation";

const FormInput = dynamic(() => import("../../../components/FormInput/FormInput"), {ssr: false});

export default function SignupPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    };
    const validationSchema = yup.object().shape({
        firstName: yup.string().required("First name is required").trim(),
        lastName: yup.string().required("Last name is required").trim(),
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
            const res = await axios.post("/api/users/signup", values);
            toast.success("Signup successful");
            router.push("/login");
        } catch (e) {
            if (e instanceof Error) {
                toast.error(e.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <h1>Signup Form</h1>
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit((values) => onSubmit(values))}>
                    <div className="mb-2">
                        <FormInput label="First name" name="firstName" type="text" placeholder="John" />
                    </div>
                    <div className="mb-2">
                        <FormInput label="Last name" name="lastName" type="test" placeholder="Doe" />
                    </div>
                    <div className="mb-2">
                        <FormInput label="Email" name="email" type="email" placeholder="john@email.com" />
                    </div>
                    <div className="mb-2">
                        <FormInput label="Password" name="password" type="password" placeholder="*********" />
                    </div>
                    <RegularBtn type="submit" disabled={isLoading} isLoading={isLoading} text="Signup" />
                </form>
            </FormProvider>
            <p className="text-sm mt-2">
                Already have an account? {" "}
                <Link href="/login" className="font-medium">
                    Login
                </Link>
            </p>
        </div>
    )
}