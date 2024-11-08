import { twMerge } from "tailwind-merge"

export const Button = ({ title, active, className, textClassName, children, ...props }) => {

    return (
        <div className={twMerge(
            `button px-5 h-[40px] bg-[#facc15] rounded-lg cursor-pointer select-none
            active:translate-y-2 active:[box-shadow:0_0px_0_0_#eab308,0_0px_0_0_#facc1541]
            active:border-b-[0px]
            transition-all duration-150 [box-shadow:0_10px_0_0_#eab308,0_15px_0_0_#facc1541]
            border-b-[1px] border-[#eab308] ${className}`,
            active && "translate-y-2 [box-shadow:0_0px_0_0_#eab308,0_0px_0_0_#facc1541] border-b-[0px] bg-[#ffaa2a]"
        )} {...props}>
            {children ? children : <span className={twMerge('flex flex-col justify-center items-center h-full text-white font-bounce text-lg ', textClassName)}>{title}</span>}
        </div>
    )
}
