"use client";
import axios from "axios";
import Link from "next/link";
import RegularBtn from "@/components/Buttons/Buttons";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export default function ProfilePage() {
    const [user, setUser] = useState({});
    const router = useRouter();
    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast("Logout successful", {duration: 3000, type: "success"});
            router.push("/login");
        } catch (e) {
            if (e instanceof Error) {
                toast(e.message, {duration: 3000, type: "error"});
            }
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        setUser(res.data.data);
    }

    useEffect(() => {
        getUserDetails();
    }, []);

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