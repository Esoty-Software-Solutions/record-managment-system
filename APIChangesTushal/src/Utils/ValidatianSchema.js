import * as Yup from "yup";
import moment from "moment"

export const LoginForm = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is Required"),
});
export const DoctorForm = Yup.object().shape({
  first: Yup.string().required("First Name is required"),
  middle: Yup.string().required("Middle Name is required"),
  last: Yup.string().required("Last Name is required"),
  gender: Yup.string().required("Gender is required"),
  specialty: Yup.string().required("Specialty is required"),
  level: Yup.string().required("Level is required"),
  birthdate: Yup.string()
    .required("DOB is Required")
    .test(
      "DOB",
      "Birth Year Must Be Greater Than 18 Year",
      (date) => moment().diff(moment(date), "years") >= 18
    ),
  // first: "",
  // middle: "",
  // last: "",
  // gender: "",
  // birthdate: "",
  // specialty: "",
  // level: "",
});
export const MedicalForm = Yup.object().shape({
  centername: Yup.string().required("Center Name is required"),
  address: Yup.string().required("Address is required"),
  district: Yup.string().required("District is required"),
  city: Yup.string().required("City is required"),

  phone: Yup.array().of(
    Yup.object().shape({
      mobile: Yup.string()
        .required("Phone Number is required")
        .matches(
          /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/,
          "Please Enter Valid Phone Number"
        ),
    })
  ),

  // facbooklink: Yup.string().required("Facbooklink is required"),
  // weblink: Yup.string().required("WebLink is required"),
});
