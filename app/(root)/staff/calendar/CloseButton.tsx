import CloseIcon from '@mui/icons-material/Close';
export default function CloseButton({
    setShowModal,
    setNgModal,
    setInterModal,
    setOpen,
}: any) {
    return(
        <>
            <button 
                onClick={() => {setShowModal(false),setNgModal(false),setInterModal(false),setOpen(false)}} 
                className="absolute top-3 right-3"
            >
                <CloseIcon className="w-6 h-6 text-4xl" />
            </button>
        </>
    )
}