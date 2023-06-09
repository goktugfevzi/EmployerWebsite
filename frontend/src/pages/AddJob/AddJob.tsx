import React, { useState } from "react";
import "./AddJob.scss";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { IJob } from "../../types/job.type";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addJobUrl } from "../../constants/url.constants";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const AddProduct: React.FC = () => {
  const [job, setJob] = React.useState<Partial<IJob>>({
    departmentIdConverted: "",
    title: "",
    description: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const redirect = useNavigate();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJob({
      ...job,
      [event.target.name]: event.target.value,
    });
  };

  const handleSaveBtnClick = () => {
    console.log(job.departmentIdConverted);
    if (
      job.departmentIdConverted === null ||
      job.title === "" ||
      job.description === "" ||
      job.deadline === ""
    ) {
      alert("Enter Values");
      return;
    }

    if (job.departmentIdConverted !== undefined) {
      job.departmentId = parseInt(job.departmentIdConverted);
    }
    const data: Partial<IJob> = {
      title: job.title,
      description: job.description,
      departmentId: job.departmentId,
      deadline: job.deadline,
    };
    axios
      .post(addJobUrl, data)
      .then((resposne) =>
        redirect("/jobs", {
          state: { message: "Job Created Successfully" },
        })
      )
      .catch((error) => alert("Error"));
  };

  const changeHandlers = (event: SelectChangeEvent<string>) => {
    if (job.departmentIdConverted !== undefined) {
      var departmentId = parseInt(job.departmentIdConverted);
    }
    setJob({
      ...job,
      departmentIdConverted: event.target.value,
    });
  };
  // "department":{
  //     "Id":1,
  //     "Name":"YAZILIM"
  const handleBackBtnClick = () => {
    redirect("/jobs");
  };
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };
  return (
    <div className="add-job">
      <h2>Add New job</h2>
      <TextField
        autoComplete="off"
        label="Title"
        variant="outlined"
        name="title"
        value={job.title}
        onChange={changeHandler}
      />
      <TextField
        autoComplete="off"
        label="description"
        variant="outlined"
        name="description"
        value={job.description}
        onChange={changeHandler}
      />

      <div className="date-picker-container">
        <label>Deadline: </label>
        <DatePicker
          onChange={(date) => handleDateChange(date)}
          value={selectedDate}
          format="dd/MM/yyyy"
          calendarAriaLabel="Toggle calendar"
          clearAriaLabel="Clear value"
          dayAriaLabel="Day"
          monthAriaLabel="Month"
          yearAriaLabel="Year"
          className="date-picker"
        />
      </div>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Department</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={job.departmentIdConverted}
          label="Department"
          onChange={changeHandlers}
        >
          <MenuItem value={1}>YAZILIM</MenuItem>
          <MenuItem value={2}>MUHASEBE</MenuItem>
          <MenuItem value={3}>HR</MenuItem>
        </Select>
      </FormControl>
      <div>
        <Button variant="outlined" color="primary" onClick={handleSaveBtnClick}>
          Save
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleBackBtnClick}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default AddProduct;
