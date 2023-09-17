interface IButtonProps {
    type:  "button" | "submit" | "reset" | undefined;
    text: string;
    disabled?: boolean;
    isLoading?: boolean;
    onClick?: () => void;
};
export default function RegularBtn({ type, text, ...props }: IButtonProps) {
    return (
        <button
            type={type}
            {...props}
            className={`text-sm py-2 px-10 cursor-pointer rounded ${props.isLoading ? 'bg-gray-300' : 'bg-amber-500'}`}
        >
            {props.isLoading && (
                <span className="flex w-7 animate-spin items-center justify-center">
                  <span className="h-5 w-5 rounded-full border-t-2 border-b-2 border-white"></span>
                </span>
            )}
            {props.isLoading ? "Loading..." : text}
        </button>
    );
}