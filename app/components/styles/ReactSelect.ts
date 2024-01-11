export const customSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "white",
    borderColor: "#c0c0c0",
    minHeight: "20px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    "&:hover": {
      borderColor: "#a0a0a0",
    },
    width: "150px",
    margin: "4px",
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
  // 他のスタイル定義...
};
