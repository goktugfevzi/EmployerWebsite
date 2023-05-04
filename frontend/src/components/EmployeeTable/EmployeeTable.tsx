import { IUser } from "../../types/user.type";
import CustomButton from "../CustomButton/CustomButton";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
interface ITableProps {
    data: IUser[];
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    onAdd: () => void;
}

const CustomTable: React.FC<ITableProps> = ({ data, onDelete, onEdit, onAdd }) => {
    return (
        <div className="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Email Confirmed</th>
                        <th>Department</th>
                        <th>process</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => (
                        <tr key={user.id}>
                            <td>{user.userName}</td>
                            <td>{user.email}</td>
                            <td>
                                {user.emailConfirmed === "false" ? "Yes" : "No"}
                            </td>
                            {user.departmentId === 1 ? (
                                <td>Muhasebe</td>
                            ) : user.departmentId === 2 ? (
                                <td>Yazılım</td>
                            ) : (
                                <td>İnsan Kaynakları</td>
                            )}
                            <td>
                                <>
                                    <CustomButton
                                        variant="edit"
                                        onClick={() => onEdit(user.id)} text={""}                                    />
                                    <CustomButton
                                        variant="delete"
                                        onClick={() => onDelete(user.id)} text={""}                                    />
                                </>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <IconButton
                onClick={onAdd}
                className="add-icon-btn"
                sx={{
                    color: "#4CAF50",
                    "&:hover": { bgcolor: "#388E3C" },
                    fontSize: "2rem",
                }}
            >
                <AddIcon />
            </IconButton>
        </div>
    );
};

export default CustomTable;
