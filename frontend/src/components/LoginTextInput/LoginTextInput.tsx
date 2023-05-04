import { FC } from "react";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    SelectChangeEvent,
} from "@mui/material";

interface Props {
    email?: string;
    userName?: string;
    departmenId?: string;
    changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    changeHandlers: (event: SelectChangeEvent<string>) => void;
}
const logintextfield: FC<Props> = ({
    userName,
    email,
    changeHandler,
    departmenId,
    changeHandlers,
}) => {
    return (
        <div>
            <TextField
                autoComplete="on"
                label="Email"
                variant="outlined"
                name="email"
                value={email}
                onChange={changeHandler}
            />
            <TextField
                autoComplete="on"
                label="Username"
                variant="outlined"
                name="userName"
                value={userName}
                onChange={changeHandler}
            />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                    Department
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={departmenId || ""}
                    label="Department"
                    onChange={changeHandlers}
                >
                    <MenuItem value={1}>YAZILIM</MenuItem>
                    <MenuItem value={2}>MUHASEBE</MenuItem>
                    <MenuItem value={3}>HR</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};
export default logintextfield;
