// import React from "react";

// const CustomInput = React.forwardRef<
//   HTMLInputElement,
//   React.InputHTMLAttributes<HTMLInputElement>
// >((props, ref) => {
//   // CSSプロパティの型を正確に指定
//   const inputStyle: React.CSSProperties = {
//     maxWidth: "340px",
//     width: "100%",
//     height: "45px",
//     padding: "0",
//     outline: "none",
//     border: "none",
//     borderRadius: "6px",
//     textAlign: "center",
//     fontSize: "1rem",
//     backgroundColor: "#1facf3",
//     color: "#ffffff",
//   };

//   return <input style={inputStyle} {...props} ref={ref} readOnly />;
// });

// CustomInput.displayName = "CustomInput";

// export default CustomInput;

import React from "react";
import { TextField, IconButton, Box } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { styled } from "@mui/material/styles";

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 4,
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.primary.main,
    width: "150px", // Adjust width as needed
    height: "30px", // Adjust height as needed
    margin: "4px",
    fontWeight: "500",
    "&:hover fieldset": {
      borderColor: theme.palette.primary.light,
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1b4c6a",
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "1rem", // Reduce font size
    padding: "2px",
  },
}));

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  padding: 2, // Reduced padding
  marginRight: theme.spacing(1),
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1.4rem", // Reduce icon size
  },
}));

type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onClick?: () => void;
};

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ onClick, ...props }, ref) => {
    // colorプロパティを除外
    const { size, color, ...otherProps } = props;

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <CustomTextField
          {...otherProps}
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <CustomIconButton onClick={onClick}>
                <CalendarTodayIcon sx={{ color: "#1facf3" }} />
              </CustomIconButton>
            ),
            readOnly: true,
          }}
          inputRef={ref}
        />
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
