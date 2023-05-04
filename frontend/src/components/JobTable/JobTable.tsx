import { FC } from "react";
import { IJob } from "../../types/job.type";
import { Button } from "@mui/material";

interface Props {
    jobList: IJob[];
    handleJobComplete: (id: string) => void;
}
const JobTable: FC<Props> = ({ jobList, handleJobComplete }) => {
    return (
        <div className="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Deadline</th>
                        <th>Process</th>
                    </tr>
                </thead>
                <tbody>
                    {jobList.map((job) => (
                        <tr key={job.jobId}>
                            <td>{job.title}</td>
                            <td>{job.description}</td>
                            <td>{job.deadline.slice(0, 10)}</td>
                            <td>
                                <Button
                                    variant="contained"
                                    color="error"
                                    sx={{ mx: 3 }}
                                    onClick={() => handleJobComplete(job.jobId)}
                                >
                                    Tamamla
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default JobTable;