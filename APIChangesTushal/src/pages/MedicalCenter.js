import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Col,
  OverlayTrigger,
  ProgressBar,
  Row,
  Table,
  Modal,
  Tooltip,
} from "react-bootstrap";
import _ from "lodash";

import { TiTick } from "react-icons/ti";
// import { Provider, defaultTheme } from "@adobe/react-spectrum";
import { AiFillDelete } from "react-icons/ai";
// import { Link, useNavigate } from "react-router-dom";

import { Formik, FieldArray, Field, ErrorMessage } from "formik";
import ErrorComponent from "../Utils/ErrorComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  AddMedical,
  CityList,
  DeleteSchdeule,
  DeleteSchdeuleOneByOne,
  DoctorListForForm,
  GetSchedulesByDoctorForScdhule,
  GetSchedulesByMedical,
  GetSchedulesByMedicalNEw,
  MedicalCenterList,
  UpdateMedicals,
  createSchedulesByDoctorForScdeule,
  createSchedulesByMedical,
  createSchedulesByMedicalForScdeule,
  getTimeSlotEnum,
  updateMedicalSchedule,
} from "../redux/actions/action";
import Swal from "sweetalert2";
import { MedicalForm } from "../Utils/ValidatianSchema";
import moment from "moment";
import AddDocotorToMedical from "../Component/Modals/AddDoctorToMedicalModal";
import AddNewMedicalModal from "../Component/Modals/AddNewMedicalModal";
import UpdateMedical from "../Component/Modals/UpdateMedicalModal";
import Link from "next/link";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";

function MedicalCenter() {
  const dispatch = useDispatch();
  const [limit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [searchQuery, setsearchQ] = useState("");
  const { city_list, medica_res, schedule_res_medical, schdule_update_list } =
    useSelector((state) => state.fetchdata);
  const {
    add_medical_res,
    update_medical_res,
    update_schedule_res,
    delete_schedule,
    delete_schedule_one_by_one,
    create_schdeule_Res_to_doctor,
  } = useSelector((state) => state.submitdata);
  const [cityList, setCityList] = useState([]);
  const [data, setData] = useState([]);
  const [sidebarList, setScheduleList] = useState([]);
  // const onDatesChange = ({ startDate, endDate }) => {};

  const [loader, setLoader] = useState(false);
  const [loader1, setLoader1] = useState(false);

  const [searchq, SetsearchQuery] = useState("");
  const [filterview, setfilterView] = useState(true);

  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const [updatemodal, setUpdateModal] = useState(false);
  const [editprofiles, setEditProfile] = useState();
  const [editsidecomponent, setEditSideComponent] = useState(false);
  const [medicaldata, setMedicalData] = useState([]);
  const [sidebarloader, setSidebarLoader] = useState(false);
  const [stopapi, setStopAPi] = useState(false);
  const [week, setWeekWithDate] = useState([]);
  const [week1, setWeekWithDate1] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [timeSlotList, setTimeSlotList] = useState([]);
  // const [startDate, endDate] = dateRange;
  const [top, setTop] = useState();
  const [cityfilter, setCityFilter] = useState("");

  useEffect(() => {
    dispatch(DoctorListForForm(0, 500));
    dispatch(getTimeSlotEnum(0, 500));
    return () => {
      dispatch({ type: "GET_DOCTOR_LIST_FORM", payload: "" });
      dispatch({ type: "GET_TIMESLOT_LIST", payload: "" });
    };
  }, []);

  const { get_doctor_list_form, time_Slot_list } = useSelector(
    (state) => state.fetchdata
  );
  const { cretate_schedule_res } = useSelector((state) => state.submitdata);
  const [nextRow, setNextRow] = useState([]);
  const [prevRow, setPreviousRow] = useState([]);
  useEffect(() => {
    if (time_Slot_list) {
      if (time_Slot_list?.data?.statusCode == "200") {
        setTimeSlotList(time_Slot_list?.data?.data?.objectArray);
      } else {
        Swal.fire({
          icon: "error",
          text: "Something Went Wrong In Doctor List API",
        });
      }
    }
  }, [time_Slot_list]);
  useEffect(() => {
    if (get_doctor_list_form) {
      if (get_doctor_list_form?.data?.statusCode == "200") {
        setDoctorList(get_doctor_list_form?.data?.data?.objectArray);
      } else {
        Swal.fire({
          icon: "error",
          text: "Something Went Wrong In Doctor List API",
        });
      }
    }
  }, [get_doctor_list_form]);

  const editProfile = (e, data, schedule) => {
    e.preventDefault();
    // console.log("ssss", data, schedule);
    setEditProfile(data._id);
    if (editprofiles == data._id) {
      console.log("data", data);
      setEditProfile();
      setWeekWithDate([
        {
          startDate: data.startDate,
          price: data.price,
          endDate: data.endDate,
          timeSlot: null,
          // timeSlotId: null,
          sunday: "",
          monday: "",
          tuesday: "",
          wednesday: "",
          thursday: "",
          friday: "",
          saturday: "",
          scheduleId: data?._id,
        },
      ]);
    } else {
      setWeekWithDate([]);
      // console.log("hello  else")

      schedule?.map((val, index) => {
        return setWeekWithDate((pre) => [
          ...pre,
          {
            timeSlot: val?.timeSlot?._id,
            price: val?.price,

            // timeSlotId: val?.timeSlotId,
            startDate: val?.startDate,
            endDate: val?.endDate,
            sunday: val?.sunday,
            monday: val?.monday,
            tuesday: val?.tuesday,
            wednesday: val?.wednesday,
            thursday: val?.thursday,
            friday: val?.friday,
            saturday: val?.saturday,
            scheduleId: val?._id,
          },
        ]);
      });
      setEditProfile(data._id);
      // console.log("dats", datas);
      // setTotalWeekLength(datas?.length);
    }
  };

  console.log("week", week);
  const EditSideComponent = (e, dataa, index) => {
    // console.log("currentvalue", dataa, index);

    e.preventDefault();
    setsearchQ("");
    setMedicalData(dataa);
    localStorage.setItem("medicalid", dataa?._id);

    const list = data;
    // const FindIndex = list?.findIndex((r) => r.id == list.id);

    // first Row Click
    // if (index == 0) {
    //   if (list[index + 1]) {
    //     setNextRow(list[index + 1]);
    //   }
    // }
    //mediumRow click
    // if (index >= 0) {
    //   if (list[index + 1]) {
    //     setNextRow(list[index + 1]);
    //   }
    //   if (list[index - 1]) {
    //     setPreviousRow(list[index - 1]);
    //   }
    // }

    // last row
    // if (index == data?.length) {
    //   if (list[index - 1]) {
    //     setPreviousRow(list[index - 1]);
    //   }
    // }

    setNextRow(list[index + 1]);
    setPreviousRow(list[index - 1]);
    // if (list[index + 1]) {
    // }
    // if (list[index - 1]) {
    // }
    setEditSideComponent(true);
    setSidebarLoader(true);
    dispatch(GetSchedulesByMedicalNEw(dataa?._id));
    // dispatch(GetSchedulesByMedical(dataa?._id));
  };

  // console.log("Medicaldata",medicaldata)
  // const [searchfilter, setSearchFiter] = useState("");
  const [count, setObjectCount] = useState();

  const [sidebarListloader, setSidebarListLoader] = useState(false);

  const APICall = (value) => {
    if (stopapi === false) {
      setLoader(true);
      setLoader1(true);
      dispatch(MedicalCenterList(skip, limit, cityfilter, value));
    }
  };
  useEffect(() => {
    APICall();
  }, [skip, stopapi, cityfilter]);

  useEffect(() => {
    dispatch(CityList(0, 500));
  }, []);

  useEffect(() => {
    if (city_list) {
      if (city_list?.data?.statusCode == "200") {
        // setLoader(false);
        console.log("city_LISt", cityList);
        setCityList(city_list?.data?.data?.objectArray);
      } else {
        Swal.fire({
          icon: "error",
          text: "Something Went Wrong",
        });
      }
    }
  }, [city_list]);

  useEffect(() => {
    if (add_medical_res) {
      if (add_medical_res?.data?.statusCode == "200") {
        // setSkip(0);

        Swal.fire({
          icon: "success",
          text: add_medical_res?.data?.message,
        });

        // setSkip(0)
        // setLimit((pre) => pre + 10)

        setStopAPi(false);
        setCityFilter("");
        setEditProfile();
        setEditSideComponent();
        setMedicalData([]);
        setEditSideComponent(false);
        dispatch(MedicalCenterList(skip, limit, cityfilter));

        // dispatch(MedicalCenterList(skips, limit, ""));
        // setData((pre) => [...pre, ...add_medical_res?.data?.data]);
      } else if (add_medical_res?.error?.startsWith("ValidationError")) {
        Swal.fire({
          icon: "error",
          text: add_medical_res?.error?.substr(0, 40),
        });
      }
      // else {
      //   Swal.fire({
      //     icon: "error",
      //     text: add_medical_res,
      //   });
      // }
    }
    dispatch({ type: "ADD_MEDICAL_RES", payload: "" });
  }, [add_medical_res]);

  useEffect(() => {
    if (update_medical_res) {
      // console.log("sss1", update_medical_res?.data?.data?.objectArray);
      if (update_medical_res?.data?.statusCode == "200") {
        // setSkip(0);
        setData([]);
        Swal.fire({
          icon: "success",
          text: update_medical_res?.data?.message
            ? update_medical_res?.data?.message
            : "Success",
        });

        // setSkip(0)
        // setLimit((pre) => pre + 10)

        setStopAPi(false);
        setCityFilter("");
        setEditProfile();
        // setEditSideComponent();
        setMedicalData([]);
        setEditSideComponent(false);
        setSkip(0);
        dispatch(MedicalCenterList(0, limit, ""));
        // setData((pre) => [...pre, ...update_medical_res?.data?.data]);
      } else {
        Swal.fire({
          icon: "error",
          text: update_medical_res,
        });
      }
    }
    dispatch({ type: "UPDATE_MEDICAL_RES", payload: "" });
  }, [update_medical_res]);

  useEffect(() => {
    if (cretate_schedule_res && update_schedule_res == "") {
      if (cretate_schedule_res?.data?.statusCode == "200") {
        setEditProfile();
        setWeekWithDate();
        setWeekWithDate1();
        setSidebarLoader(true);
        dispatch(GetSchedulesByMedicalNEw(medicaldata?._id));
        // dispatch(GetSchedulesByMedical(medicaldata?._id));
        // dispatch(GetSchedulesByMedical(medicaldata?.medicalCenterId));
        // setData(cretate_schedule_res?.data?.data?.objectArray);
        Swal.fire({
          icon: "success",
          // text: cretate_schedule_res?.data?.message,
          text: "success",
          timer: 2000,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "SomeThing Went Wrong",
          timer: 2000,
        });
      }
      setLoader(false);
    }
    return () => {
      dispatch({ type: "CREATE_SCHEDULE_API_RES", payload: "" });
    };
  }, [cretate_schedule_res]);

  useEffect(() => {
    if (create_schdeule_Res_to_doctor) {
      if (create_schdeule_Res_to_doctor?.data?.statusCode == "200") {
        setEditProfile();
        setWeekWithDate();
        setWeekWithDate1();
        // dispatch(GetSchedulesByMedicalNEw(medicaldata?._id));
        dispatch(GetSchedulesByMedicalNEw(medicaldata?._id));
        // Swal.fire({
        //   icon: "success",
        //   text: create_schdeule_Res_to_doctor?.data?.message,
        //   timer: 2000,
        // });
      } else {
        Swal.fire({
          icon: "error",
          text: create_schdeule_Res_to_doctor,
          timer: 2000,
        });
      }
      setLoader(false);
    }
    return () => {
      dispatch({ type: "CREATE_SCHEDULE_API_RES_SCDHULE", payload: "" });
    };
  }, [create_schdeule_Res_to_doctor]);

  useEffect(() => {
    if (update_schedule_res) {
      if (
        update_schedule_res?.data?.statusCode == "200" ||
        update_schedule_res?.data?.statusCode == "201" ||
        update_schedule_res
      ) {
        setEditProfile();
        setWeekWithDate();
        setWeekWithDate1();
        // dispatch(GetSchedulesByMedical(data?._id));
        dispatch(GetSchedulesByMedicalNEw(medicaldata?._id));
        // setData(update_schedule_res?.data?.data?.objectArray);
        Swal.fire({
          icon: "success",
          text: "Schedule Update SuccessFully",
          timer: 2000,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "SomeThing Went Wrong",
          timer: 2000,
        });
      }
      setLoader(false);
    }
    return () => {
      dispatch({ type: "UPDATE_SCHEDULE_API_RES", payload: "" });
    };
  }, [update_schedule_res]);

  useEffect(() => {
    if (medica_res) {
      if (medica_res?.data?.statusCode == "200") {
        // setData(medica_res?.data?.data?.objectArray);
        setLoader1(false);

        if (skip == 0) {
          setData(medica_res?.data?.data?.objectArray);
          setObjectCount(medica_res?.data?.data?.objectCount);
          // setLoadMoreAlwways(true);
        } else {
          let common = _?.differenceBy(
            medica_res?.data?.data?.objectArray,
            data,
            "_id"
          );
          setData((pre) => [...pre, ...common]);

          // console.log("common_array", common)
          // setData((pre) => [...pre, ...common_array]);
          setLoader(false);
          setObjectCount(medica_res?.data?.data?.objectCount);
        }

        // if (medica_res?.data?.data?.objectCount == data?.length) {
        //   setStopAPi(true);
        //   setLoader(false);
        // }
        // if (medica_res?.data?.data?.objectCount > data?.length) {
        //   setStopAPi(false);
        //   setLoader(false);
        // }
      } else {
        Swal.fire({
          icon: "error",
          text: "SomeThing Went Wrong",
          timer: 2000,
        });
      }
      setLoader(false);
    }
    return () => {
      dispatch({ type: "GET_DATA_MEDICAL_RESPONSE", payload: "" });
    };
  }, [medica_res]);

  useEffect(() => {
    // console.log("data", count, data?.length)

    // if (count == data?.length) {
    //   setStopAPi(true);
    //   setLoadMoreAlwways(false)
    // }
    // if (data_res?.data?.data?.objectCount >= data?.length) {
    // if (count > data?.length ) {
    //   setStopAPi(false);
    //   setLoadMoreAlwways(true)
    // }
    // if (count > data?.length) {
    //   setStopAPi(false);
    // }

    if (count <= skip + limit) {
      setStopAPi(true);
      // setLoadMoreAlwways(false);
    } else {
      setStopAPi(false);
      setLoader(false);
    }
  }, [count, data]);

  // function handleScroll(e) {
  //   e.preventDefault();
  //   setTop(document.documentElement.scrollTop);

  //   if (top !== document.documentElement.scrollTop) {
  //     if (
  //       window.innerHeight + document.documentElement.scrollTop + 1 >=
  //       document.documentElement.scrollHeight
  //     ) {
  //       setLoader(true);
  //       setSkip((pre) => pre + 5);
  //     }
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const LoadMore = () => {
    if (stopapi === false) {
      setLoader(true);
      // setSkip((pre) => pre + 5);
      setSkip((pre) => pre + 10);
      setSidebarLoader(false);
      setEditSideComponent(false);
      setMedicalData([]);
    } else {
      setLoader(false);
    }
  };

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const optimizedFn = useCallback(
    debounce((valu) => {
      setLoader(true);
      APICall(valu);
      setData([]);
    }),
    []
  );

  // get sidebar list api respons
  useEffect(() => {
    if (schedule_res_medical) {
      if (schedule_res_medical?.data?.statusCode == "200") {
        setScheduleList(schedule_res_medical?.data?.data?.objectArray);
        setSidebarListLoader(false);
        setSidebarListLoader(false);
      } else {
        Swal.fire({
          icon: "error",
          text: schedule_res_medical,
          timer: 2000,
        });
        setEditSideComponent(false);
      }
      setSidebarLoader(false);
      setSidebarListLoader(false);
    }
    return () => {
      dispatch({ type: "GET_SCHEDULES_RES_MEDICAL", payload: "" });
    };
  }, [schedule_res_medical]);

  const setWeekState = (e, index, weekdays) => {
    e.preventDefault();
    let newState = [...week];
    newState[index][weekdays] = e.target.checked;
    setWeekWithDate1(newState);
  };
  const setWeekPrice = (e, index) => {
    e.preventDefault();
    let newState = [...week];
    newState[index].price = parseInt(e.target.value);
    setWeekWithDate1(newState);
  };

  // const SetNewWeekValue = () => {
  //   setWeekWithDate((pre) => [
  //     ...pre,
  //     {
  //       timeslot: "",
  //       startDate: "",
  //       endDate: "",
  //       sunday: false,
  //       monday: false,
  //       tuesday: false,
  //       wednesday: false,
  //       thursday: false,
  //       friday: false,
  //       saturday: false,
  //     },
  //   ]);
  // };

  const SetNewWeekValue = (e, val) => {
    e.preventDefault();
    setWeekWithDate((pre) => [
      ...pre,
      {
        timeSlot: null,
        // timeSlotId: null,
        startDate: "2023-04-05",
        endDate: "2025-02-03",
        price: 25,
        sunday: true,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
      },
    ]);

    // const data = {
    //   medicalCenterId: medicaldata?.medicalCenterId,
    //   doctorId: val?.doctorId,
    //   timeslot: "morning",
    //   startDate: "2023-04-05",
    //   endDate: "2025-02-03",
    //   price: 25,
    //   sunday: false,
    //   monday: true,
    //   tuesday: false,
    //   wednesday: false,
    //   thursday: false,
    //   friday: false,
    //   saturday: false,
    // };
    // // console.log("val",val)
    // dispatch(createSchedulesByMedicalForScdeule(data));
  };

  const SetWeekDate = (e, index, date) => {
    e.preventDefault();
    let newState = [...week];
    newState[index][date] = e.target.value;
    setWeekWithDate1(newState);

    // console.log(moment(new Date(date)).format("DD-MMM-YYYY"));
  };

  const SetWeekEndDate = (e, index, date) => {
    e.preventDefault();
    let newState = [...week];
    newState[index][date] = e.target.value;
    setWeekWithDate1(newState);

    // console.log(moment(new Date(date)).format("DD-MMM-YYYY"));
  };

  const DeleteRow = (e, index) => {
    e.preventDefault();
    let data = [...week];
    data.splice(index, 1);
    // console.log("index", data);
    setWeekWithDate(data);
  };

  const setTimeSlot = (e, index) => {
    e.preventDefault();
    let newState = [...week];
    newState[index].timeSlot = e.target.value;
    // newState[index].timeSlotId = e.target.value;
    setWeekWithDate1(newState);
  };
  useEffect(() => {
    if (week1) {
      let data = [...week1];
      setWeekWithDate(data);
    }
  }, [week1]);

  const [updateapires, setUpateApi] = useState();
  const [price, setPrice] = useState();
  const UpdateScdehule = (e, scid, docid, docobject, schdeuleList) => {
    e.preventDefault();
    setSidebarLoader(true);
    setsearchQ("");
    // console.log("sss");
    // let data = {
    //   doctorId: docid,
    //   medicalCenterId: medicaldata?.medicalCenterId,
    //   timeslot: week[0]?.timeslot,
    //   startDate: week[0]?.startDate,
    //   endDate: week[0]?.endDate,
    //   sunday: week[0]?.sunday,
    //   monday: week[0]?.monday,
    //   tuesday: week[0]?.tuesday,
    //   wednesday: week[0]?.wednesday,
    //   thursday: week[0]?.thursday,
    //   friday: week[0]?.friday,
    //   price: 52,
    //   saturday: week[0]?.saturday,
    // };

    // dispatch(updateMedicalSchedule(id, data));

    const newRow = week.filter((val) => {
      return !val?.scheduleId;
    });

    const oldRow = week.filter((val) => {
      return val?.scheduleId;
    });

    // console.log("week",week,newRow,oldRow)

    if (newRow) {
      for (let i = 0; i < newRow?.length; i++) {
        if (newRow[i]?.price < 0) {
          setSidebarLoader(false);
          return Swal.fire({
            text: "Price Must Be Greater Then Or Equal To Zero",
            icon: "error",
          });
        }
      }
      for (let i = 0; i < newRow?.length; i++) {
        const data = {
          medicalCenterId: medicaldata?._id,
          doctorId: docobject?._id,
          timeSlot: newRow[i]?.timeSlot ? newRow[i]?.timeSlot : null,
          // timeslot: newRow[i]?.timeslot,
          startDate: newRow[i]?.startDate,
          endDate: newRow[i]?.endDate,
          sunday: newRow[i]?.sunday,
          monday: newRow[i]?.monday,
          tuesday: newRow[i]?.tuesday,
          wednesday: newRow[i]?.wednesday,
          thursday: newRow[i]?.thursday,
          friday: newRow[i]?.friday,
          price: newRow[i].price,
          saturday: newRow[i]?.saturday,
        };
        dispatch(createSchedulesByMedicalForScdeule(data));
      }
    }

    if (oldRow) {
      for (let i = 0; i < oldRow?.length; i++) {
        if (oldRow[i]?.price < 0) {
          setSidebarLoader(false);
          return Swal.fire({
            text: "Price Must Be Greater Then Or Equal To Zero",
            icon: "error",
          });
        }
      }
    }

    for (let i = 0; i < oldRow?.length; i++) {
      setUpateApi(true);
      let data = {
        // timeslot: oldRow[i]?.timeslot,
        timeSlot: oldRow[i]?.timeSlot ? oldRow[i]?.timeSlot : null,

        startDate: oldRow[i]?.startDate,
        endDate: oldRow[i]?.endDate,
        sunday: oldRow[i]?.sunday,
        monday: oldRow[i]?.monday,
        tuesday: oldRow[i]?.tuesday,
        wednesday: oldRow[i]?.wednesday,
        thursday: oldRow[i]?.thursday,
        friday: oldRow[i]?.friday,
        price: oldRow[i].price,

        saturday: oldRow[i]?.saturday,
      };
      dispatch(updateMedicalSchedule(oldRow[i]?.scheduleId, data));
    }
    setUpateApi(false);
  };

  useEffect(() => {
    if (schdule_update_list) {
      if (schdule_update_list?.data?.statusCode == "200") {
        // setMedicalData([]);
        // setWeekWithDate();
        // setWeekWithDate1();
        // setEditProfile([]);
        // dispatch(GetSchedulesByMedical(medicaldata?._id));
        dispatch(GetSchedulesByMedicalNEw(medicaldata?._id));
        // setScheduleList(schdule_update_list?.data?.data?.objectArray);
        setSidebarListLoader(false);
        setSidebarLoader(false);
      } else {
        Swal.fire({
          icon: "error",
          text: schdule_update_list,
          timer: 2000,
        });
        setSidebarListLoader(false);
        setSidebarLoader(false);
      }
    }
    return () => {
      dispatch({ type: "GET_SCHEDULES_RES_DOCTOR_SCHEDULE", payload: "" });
    };
  }, [schdule_update_list]);

  const DeleteScdule = (e, val) => {
    e.preventDefault();
    setSidebarLoader(true);
    // console.log("valsss",val)
    dispatch(DeleteSchdeule(val?.scheduleId));
  };

  useEffect(() => {
    if (delete_schedule) {
      if (
        delete_schedule?.data?.statusCode == "200" ||
        delete_schedule?.data?.statusCode == "201" ||
        delete_schedule
      ) {
        setWeekWithDate();
        setSidebarLoader(false);
        setWeekWithDate1();
        setEditProfile([]);
        // dispatch(GetSchedulesByMedical(medicaldata?._id));
        dispatch(GetSchedulesByMedicalNEw(medicaldata?._id));
        Swal.fire({
          icon: "success",
          text: "Success",
          timer: 2000,
        });
      } else {
        // Swal.fire({
        //   icon: "error",
        //   text: delete_schedule?.message,
        //   timer: 2000,
        // });
      }
      setSidebarLoader(false);

      // setLoader(false);
    }
    return () => {
      dispatch({ type: "DELETE_SCHEDULE_RES", payload: "" });
    };
  }, [delete_schedule]);

  useEffect(() => {
    if (
      update_schedule_res &&
      updateapires === false &&
      cretate_schedule_res == ""
    ) {
      if (
        update_schedule_res?.data?.statusCode == "200" ||
        update_schedule_res?.data?.statusCode == "201" ||
        update_schedule_res
      ) {
        // setWeekWithDate();
        // setWeekWithDate1();
        // setEditProfile([]);
        // dispatch(GetSchedulesByMedical(medicaldata?._id));
        dispatch(GetSchedulesByMedicalNEw(medicaldata?._id));
        // Swal.fire({
        //   icon: "success",
        //   text: "Schedule Update SuccessFully",
        //   timer: 2000,
        // });
      } else {
        // Swal.fire({
        //   icon: "error",
        //   text: "Schedule Not Updated",
        //   timer: 2000,
        // });
      }
      setLoader(false);
    }
    return () => {
      dispatch({ type: "UPDATE_SCHEDULE_API_RES", payload: "" });
    };
  }, [update_schedule_res]);

  const [totalshdule, setTotalSchduleLenght] = useState(false);
  const DeleteAllSchdeule = (e, val) => {
    e.preventDefault();
    // console.log("val", val);
    const scduleList = val?.scheduleList?.map((v) => {
      return v._id;
    });

    for (let i = 0; i < scduleList?.length; i++) {
      dispatch(DeleteSchdeuleOneByOne(scduleList[i]));
    }
    setTotalSchduleLenght(true);
  };

  useEffect(() => {
    if (delete_schedule_one_by_one && totalshdule) {
      if (
        delete_schedule_one_by_one?.data?.statusCode == "200" ||
        delete_schedule_one_by_one?.data?.statusCode == "201" ||
        delete_schedule_one_by_one
      ) {
        // setLoader(true)
        setWeekWithDate();
        setSidebarLoader(false);
        setWeekWithDate1();
        setEditProfile([]);

        // dispatch(GetSchedulesByMedical(medicaldata?._id));
        dispatch(GetSchedulesByMedicalNEw(medicaldata?._id));
        Swal.fire({
          icon: "success",
          text: "Success",
          timer: 2000,
        });
      } else {
        // Swal.fire({
        //   icon: "error",
        //   text: delete_schedule_one_by_one?.message,
        //   timer: 2000,
        // });
      }
      setSidebarLoader(false);

      // setLoader(false);
    }
    return () => {
      dispatch({ type: "DELETE_SCHEDULE_RES_ONE_BY_ONE", payload: "" });
    };
  }, [delete_schedule_one_by_one]);

  const tableRef = useRef();
  useEffect(() => {
    document.addEventListener("keydown", checkKey);

    return () => document.removeEventListener("keydown", checkKey);
  }, [nextRow, prevRow]);

  function checkKey(e) {
    // e.stopPropagation();
    e = e || window.event;

    if (e.keyCode == "38") {
      // up arrow
      const preRowCol = prevRow;
      const list = [...data];
      const Index = list?.findIndex((r) => r._id == preRowCol?._id);

      // if (Index > 0) {

      // }
      // else {
      //   setPreviousRow(list[0]);
      //   setNextRow(list[2]);
      // }

      // console.log("last", Index, list[Index]?.medicalCenterId);
      if (list[Index - 1]?._id !== undefined) {
        setEditSideComponent(true);
        setSidebarLoader(true);
        // dispatch(GetSchedulesByMedicalNEw(list[Index - 1]?._id));
        dispatch(GetSchedulesByMedicalNEw(list[Index - 1]?._id));
        setPreviousRow(list[Index - 1]);
        setNextRow(list[Index + 1]);
        setMedicalData(list[Index]);
      }
      if (Index == 0) {
        setEditSideComponent(true);
        setSidebarLoader(true);
        // dispatch(GetSchedulesByMedical(list[Index]?._id));
        dispatch(GetSchedulesByMedicalNEw(list[Index]?._id));
        setPreviousRow(list[0]);
        setNextRow(list[Index + 1]);
        setMedicalData(list[Index]);
      }
    } else if (e.keyCode == "40") {
      const NextRowCol = nextRow;
      const list = [...data];
      const Index = list?.findIndex((r) => r._id == NextRowCol._id);

      if (list[Index - 1]?._id !== undefined) {
        setEditSideComponent(true);
        setSidebarLoader(true);

        setNextRow(list[Index + 1]);
        setPreviousRow(list[Index - 1]);
        // dispatch(GetSchedulesByMedical(list[Index]?._id));
        dispatch(GetSchedulesByMedicalNEw(list[Index]?._id));
        setMedicalData(list[Index]);
      }
    }
  }
  const { formatMessage: covert } = useIntl();
  const { locale } = useRouter();

  // schdule searchList

  const APICall1 = (value) => {
    // console.log("medicaldata1", medicaldata?._id);
    let id = localStorage.getItem("medicalid");

    dispatch(GetSchedulesByMedicalNEw(id, value));
  };
  const debounce1 = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const optimizedFn1 = useCallback(
    debounce1((valu) => {
      APICall1(valu);
      setScheduleList([]);
      setSidebarListLoader(true);
      // setDoctorList([]);
    }),
    []
  );

  console.log("week", week);
  return (
    <div>
      <div className="main-content">
        <div className="flter-section">
          <div className={filterview ? "mt-4" : "removefltr"}>
            <div className="slct-srt">
              <Row>
                <Col md={4}>
                  <div className="flter d-inline">
                    <label>{covert({ id: "City" })}</label>
                    <select
                      value={cityfilter}
                      onChange={(e) => {
                        setSkip(0);
                        setStopAPi(false);
                        setMedicalData([]);
                        setEditSideComponent(false);
                        setCityFilter(e.target.value);
                      }}
                    >
                      <option value="" selected>
                        {covert({
                          id: "Select City",
                        })}
                      </option>
                      {cityList &&
                        cityList?.map((ss, s) => (
                          <option value={ss._id} key={s}>
                            {/* // <option val={ss.cityName} key={s}> */}
                            {locale == "ar" ? ss?.arabicName : ss?.englishName}
                          </option>
                        ))}
                    </select>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="filter-chek mt-4">
                    <div className="srch-text ">
                      <input
                        type="text"
                        placeholder={covert({ id: "Search" })}
                        onChange={(e) => {
                          setSidebarLoader(false);
                          setEditSideComponent(false);
                          setMedicalData([]);
                          setLoader(true);
                          optimizedFn(e.target.value);
                        }}
                        // value={searchq}
                      />
                      <img src={"/assets/images/srch-1.svg"} alt="img" />
                    </div>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="benfits-btn agn-btn">
                    <button onClick={() => setModalShow1(true)}>
                      {/* + Add New Data */}
                      {covert({ id: "AddNewData" })}
                    </button>
                    <AddNewMedicalModal
                      show={modalShow1}
                      onHide={() => setModalShow1(false)}
                      cityNames={cityList}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>

        <div className="data-mdcl-cntr">
          <Row>
            <Col lg={editsidecomponent ? 8 : 12} md={12}>
              <div className="restet-tble">
                {/* <h3>Medical Centers</h3> */}
                <h3>{covert({ id: "MedicalCenter" })}</h3>
                <div
                  className={
                    "data-tble fixheder-tbl mdcl-cntr short-ss new-tble-sec"
                  }
                >
                  {/* <Table className="table-responsive" onScroll={handleScroll}> */}
                  <Table>
                    <thead>
                      <tr>
                        <th>{covert({ id: "Center ID" })}</th>
                        <th>{covert({ id: "CenterName" })}</th>
                        <th>{covert({ id: "Description" })}</th>
                        <th>{covert({ id: "Address" })}</th>
                        <th>{covert({ id: "City" })}</th>
                        <th>{covert({ id: "Contact" })}</th>
                        <th>{covert({ id: "links" })}</th>
                      </tr>
                    </thead>

                    <tbody>
                      {data &&
                        data?.map((val, is) => (
                          <tr
                            onClick={(e) => {
                              setEditProfile();
                              setWeekWithDate([]);
                              setWeekWithDate1([]);
                              setMedicalData([]);
                              EditSideComponent(e, val, is);
                            }}
                            key={is}
                            className={
                              val?._id == medicaldata?._id ? "active" : ""
                            }

                            // onKeyDown={(e) => console.log("edfsdfsdf", e)}
                            // onKeyDownCapture={(e)=>console.log("EVE",e.target)}
                          >
                            <td>{val?._id}</td>
                            <td>{val?.name}</td>
                            <td>
                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip id={`tooltip-${is}`}>
                                    {val?.description}
                                  </Tooltip>
                                }
                              >
                                <p>
                                  {val?.description?.substr(0, 10)}

                                  {val?.description?.substring(10) ? (
                                    <>....</>
                                  ) : (
                                    ""
                                  )}
                                </p>
                              </OverlayTrigger>
                            </td>
                            <td>
                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip id={`tooltip-${is}`}>
                                    {val?.address}
                                  </Tooltip>
                                }
                              >
                                <p>
                                  {val?.address?.substr(0, 10)}

                                  {val?.address?.substring(10) ? <>....</> : ""}
                                </p>
                              </OverlayTrigger>
                            </td>
                            <td>
                              {val?.district},
                              {locale == "ar"
                                ? val?.city?.arabicName
                                : val?.city?.englishName}{" "}
                              <span>
                                <img
                                  src={"/assets/images/add-pin.svg"}
                                  alt="img"
                                />
                              </span>
                            </td>
                            <td>
                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip id={`tooltip-${is}`}>
                                    {val?.phoneNumber?.map((vas, k) => (
                                      <span key={k}>
                                        {vas}
                                        <br />
                                      </span>
                                    ))}
                                  </Tooltip>
                                }
                              >
                                <p>
                                  {val?.phoneNumber
                                    ?.slice(0, 2)
                                    ?.map((vas, k) => (
                                      <span key={k}>{vas}</span>
                                    ))}
                                </p>
                              </OverlayTrigger>
                            </td>
                            <td>
                              <Link href={`${val?.facebookLink}`}>
                                Facebook
                              </Link>{" "}
                              <span>
                                <Link href={`${val?.website}`}>Website</Link>
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  {loader == true || loader1 == true ? (
                    <center>
                      <div className="loader-img text-center  m-5">
                        <img
                          src={"/assets/images/ball-triangle.svg"}
                          alt="img"
                        />
                      </div>
                    </center>
                  ) : (
                    ""
                  )}
                  {/* {loader === true ? (
                    <center>
                      <div className="loader-img text-center  m-5">
                        <img src={Loader} alt="img" />
                      </div>
                    </center>
                  ) : (
                    ""
                  )} */}
                </div>
              </div>
              <Col lg={12}>
                {!stopapi && loader == false ? (
                  <center>
                    <button className="load-more-btn mb-5" onClick={LoadMore}>
                      {" "}
                      {covert({ id: "loadmore" })}
                    </button>
                  </center>
                ) : (
                  ""
                )}
              </Col>
            </Col>
            {editsidecomponent ? (
              !sidebarloader ? (
                <Col lg={4} md={12} className="trans-col">
                  <div className="mdcl-cntr-dtl">
                    <div className="cntr-hedr">
                      <div className="tle-cntr-name">
                        <img
                          src={"/assets/images/mdcl-cntr-icon.svg"}
                          alt="img"
                        />
                        <div>
                          <h3>
                            {medicaldata?.name}{" "}
                            <span>
                              {medicaldata?.city?.englishName},{" "}
                              {medicaldata?.district}
                            </span>
                          </h3>
                          <p>Street address</p>
                        </div>
                      </div>
                      <div>
                        <img
                          onClick={() => setUpdateModal(true)}
                          src={"/assets/images/edit-3.svg"}
                          alt="img"
                        />
                      </div>
                    </div>
                    <div className="cntr-hedr sdul-dr">
                      <h4>
                        {sidebarList && sidebarList?.length} Doctors Scheduled
                        <span>Closest Exparation Date is 15-09-2022</span>
                      </h4>
                      <button
                        onClick={() => setModalShow(true)}
                        className="wht-btn-br"
                      >
                        + {covert({ id: "Add Doctor" })}
                      </button>
                      <AddDocotorToMedical
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        doctorlist={doctorList}
                        medicaldata={medicaldata}
                        previosudoctor={sidebarList}
                      />

                      <UpdateMedical
                        show={updatemodal}
                        onHide={() => setUpdateModal(false)}
                        cityNames={cityList}
                        medicaldata={medicaldata}
                      />
                    </div>
                    <div className="cntr-hedr align-items-center">
                      <div className="srch-text ar-mn">
                        <input
                          type="text"
                          placeholder={covert({ id: "Search" })}
                          onChange={(e) => {
                            optimizedFn1(e.target.value);
                            setsearchQ(e.target.value);
                          }}
                          value={searchQuery}
                        />
                        <img src={"/assets/images/srch-1.svg"} alt="img" />
                      </div>
                      <img
                        className="img-fluid ms-2"
                        src={"/assets/images/filter-icon.svg"}
                        alt="img"
                      />
                    </div>
                  </div>
                  {sidebarListloader ? (
                    <center>
                      <div className="loader-img text-center  m-5">
                        <img
                          src={"/assets/images/ball-triangle.svg"}
                          alt="img"
                        />
                      </div>
                    </center>
                  ) : (
                    <div className="wrap-in-scroll">
                      {sidebarList &&
                        sidebarList?.map((val, index) => (
                          <div
                            className={
                              editprofiles?.includes(val?.doctor?._id)
                                ? "lst-sdual edit-lst"
                                : "lst-sdual"
                            }
                          >
                            {editprofiles?.includes(val?.doctor?._id) ? (
                              <button
                                className="sdal-dlte cntr-btn-texx"
                                onClick={(e) => DeleteAllSchdeule(e, val)}
                              >
                                {covert({ id: "Delete" })}
                              </button>
                            ) : (
                              ""
                            )}
                            <div className="user-dtl">
                              <div className="tle-cntr-name">
                                <img
                                  src={"/assets/images/avatar.svg"}
                                  alt="img"
                                />
                                <h4>
                                  {val?.doctor?.firstName +
                                    " " +
                                    val?.doctor?.secondName +
                                    " " +
                                    val?.doctor?.lastName}
                                  <span>ID : 123331</span>
                                </h4>
                              </div>
                              <img
                                src={"/assets/images/edit-2.svg"}
                                alt="img"
                                onClick={(e) =>
                                  editProfile(e, val.doctor, val?.scheduleList)
                                }
                              />
                            </div>
                            <div className="speciality-dctr">
                              <p>
                                <label>{covert({ id: "Speciality" })}:</label>
                                <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip id={`tooltip-${index}`}>
                                      <p>
                                        {locale == "ar"
                                          ? val?.doctor?.specialty?.arabicName
                                          : val?.doctor?.specialty?.englishName}
                                      </p>
                                    </Tooltip>
                                  }
                                >
                                  <p>
                                    {locale == "ar"
                                      ? val?.doctor?.specialty?.arabicName
                                      : val?.doctor?.specialty?.englishName}
                                    {/* {val?.doctor?.specialty?.substr(0, 10)}
                                    {val?.doctor?.specialty?.substring(10) ? (
                                      <>....</>
                                    ) : (
                                      ""
                                    )} */}
                                  </p>
                                </OverlayTrigger>
                              </p>

                              <p>
                                <label>Level:</label>
                                {val?.doctor?.level}
                                {/* {editprofiles?.includes(val?.doctor?._id) ? (
                                  ""
                                ) : (
                                  <span>
                                    {" "}
                                    {val?.scheduleList?.[0]?.price} Dinar
                                  </span>
                                )} */}
                              </p>
                            </div>

                            {editprofiles?.includes(val?.doctor?._id) ? (
                              <>
                                {week?.map((value, index) => (
                                  <>
                                    <div className="time-section">
                                      <div className="mrng-time">
                                        <div>
                                          {editprofiles?.includes(
                                            val?.doctor?._id
                                          ) ? (
                                            <div>
                                              <select
                                                name="timeSlot"
                                                onChange={(e) =>
                                                  setTimeSlot(e, index)
                                                }
                                                value={value?.timeSlot}
                                              >
                                                <option selected>
                                                  {/* --Select TimeSlot-- */}
                                                  {covert({
                                                    id: "Select TimeSlot",
                                                  })}
                                                </option>
                                                {timeSlotList &&
                                                  timeSlotList?.map((v, i) => (
                                                    <option value={v._id}>
                                                      {locale == "ar"
                                                        ? v?.arabicName
                                                        : v?.englishName}
                                                    </option>
                                                  ))}
                                              </select>

                                              <ul>
                                                <li>
                                                  <input
                                                    type="checkbox"
                                                    value={"monday"}
                                                    onChange={(e) =>
                                                      setWeekState(
                                                        e,
                                                        index,
                                                        "monday"
                                                      )
                                                    }
                                                    checked={value?.monday}
                                                  />{" "}
                                                  <span>Mon</span>{" "}
                                                </li>
                                                <li>
                                                  <input
                                                    type="checkbox"
                                                    value={"tuesday"}
                                                    onChange={(e) =>
                                                      setWeekState(
                                                        e,
                                                        index,
                                                        "tuesday"
                                                      )
                                                    }
                                                    checked={value?.tuesday}
                                                  />{" "}
                                                  <span>Tue</span>{" "}
                                                </li>
                                                <li>
                                                  <input
                                                    type="checkbox"
                                                    value={"wednesday"}
                                                    onChange={(e) =>
                                                      setWeekState(
                                                        e,
                                                        index,
                                                        "wednesday"
                                                      )
                                                    }
                                                    checked={value?.wednesday}
                                                  />{" "}
                                                  <span>Wed</span>{" "}
                                                </li>
                                                <li>
                                                  <input
                                                    type="checkbox"
                                                    value={"thursday"}
                                                    onChange={(e) =>
                                                      setWeekState(
                                                        e,
                                                        index,
                                                        "thursday"
                                                      )
                                                    }
                                                    checked={value?.thursday}
                                                  />{" "}
                                                  <span>Thu</span>{" "}
                                                </li>
                                                <li>
                                                  <input
                                                    type="checkbox"
                                                    onChange={(e) =>
                                                      setWeekState(
                                                        e,
                                                        index,
                                                        "friday"
                                                      )
                                                    }
                                                    value={"friday"}
                                                    checked={value?.friday}
                                                  />{" "}
                                                  <span>Fri</span>{" "}
                                                </li>
                                                <li>
                                                  <input
                                                    type="checkbox"
                                                    onChange={(e) =>
                                                      setWeekState(
                                                        e,
                                                        index,
                                                        "saturday"
                                                      )
                                                    }
                                                    value={"saturday"}
                                                    checked={value?.saturday}
                                                  />{" "}
                                                  <span>Sat</span>{" "}
                                                </li>
                                                <li>
                                                  <input
                                                    type="checkbox"
                                                    onChange={(e) =>
                                                      setWeekState(
                                                        e,
                                                        index,
                                                        "sunday"
                                                      )
                                                    }
                                                    value={"sunday"}
                                                    checked={value?.sunday}
                                                  />{" "}
                                                  <span>Sun</span>{" "}
                                                </li>
                                              </ul>
                                            </div>
                                          ) : (
                                            <div>
                                              <p>{value?.timeSlot}</p>
                                              <ul>
                                                <li
                                                  className={
                                                    value?.monday
                                                      ? "active"
                                                      : ""
                                                  }
                                                >
                                                  Mon
                                                </li>
                                                <li
                                                  className={
                                                    value?.tuesday
                                                      ? "active"
                                                      : ""
                                                  }
                                                >
                                                  Tue
                                                </li>
                                                <li
                                                  className={
                                                    value?.wednesday
                                                      ? "active"
                                                      : ""
                                                  }
                                                >
                                                  Wed
                                                </li>
                                                <li
                                                  className={
                                                    value?.thursday
                                                      ? "active"
                                                      : ""
                                                  }
                                                >
                                                  Thu
                                                </li>
                                                <li
                                                  className={
                                                    value?.friday
                                                      ? "active"
                                                      : ""
                                                  }
                                                >
                                                  Fri
                                                </li>
                                                <li
                                                  className={
                                                    value?.saturday
                                                      ? "active"
                                                      : ""
                                                  }
                                                >
                                                  Sat
                                                </li>
                                                <li
                                                  className={
                                                    value?.sunday
                                                      ? "active "
                                                      : ""
                                                  }
                                                >
                                                  Sun
                                                </li>
                                              </ul>
                                            </div>
                                          )}
                                        </div>
                                        {editprofiles?.includes(
                                          val?.doctor?._id
                                        ) ? (
                                          <>
                                            <div>
                                              <div className="date-rng dte-pck-input">
                                                <img
                                                  src={
                                                    "/assets/images/rnge-dae.svg"
                                                  }
                                                  alt="img"
                                                />
                                                <label>
                                                  {covert({ id: "Date Range" })}
                                                </label>

                                                <input
                                                  type="date"
                                                  value={value?.startDate}
                                                  onChange={(e) =>
                                                    SetWeekDate(
                                                      e,
                                                      index,
                                                      "startDate"
                                                    )
                                                  }
                                                />
                                              </div>

                                              <div className="date1-rng dte-pck-input enddate mt-2">
                                                <img
                                                  src={
                                                    "/assets/images/rnge-dae.svg"
                                                  }
                                                  alt="img"
                                                />

                                                <input
                                                  type="date"
                                                  value={value?.endDate}
                                                  onChange={(e) =>
                                                    SetWeekEndDate(
                                                      e,
                                                      index,
                                                      "endDate"
                                                    )
                                                  }
                                                />
                                              </div>
                                            </div>
                                            <div>
                                              {value?.scheduleId ? (
                                                <span
                                                  className="dtl-icn-fun"
                                                  onClick={(e) =>
                                                    DeleteScdule(e, value)
                                                  }
                                                >
                                                  <AiFillDelete
                                                    style={{
                                                      color: "red",
                                                      cursor: "pointer",
                                                    }}
                                                  />
                                                </span>
                                              ) : (
                                                <span
                                                  onClick={(e) =>
                                                    DeleteRow(e, index)
                                                  }
                                                >
                                                  <AiFillDelete
                                                    style={{
                                                      color: "red",
                                                      cursor: "pointer",
                                                      marginLeft: "10px",
                                                    }}
                                                  />
                                                </span>
                                              )}
                                            </div>
                                          </>
                                        ) : (
                                          <div className="date-rng date-clr">
                                            <label>
                                              {covert({ id: "Date Range" })}
                                            </label>
                                            <span>
                                              <img
                                                src={
                                                  "/assets/images/rnge-dae.svg"
                                                }
                                                alt="img"
                                              />
                                              {moment(value?.startDate).format(
                                                "LL"
                                              )}{" "}
                                              -{" "}
                                              {moment(value?.endDate).format(
                                                "LL"
                                              )}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <div className="price">
                                      <span>{covert({ id: "Price" })}: </span>
                                      <span>
                                        <input
                                          type="number"
                                          placeholder="20 Dinar"
                                          className="inputbox"
                                          defaultValue={value?.price}
                                          onChange={(e) =>
                                            // setPrice(e.target.value)
                                            setWeekPrice(e, index)
                                          }
                                        />
                                      </span>
                                    </div>
                                  </>
                                ))}

                                {editprofiles?.includes(val?.doctor?._id) ? (
                                  <div className="ad-dse-apl">
                                    <button
                                      className="sdal-dlte"
                                      onClick={(e) =>
                                        editProfile(
                                          e,
                                          val.doctor,
                                          val?.scheduleList
                                        )
                                      }
                                    >
                                      {covert({ id: "Reset" })}
                                    </button>

                                    <p
                                      onClick={(e) =>
                                        SetNewWeekValue(e, val?.doctor)
                                      }
                                      style={{ cursor: "pointer" }}
                                    >
                                      + {covert({ id: "Add More" })}
                                    </p>
                                    <button
                                      className="sdal-aply"
                                      onClick={(e) =>
                                        UpdateScdehule(
                                          e,
                                          val?.scheduleList?.[0]?._id,
                                          val?.doctor?._id,
                                          val?.doctor,
                                          val?.scheduleList
                                        )
                                      }
                                    >
                                      {covert({ id: "Apply" })}
                                    </button>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </>
                            ) : (
                              val?.scheduleList?.map((value, i) => (
                                <>
                                  <div className="time-section">
                                    <div className="mrng-time">
                                      <div>
                                        {editprofiles?.includes(
                                          val?.doctor?._id
                                        ) ? (
                                          <div>
                                            <select value={value?.timeSlot}>
                                              {timeSlotList &&
                                                timeSlotList?.map((v, i) => (
                                                  <option value={v._id}>
                                                    {locale == "ar"
                                                      ? v.arabicName
                                                      : v.englishName}
                                                  </option>
                                                ))}
                                            </select>
                                            <ul>
                                              <li>
                                                <input
                                                  type="checkbox"
                                                  checked={value[i]?.monday}
                                                />{" "}
                                                <span>Mon</span>{" "}
                                              </li>
                                              <li>
                                                <input
                                                  type="checkbox"
                                                  checked={value[i]?.tuesday}
                                                />{" "}
                                                <span>Tue</span>{" "}
                                              </li>
                                              <li>
                                                <input
                                                  type="checkbox"
                                                  checked={value[i]?.wednesday}
                                                />{" "}
                                                <span>Wed</span>{" "}
                                              </li>
                                              <li>
                                                <input
                                                  type="checkbox"
                                                  checked={value[i]?.thursday}
                                                />{" "}
                                                <span>Thu</span>{" "}
                                              </li>
                                              <li>
                                                <input
                                                  type="checkbox"
                                                  checked={value[i]?.friday}
                                                />{" "}
                                                <span>Fri</span>{" "}
                                              </li>
                                              <li>
                                                <input
                                                  type="checkbox"
                                                  checked={value[i]?.saturday}
                                                />{" "}
                                                <span>Sat</span>{" "}
                                              </li>
                                              <li>
                                                <input
                                                  type="checkbox"
                                                  checked={value[i]?.sunday}
                                                />{" "}
                                                <span>Sun</span>{" "}
                                              </li>
                                            </ul>
                                          </div>
                                        ) : (
                                          <div>
                                            <p>
                                              {locale == "ar"
                                                ? value?.timeSlot?.arabicName
                                                : value?.timeSlot?.englishName}
                                            </p>
                                            <ul>
                                              <li
                                                className={
                                                  value?.monday ? "active" : ""
                                                }
                                              >
                                                Mon
                                              </li>
                                              <li
                                                className={
                                                  value?.tuesday ? "active" : ""
                                                }
                                              >
                                                Tue
                                              </li>
                                              <li
                                                className={
                                                  value?.wednesday
                                                    ? "active"
                                                    : ""
                                                }
                                              >
                                                Wed
                                              </li>
                                              <li
                                                className={
                                                  value?.thursday
                                                    ? "active"
                                                    : ""
                                                }
                                              >
                                                Thu
                                              </li>
                                              <li
                                                className={
                                                  value?.friday ? "active" : ""
                                                }
                                              >
                                                Fri
                                              </li>
                                              <li
                                                className={
                                                  value?.saturday
                                                    ? "active"
                                                    : ""
                                                }
                                              >
                                                Sat
                                              </li>
                                              <li
                                                className={
                                                  value?.sunday ? "active " : ""
                                                }
                                              >
                                                Sun
                                              </li>
                                            </ul>

                                            <div className="price">
                                              <span>
                                                {covert({ id: "Price" })}:{" "}
                                              </span>
                                              <span>
                                                <input
                                                  type="number"
                                                  placeholder="20 Dinar"
                                                  className="inputbox1"
                                                  defaultValue={value?.price}
                                                  readOnly
                                                />
                                              </span>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      {editprofiles?.includes(
                                        val?.doctor?._id
                                      ) ? (
                                        <div className="date-rng dte-pck-input">
                                          <img
                                            src={"/assets/images/rnge-dae.svg"}
                                            alt="img"
                                          />
                                          <label>
                                            {covert({ id: "Date Range" })}
                                          </label>
                                          {/* <DatePicker
                                          selectsRange={true}
                                          // startDate={startDate}
                                          // endDate={endDate}
                                          onChange={(update) => {
                                            console.log("ip", update);
                                            setDateRange(update);
                                          }}
                                          isClearable={false}
                                        /> */}
                                        </div>
                                      ) : (
                                        <div className="date-rng date-clr">
                                          <label>
                                            {covert({ id: "Date Range" })}
                                          </label>
                                          <span>
                                            <img
                                              src={
                                                "/assets/images/rnge-dae.svg"
                                              }
                                              alt="img"
                                            />
                                            {moment(value?.startDate).format(
                                              "LL"
                                            )}{" "}
                                            -{" "}
                                            {moment(value?.endDate).format(
                                              "LL"
                                            )}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  {/* {editprofiles?.includes(
                                    val?.doctorObject?._id
                                  ) ? (
                                    <div className="ad-dse-apl">
                                      <button className="sdal-dlte">
                                        Delete
                                      </button>
                                      <p>+Add More</p>
                                      <button
                                        className="sdal-aply"
                                        onClick={editProfile}
                                      >
                                        Apply
                                      </button>
                                    </div>
                                  ) : (
                                    ""
                                  )} */}
                                </>
                              ))
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </Col>
              ) : (
                <>
                  <Col lg={4}>
                    <center>
                      <div className="loader-img text-center  m-5">
                        <img
                          src={"/assets/images/ball-triangle.svg"}
                          alt="img"
                        />
                      </div>
                    </center>
                  </Col>
                </>
              )
            ) : (
              ""
            )}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default MedicalCenter;
