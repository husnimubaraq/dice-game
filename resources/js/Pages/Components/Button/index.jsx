
export const Button = ({ title, className, children }) => {

    return (
        <div className={`button px-5 h-[40px] bg-[#facc15] rounded-lg cursor-pointer select-none
            active:translate-y-2 active:[box-shadow:0_0px_0_0_#eab308,0_0px_0_0_#facc1541]
            active:border-b-[0px]
            transition-all duration-150 [box-shadow:0_10px_0_0_#eab308,0_15px_0_0_#facc1541]
            border-b-[1px] border-[#eab308] ${className}`}>
            {children ? children : <span className='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>{title}</span>}
        </div>
    )
}
