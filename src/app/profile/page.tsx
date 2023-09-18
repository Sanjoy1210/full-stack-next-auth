"use client";
import axios from "axios";
import Link from "next/link";
import RegularBtn from "@/components/Buttons/Buttons";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {unknown} from "zod";

interface IUser {
    email: string;
    firstName: string;
    lastName: string;
};
export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState({} as IUser);
    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        } catch (e) {
            if (e instanceof Error) {
                toast.error(e.message);
            }
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");

        setUser({
            email: res?.data?.data?.email,
            firstName: res?.data?.data?.firstName,
            lastName: res?.data?.data?.lastName
        });
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    if (!Object?.keys(user as IUser)?.length) {
        return "Loading...";
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <hr />
            <span>
                {user?.email || "hello"}
            </span>
            <RegularBtn type="button" text="Logout" onClick={logout} />
        </div>
    );
}