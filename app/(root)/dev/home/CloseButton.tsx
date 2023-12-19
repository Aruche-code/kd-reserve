export default function CloseButton({
    setShowModal,
    setNgModal,
    setInterModal,
}: any) {
    return(
        <>
            <button 
                onClick={() => {setShowModal(false),setNgModal(false),setInterModal(false)}} 
                className="absolute top-3 right-3"
            >
                <svg 
                className="w-6 h-6 text-4xl" 
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg" 
                >
                <path  
                    strokeLinecap="round"
                    strokeLinejoin="round"  
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                />
                </svg>
            </button>
        </>
    )
}