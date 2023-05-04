export interface IJob {
    jobId: number | any;
    description: string;
    title: string;
    deadline: string;
    created: string;
    status: boolean;
    departmentId: number;
    departmentIdConverted: string;
    userId: string;
    userJobId: string;
    responseData: any;
}

// import { IJob } from "./job.type";

// export interface IMessage {
//   code: string;
//   message: string;
//   responseData: IJob[];
// }
