import { useCallback, useState, } from "react";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { TextField, InputAdornment, IconButton,  } from '@mui/material';

const TextBoxPassword = ({setPassword, style, size, label}) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const handleInputChange = useCallback(event => {
        setPassword(event.target.value)
    }, [setPassword]);

    return (
        <TextField label={label}
            type={showPassword ? "text" : "password"}
            className={style}
            onChange={handleInputChange}
            size={size}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                )
            }} />
    );
};
export default TextBoxPassword;