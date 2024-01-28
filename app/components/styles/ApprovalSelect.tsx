export const customSelectStyles = {
    control: (provided: any) => ({
        ...provided,
        backgroundColor: "white",
        minHeight: "20px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        "&:hover": {
            boxShadow: "0 0 10px rgba(0, 0, 255, 0.2)",
        },
        width: "150px",
    }),
    valueContainer: (provided: any) => ({
        ...provided,
        padding: "1px 4px",
    }),
    placeholder: (provided: any) => ({
        ...provided,
        color: "#9a9a9a",
        fontSize: "12px",
        fontWeight: "normal",
    }),
    singleValue: (provided: any) => ({
        ...provided,
        color: "#333",
        fontSize: "14px",
        fontWeight: "500",
    }),
    option: (provided: any) => ({
        ...provided,
        fontSize: "14px",
    }),

};