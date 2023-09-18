"use client";

import {Controller, FieldError, FieldErrors, FieldErrorsImpl, Merge, useFormContext} from "react-hook-form";

interface IProps {
    label: string;
    name: string;
    type: string;
    placeholder: string;
};

export default function FormInput({ label, name, type, ...props } : IProps) {
    const { formState, control } = useFormContext();
    const {errors} : { errors?:
            | string
            | FieldError
            | Merge<FieldError, FieldErrorsImpl<any>>
            | undefined
    } = formState;

    const er = errors?.[name]?.message as string;

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <>
                    <div>
                        <label htmlFor={name} className="block text-sm font-medium mb-1">{label}</label>
                        <input
                            type={type || "text"}
                            id={name}
                            {...field}
                            {...props}
                            className="border border-gray-400 opacity-40 p-1.5 rounded focus:outline-none test-sm"
                        />
                    </div>
                    {
                        errors ?
                        <div className="mt-2 block text-sm text-red-500">
                            {er}
                        </div> : null
                    }
                </>
            )}
        />
    )
}