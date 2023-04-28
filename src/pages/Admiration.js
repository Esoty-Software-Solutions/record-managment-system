import React, { useCallback, useEffect, useState } from "react";

import {
  Col,
  OverlayTrigger,
  ProgressBar,
  Row,
  Table,
  Modal,
  Tooltip,
  Tab,
  Tabs,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import {
  BenefeciaryList,
  DoctorList,
  GetAdmistratotUserList,
  GetInstitutionList,
  GetUserInfo,
  PostUserInfo,
  UpdateUserDetail,
} from "../redux/actions/action";
import Select from "react-select";
import _ from "lodash";
import Swal from "sweetalert2";
import { Formik } from "formik";
import { AiFillEdit } from "react-icons/ai";
import UserEditModal from "@/Component/Modals/UserEditModal";
import { useIntl } from "react-intl";
import ChangePassword from "@/Component/Modals/ChangePasswordModal";
function Admiration() {
  const dispatch = useDispatch();

  const [userInformation, setUserInfoForDetails] = useState([]);
  const [useridforpasswordchange, setUserID] = useState();
  const [userEdit, setUserEditModal] = useState(false);
  const [passwordmodal, setPasswordModal] = useState(false);
  const [hideDiv, setHideDiv] = useState(false);
  const [hideDiv1, setHideDiv1] = useState(false);
  const [key, setKey] = useState("home");
  const [stopapi, setStopAPi] = useState(false);
  const [skip, setSkip] = useState(0);
  const [top, setTop] = useState();
  const [limit] = useState(10);
  const [loader, setLoader] = useState(false);
  const [editinput, setEdit] = useState(true);
  const [userlist, setUserList] = useState([]);
  const [rolelist, setRole] = useState([]);
  const [userinfo, setUserInfo] = useState();
  const [benefList, setBeneList] = useState();
  const [count, setObjectCount] = useState();
  const [docList, setDoctorList] = useState();
  // for dropdown react select
  const [docListOption, setDoctorOption] = useState([]);
  const [institutionList, setInstitutionList] = useState([]);
  const [InstitutionListOption, setInstitutionOption] = useState([]);
  const [benefOption, setBeneOptions] = useState([]);
  const [doctorId, setDoctorId] = useState(null);
  const [instituionId, setInstitutionId] = useState(null);
  const [benfId, setBenefId] = useState(null);
  const [datasetinstate, setDatainState] = useState(false);
  const [otherstate, setotherState] = useState(false);

  // for single user 1st tab state for react select
  const [userdoctorId, UsersetDoctorId] = useState(null);
  const [userinstituionId, UsersetInstitutionId] = useState(null);
  const [userbenfId, UsersetBenefId] = useState(null);

  useEffect(() => {
    if (key == "user") {
      if (stopapi === false) {
        setLoader(true);
        // dispatch(GetAdmistratotUserList(skip, limit));
        APICall();
      }
    }
    if (key == "home") {
      dispatch(GetUserInfo());
    }

    return () => {
      dispatch({ type: "GET_USER_ADMIS_LIST", payload: "" });
      dispatch({ type: "GET_USER_INFORMATION", payload: "" });
      dispatch({ type: "ADD_USER_RES", payload: "" });
    };
  }, [key, skip]);

  const APICall = (value) => {
    if (stopapi == false) {
      dispatch(GetAdmistratotUserList(skip, limit, value));
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
      setUserList([]);
      setObjectCount(0);
    }),
    []
  );

  const {
    admist_usr_list,
    get_user_information,
    benef_list,
    get_doctor_list,
    institution_list,
  } = useSelector((state) => state.fetchdata);

  const { add_admist_user_res, update_user_res, change_password_res } =
    useSelector((state) => state.submitdata);

  useEffect(() => {
    if (admist_usr_list) {
      // if (admist_usr_list?.data?.codeStatus === "200") {
      // console.log("res", admist_usr_list?.data?.data);
      if (admist_usr_list?.data?.statusCode == "200") {
        setLoader(false);
        if (skip == 0) {
          // setUserList(admist_usr_list?.data?.data);
          // setObjectCount(admist_usr_list?.data?.dataCount);
          setUserList(admist_usr_list?.data?.data?.objectArray);
          setObjectCount(admist_usr_list?.data?.data?.objectCount);
        } else {
          setLoader(false);
          let common = _?.differenceBy(
            admist_usr_list?.data?.data?.objectArray,
            userlist,
            "_id"
          );
          setUserList((pre) => [...pre, ...common]);
          // setObjectCount(admist_usr_list?.data?.data?.dataCount);
          setObjectCount(admist_usr_list?.data?.data?.objectCount);

          // setUserList((pre) => [...pre, ...admist_usr_list?.data?.object]);
          // setUserList(admist_usr_list?.data?.object);
          // setLoader(false);
        }

        // if (admist_usr_list?.data?.objectCount == userlist?.length) {
        //   setStopAPi(true);
        //   setLoader(false);
        // }
        // if (admist_usr_list?.data?.objectCount > userlist?.length) {
        //   setStopAPi(false);
        //   setLoader(false);
        // }
        // console.log("admist_usr_list?.data?.data?.hasMore", admist_usr_list?.data?.hasMore)
      }
      //  else {
      //   Swal.fire({
      //     icon: "error",
      //     text: "Something Went Wrong",
      //   });
      // }
    }
  }, [admist_usr_list]);

  useEffect(() => {
    if (get_user_information) {
      if (get_user_information?.data?.statusCode == "200") {
        setUserInfo(get_user_information?.data?.data);
        setDatainState(true);
        setotherState(true);
      } else {
        Swal.fire({
          icon: "error",
          text: get_user_information,
        });
      }
    }
  }, [get_user_information]);

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
  //   if (key == "user") {
  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }
  // }, [key]);

  const AddUser = (values, { resetForm }) => {

    dispatch(PostUserInfo(values));
    resetForm();
  };

  useEffect(() => {
    if (add_admist_user_res) {
      setLoader(false);
      if (add_admist_user_res?.data?.statusCode == "200") {
        Swal.fire({
          icon: "success",
          // text: add_admist_user_res?.data?.message,
          text: "User Add",
        });
        dispatch(GetAdmistratotUserList(skip, limit));
        setKey("user");
        setLoader(false);
      } else {
        setLoader(false);

        Swal.fire({
          icon: "error",
          text: add_admist_user_res,
        });
      }
    }
  }, [add_admist_user_res]);

  // console.log("userREs", add_admist_user_res);
  const setRoles = (e) => {
    e.preventDefault();
    setRole((pre) => [...pre, e.target.value]);
  };
  const removeRole = (e, data) => {
    e.preventDefault();
    setRole((current) => current.filter((rolelist) => rolelist !== data));
  };

  const LoadMore = () => {
    if (stopapi === false) {
      setLoader(true);
      setSkip((pre) => pre + 10);
    } else {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (stopapi == undefined) {
      setTotalData(true);
      setLoader(false);
    } else if (count <= skip + limit) {
      setStopAPi(true);
      // setLoadMoreAlwways(false)
    } else {
      setStopAPi(false);
    }
  }, [count, userlist]);

  useEffect(() => {
    if (update_user_res) {
      if (update_user_res?.data?.statusCode == "200") {
        Swal.fire({
          text: update_user_res?.data?.message,
          timer: 2000,
          icon: "success",
        });
        if (key == "user") {
          setSkip(0);
          // dispatch(GetAdmistratotUserList(0, 10));
        } else {
          dispatch(GetUserInfo());
        }

        setUserEditModal(false);
      } else {
        Swal.fire({
          icon: "error",
          text: update_user_res,
          timer: 2000,
        });
        setUserEditModal(false);
      }
    }
    return () => {
      dispatch({ type: "UPDATE_USER_DETAILS", payload: "" });
    };
  }, [update_user_res]);

  useEffect(() => {
    if (change_password_res) {
      if (change_password_res?.data?.statusCode == "200") {
        Swal.fire({
          text: change_password_res?.data?.message,
          timer: 2000,
          icon: "success",
        });
        setPasswordModal(false);
        setUserID();
      } else {
        Swal.fire({
          icon: "error",
          text: change_password_res?.message,
          timer: 2000,
        });
        setPasswordModal(false);
        setUserID();
      }
    }
    return () => {
      dispatch({ type: "CHANGE_PASSWORD_API", payload: "" });
    };
  }, [change_password_res]);

  useEffect(() => {
    if (update_user_res) {
      if (update_user_res?.data?.statusCode == "200") {
        Swal.fire({
          text: update_user_res?.data?.message,
          timer: 2000,
          icon: "success",
        });
        if (key == "user") {
          dispatch(GetAdmistratotUserList(0, 10));
        } else {
          dispatch(GetUserInfo());
        }

        setUserEditModal(false);
      } else {
        Swal.fire({
          icon: "error",
          text: update_user_res,
          timer: 2000,
        });
        setUserEditModal(false);
      }
    }
    return () => {
      dispatch({ type: "UPDATE_USER_DETAILS", payload: "" });
    };
  }, [update_user_res]);

  useEffect(() => {
    if (key == "home") {
      dispatch(DoctorList(0, 500));
      dispatch(BenefeciaryList(500, 0));
      dispatch(GetInstitutionList());
    }
  }, []);

  useEffect(() => {
    if (benef_list) {
      if (benef_list?.data?.statusCode == "200") {
        setBeneList(benef_list?.data?.data?.objectArray);
        if (benef_list?.data?.data?.objectArray) {
          benef_list?.data?.data?.objectArray?.map((val, i) => {
            return setBeneOptions((pre) => [
              ...pre,
              { value: val._id, label: val.firstName },
            ]);
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          text: "Something Went Wrong",
        });
      }
    }
    return () => {
      dispatch({ type: "GET_BENE_LIST", payload: "" });
    };
  }, [benef_list]);

  useEffect(() => {
    if (get_doctor_list) {
      // console.log("sss", get_doctor_list?.data);
      if (get_doctor_list?.data?.statusCode == "200") {
        setDoctorList(get_doctor_list?.data?.data?.objectArray);
        if (get_doctor_list?.data?.data?.objectArray) {
          get_doctor_list?.data?.data?.objectArray?.map((val, i) => {
            return setDoctorOption((pre) => [
              ...pre,
              { value: val._id, label: val.firstName + " " + val.lastName },
            ]);
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          text: "Something Went Wrong",
        });
      }
    }

    return () => {
      dispatch({ type: "GET_DOCTOR_LIST", payload: "" });
    };
  }, [get_doctor_list]);

  useEffect(() => {
    if (institution_list) {
      if (institution_list?.data?.statusCode == "200") {
        setInstitutionList(institution_list?.data?.data?.objectArray);
        if (institution_list?.data?.data?.objectArray) {
          institution_list?.data?.data?.objectArray?.map((val, i) => {
            return setInstitutionOption((pre) => [
              ...pre,
              { value: val._id, label: val.name },
            ]);
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          text: "Something Went Wrong",
        });
      }
    }
    return () => {
      dispatch({ type: "GET_INSTITUTION_LIST", payload: "" });
    };
  }, [institution_list]);

  const UpdateDetails = (values) => {
    let subscriberId = localStorage.getItem("Zept_UserId");
    const data = {
      ImagingCenterId: values?.ImagingCenterId ? values?.ImagingCenterId : "",
      auxiliaryCenterId: values?.auxiliaryCenterId
        ? values?.auxiliaryCenterId
        : null,
      lastName: values?.lastName ? values?.lastName : "",
      phoneNumber: values?.phoneNumber ? values?.phoneNumber : "",
      email: values?.email ? values?.email : null,
      // doctorId: userdoctorId?.value ? userdoctorId?.value : null,
      // institutionId: userinstituionId.value ? userinstituionId.value : null,
      // subscriberId: userbenfId.value ? userbenfId.value : null,
      subscriberId: values?.subscriberId ? values?.subscriberId : null,
      doctorId: values?.doctorId ? values?.doctorId : null,
      institutionId: values.institutionId ? values.institutionId : null,
      laboratoryId: values?.laboratoryId ? values?.laboratoryId : null,
      pharmacyId: values?.pharmacyId ? values?.pharmacyId : null,
      firstName: values?.firstName ? values?.firstName : "",
      secondName: values?.secondName ? values?.secondName : "",
      thirdName: values?.thirdName ? values?.thirdName : "",
      username: values?.username ? values?.username : "",
    };

    dispatch(UpdateUserDetail(subscriberId, data));
  };
  const { formatMessage: covert } = useIntl();

  // useEffect(() => {
  // if (docList) {
  //   docList?.map((val, i) => {
  //     return setDoctorOption((pre) => [
  //       ...pre,
  //       { value: val._id, label: val.firstName + " " + val.lastName },
  //     ]);
  //   });
  // }
  //   if (benefList) {
  //     benefList?.map((val, i) => {
  //       return setBeneOptions((pre) => [
  //         ...pre,
  //         { value: val._id, label: val.firstName },
  //       ]);
  //     });
  //   }
  //   if (institutionList) {
  //     institutionList?.map((val, i) => {
  //       return setInstitutionOption((pre) => [
  //         ...pre,
  //         { value: val._id, label: val.name },
  //       ]);
  //     });
  //   }
  // }, [docList, benefList, institutionList]);

  useEffect(() => {
    if (datasetinstate) {
      callFuntion();
    }
  }, [
    datasetinstate,
    editinput,
    userinfo,
    institutionList,
    docList,
    benefList,
  ]);

  const callFuntion = () => {
    let findinstitutionvalue = institutionList?.filter((val) => {
      return val._id == userinfo?.institutionId;
    });

    let findoctorvalue = docList?.filter((val) => {
      return val._id == userinfo?.doctorId;
    });

    let findsubsvalue = benefList?.filter((val) => {
      return val._id == userinfo?.subscriberId;
    });

    // console.log("findsubsvalue",findsubsvalue);

    if (findoctorvalue?.[0]?._id) {
      UsersetDoctorId({
        value: findoctorvalue[0]?._id,
        label: findoctorvalue[0]?.firstName,
      });
    }

    if (findinstitutionvalue?.[0]?._id) {
      UsersetInstitutionId({
        value: findinstitutionvalue[0]?._id,
        label: findinstitutionvalue[0]?.name,
      });
    }
    if (findsubsvalue?.[0]?._id) {
      UsersetBenefId({
        value: findsubsvalue[0]?._id,
        label: findsubsvalue[0]?.firstName,
      });
    }
  };

  return (
    <div>
      <div className="main-content">
        <div className="tbs-bot">
          {key == "user" && (
            <Row>
              <Col md={4}>
                <div className="filter-chek mt-4">
                  <div className="srch-text">
                    <input
                      type="text"
                      placeholder={covert({ id: "Search" })}
                      onChange={(e) => {
                        // setLoader(true);
                        // SetsearchQuery(e.target.value);
                        optimizedFn(e.target.value);
                      }}
                    />
                    <img src={"/assets/images/srch-1.svg"} alt="img" />
                  </div>
                </div>
              </Col>
            </Row>
          )}
          <Tabs
            defaultActiveKey="home"
            transition={false}
            activeKey={key}
            onSelect={(k) => {
              setKey(k);
              setDatainState(false);
              // setDoctorOption([]);
              // setDoctorList([]);
              // setInstitutionOption([]);
              // setInstitutionList([]);
              // setBeneList([]);
              // setBeneOptions([]);
              setInstitutionId(null);
              setBenefId(null);
              setDoctorId(null);

              UsersetBenefId(null);
              UsersetDoctorId(null);
              UsersetInstitutionId(null);
            }}
            id="noanim-tab-example"
            className="admintration-tbs"
          >
            <Tab eventKey="home" title={covert({ id: "Profile" })}>
              <div className="admintration-tbs-dtl">
                <Formik
                  initialValues={{
                    username: userinfo?.username,
                    email: userinfo?.email ? userinfo?.email : null,
                    firstName: userinfo?.firstName,
                    secondName: userinfo?.secondName,
                    thirdName: userinfo?.thirdName,
                    lastName: userinfo?.lastName,
                    phoneNumber: userinfo?.phoneNumber
                      ? userinfo?.phoneNumber
                      : "",
                    birthdate: userinfo?.birthdate,
                    // gender: userinfo?.gender
                    //   ? userinfo?.gender
                    //   : "",
                    instituionId: userinfo?.instituionId,
                    city: userinfo?.city,
                    doctorId: userinfo?.doctorId ? userinfo?.doctorId : null,
                    subscriberId: userinfo?.subscriberId
                      ? userinfo?.subscriberId
                      : null,
                    auxiliaryCenterId: userinfo?.auxiliaryCenterId
                      ? userinfo?.auxiliaryCenterId
                      : null,

                    pharmacyId: userinfo?.pharmacyId
                      ? userinfo?.pharmacyId
                      : "",
                    laboratoryId: userinfo?.laboratoryId
                      ? userinfo?.laboratoryId
                      : null,

                    ImagingCenterId: userinfo?.ImagingCenterId
                      ? userinfo?.ImagingCenterId
                      : null,
                  }}
                  onSubmit={UpdateDetails}
                  // validationSchema={DoctorForm}
                  enableReinitialize
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                  }) => (
                    <form className="inpt-fld" onSubmit={handleSubmit}>
                      <div className="prt-fmr">
                        <Row>
                          <Col lg={4} md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "username" })}</label>
                              <input
                                readOnly={editinput}
                                placeholder={covert({ id: "username" })}
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col>
                          <Col lg={4} md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "fname" })}</label>
                              <input
                                readOnly={editinput}
                                placeholder={covert({ id: "fname" })}
                                name="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col>
                          <Col lg={4} md={6}>
                            <div className="form-group">
                              <label> {covert({ id: "secondname" })}</label>
                              <input
                                readOnly={editinput}
                                placeholder={covert({ id: "secondname" })}
                                name="secondName"
                                value={values.secondName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col>
                          <Col lg={4} md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "thirdname" })}</label>
                              <input
                                readOnly={editinput}
                                placeholder={covert({ id: "thirdname" })}
                                name="thirdName"
                                value={values.thirdName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col>
                          <Col lg={4} md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "lname" })}</label>
                              <input
                                readOnly={editinput}
                                placeholder={covert({ id: "lname" })}
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col>
                          {/* <Col lg={4} md={6}>
                            <div className="form-group">
                              <label>User Role</label>
                              <input
                                readOnly={editinput}
                                placeholder="Doctor"
                                value={userinfo?.doctorId}
                              />
                            </div>
                          </Col> */}
                          <Col lg={4} md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "InstitutionId" })}</label>

                              <input
                                name="instituionId"
                                readOnly={editinput}
                                placeholder={covert({ id: "InstitutionId" })}
                                value={values.instituionId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {/* {editinput ? (
                                <input
                                  name="instituionId"
                                  readOnly={true}
                                  value={userinstituionId?.label}
                                  // placeholder={userinstituionId?.label}
                                  // value={values.instituionId}
                                  // onChange={handleChange}
                                  // onBlur={handleBlur}
                                />
                              ) : (
                                <Select
                                  placeholder={covert({ id: "InstitutionId" })}
                                  name="instituionId"
                                  value={userinstituionId}
                                  onChange={(value) => {
                                    UsersetInstitutionId(value);
                                    values.instituionId = value.value;
                                  }}
                                  onBlur={handleBlur}
                                  isSearchable={true}
                                  options={InstitutionListOption}
                                  isLoading={false}
                                  loadingMessage={() => "Fetching Data"}
                                  noOptionsMessage={() => "Institution List"}
                                />
                              )} */}
                            </div>
                          </Col>

                          {/* <Col lg={4} md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "doctorid" })}</label>
                              <input
                                placeholder={covert({ id: "doctorid" })}
                                name="doctorId"
                                value={values.doctorId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col> */}

                          <Col lg={4} md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "Pharmacy Id" })}</label>
                              <input
                                placeholder={covert({ id: "Pharmacy Id" })}
                                name="pharmacyId"
                                value={values.pharmacyId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "laboratory Id" })}</label>
                              <input
                                placeholder={covert({ id: "laboratory Id" })}
                                name="laboratoryId"
                                value={values.laboratoryId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "SubscribweId" })}</label>

                              <input
                                type="text"
                                placeholder={covert({ id: "SubscribweId" })}
                                name="subscriberId"
                                readOnly={editinput}
                                value={values.subscriberId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {/* {editinput ? (
                                <input
                                  type="text"
                                  // placeholder={userbenfId?.label}
                                  value={userbenfId?.label}
                                  name="subscriberId"
                                  readOnly={true}
                                  // value={values.subscriberId}
                                  // onChange={handleChange}
                                  // onBlur={handleBlur}
                                />
                              ) : (
                                <Select
                                  placeholder={covert({ id: "SubscribweId" })}
                                  name="subscriberId"
                                  value={userbenfId}
                                  onChange={(value) => {
                                    UsersetBenefId(value);
                                    values.subscriberId = value.value;
                                  }}
                                  onBlur={handleBlur}
                                  isSearchable={true}
                                  options={benefOption}
                                  isLoading={false}
                                  loadingMessage={() => "Fetching Data"}
                                  noOptionsMessage={() => "Subscriber List"}
                                />
                              )} */}
                            </div>
                          </Col>

                          <Col lg={4} md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "doctorid" })}</label>
                              <input
                                type="text"
                                readOnly={editinput}
                                placeholder={covert({ id: "doctorid" })}
                                name="doctorId"
                                value={values.doctorId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {/* {editinput ? (
                                <input
                                  type="text"
                                  readOnly={true}
                                  // placeholder={userdoctorId?.label}
                                  value={userdoctorId?.label}
                                  // value={userinfo?.doctorId}
                                  // name="doctorId"
                                  // value={values.doctorId}
                                  // onChange={handleChange}
                                  // onBlur={handleBlur}
                                />
                              ) : (
                                <Select
                                  placeholder={covert({ id: "doctorid" })}
                                  name="doctorId"
                                  readOnly={editinput}
                                  value={userdoctorId}
                                  onChange={(value) => {
                                    UsersetDoctorId(value);
                                    values.doctorId = value.value;
                                  }}
                                  onBlur={handleBlur}
                                  isSearchable={true}
                                  options={docListOption}
                                  isLoading={false}
                                  loadingMessage={() => "Fetching Data"}
                                  noOptionsMessage={() => "Doctor List"}
                                />
                              )} */}
                            </div>
                          </Col>
                          <Col lg={4} md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "Phone Number" })}</label>
                              <input
                                readOnly={editinput}
                                placeholder="1235-452-567"
                                name="phoneNumber"
                                value={values.phoneNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              <img
                                className="inpt-img"
                                src={"/assets/images/accept-mob.svg"}
                                alt="img"
                              />
                            </div>
                          </Col>
                          <Col lg={4} md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "Email" })}</label>
                              <input
                                readOnly={true}
                                placeholder="example@gmail.com"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              <img
                                className="inpt-img"
                                src={"/assets/images/question-email.svg"}
                                alt="img"
                              />
                            </div>
                          </Col>
                          {/* <Col lg={4} md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "Birth Date" })}</label>
                              <input
                                type="date"
                                name="birthdate"
                                value={values.birthdate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col> */}
                          <Col lg={4} md={6}>
                            <div className="orgn-tags mt-4">
                              <ul>
                                <li>Admin</li>
                                <li>Doctor</li>
                                <li>Reception</li>
                              </ul>
                            </div>
                          </Col>

                          <Col lg={12} md={12}>
                            <div className="form-group">
                              <label>{covert({ id: "auxid" })}</label>

                              <input
                                placeholder="1235-452-567"
                                name="auxiliaryCenterId"
                                value={values.auxiliaryCenterId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6} className="porcn-retle">
                            <div className="prt-fmr">
                              <div className="re-edit-pss benfits-btn mt-3">
                                <button
                                  type="button"
                                  onClick={() => setPasswordModal(true)}
                                >
                                  {covert({ id: "Reset Password" })}{" "}
                                </button>

                                {!editinput ? (
                                  <button type="submit">
                                    {covert({ id: "Save" })}
                                  </button>
                                ) : (
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setEdit(!editinput);
                                    }}
                                  >
                                    {covert({ id: "edit" })}
                                  </button>
                                )}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </Tab>
            <Tab eventKey="user" title={covert({ id: "User Management" })}>
              <div className="admintration-tbs-dtl p-0">
                <div className="data-tble fixheder-tbl">
                  {/* <Table className="table-responsive" onScroll={handleScroll}> */}
                  <Table>
                    <thead>
                      <tr>
                        <th>{covert({ id: "onlyid" })}</th>
                        <th>{covert({ id: "Name" })}</th>
                        <th> {covert({ id: "username" })}</th>
                        <th>{covert({ id: "Account Status" })}</th>
                        <th> {covert({ id: "organization" })}</th>
                        <th>{covert({ id: "userroles" })}</th>
                        <th> {covert({ id: "Action" })}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userlist &&
                        userlist?.map((value, inde) => (
                          <tr>
                            <td>{value.userId}</td>
                            <td>Patient Name</td>
                            <td>{value?.username}</td>
                            <td className="tgle-inpt">
                              <input type="checkbox" checked />
                              Active
                            </td>
                            <td>Organization123</td>
                            <td>
                              <div className="slct-cage">
                                <div>
                                  <label className="multipal-slt">
                                    Rolename{" "}
                                    <span>
                                      <img
                                        className="img-fluid"
                                        src={"/assets/images/sl-close.svg"}
                                        alt="img"
                                      />
                                    </span>
                                  </label>
                                  <label className="multipal-slt">
                                    Rolename{" "}
                                    <img
                                      src={"/assets/images/sl-close.svg"}
                                      alt="img"
                                    />
                                  </label>
                                </div>
                                <span>
                                  <img
                                    onClick={() => setHideDiv1(true)}
                                    src={"/assets/images/more-add.svg"}
                                    alt="img"
                                  />
                                </span>
                              </div>
                              {!hideDiv1 ? (
                                ""
                              ) : (
                                <select className="rlse-slct">
                                  <option>Rolename</option>
                                  <option>Rolename</option>
                                  <option>Rolename</option>
                                  <option>Rolename</option>
                                </select>
                              )}
                            </td>
                            <td>
                              <span className="two-edit-actions">
                                <button
                                  className="brdr-btn-btn"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setUserInfoForDetails(value);
                                    setUserEditModal(true);
                                  }}
                                >
                                  <AiFillEdit />
                                </button>

                                <button
                                  className="brdr-btn-btn"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setUserID(value);
                                    setPasswordModal(true);
                                  }}
                                >
                                  Reset Password
                                </button>
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
                {loader == true ? (
                  <center>
                    <div className="loader-img text-center  m-5">
                      <img src={"/assets/images/ball-triangle.svg"} alt="img" />
                    </div>
                  </center>
                ) : (
                  ""
                )}
              </div>
              {!stopapi && userlist?.length > 0 ? (
                <center>
                  <button className="load-more-btn mb-4" onClick={LoadMore}>
                    {" "}
                    {covert({ id: "loadmore" })}
                  </button>
                </center>
              ) : (
                ""
              )}
            </Tab>
            <Tab eventKey="adduser" title={covert({ id: "Add New User" })}>
              <div className="admintration-tbs-dtl">
                <Formik
                  initialValues={{
                    username: "",
                    email: "",
                    firstName: "",
                    secondName: "",
                    thirdName: "",
                    lastName: "",
                    phoneNumber: "",
                    // birthdate: "",
                    password: "",
                    pharmacyId: "",
                    laboratoryId: "",
                    ImagingCenterId: "",
                    auxiliaryCenterId: "",
                    instituionId: null,

                    doctorId: null,
                    subscriberId: null,
                    auxiliaryCenterId: null,
                    // gender: userinfo?.gender
                    //   ? userinfo?.gender
                    //   : "",
                  }}
                  onSubmit={AddUser}
                  // validationSchema={DoctorForm}
                  enableReinitialize
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                  }) => (
                    <form
                      className="inpt-fld"
                      id="form-datas"
                      onSubmit={handleSubmit}
                    >
                      <div className="prt-fmr">
                        <Row>
                          <Col lg={4} md={6}>
                            <div className="form-group">
                              <label> {covert({ id: "username" })}</label>
                              <input
                                placeholder={covert({ id: "username" })}
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col>
                          <Col lg={4} md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "fname" })}</label>
                              <input
                                placeholder={covert({ id: "fname" })}
                                name="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col>
                          <Col lg={4} md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "secondname" })}</label>
                              <input
                                placeholder={covert({ id: "secondname" })}
                                name="secondName"
                                value={values.secondName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col>
                          <Col lg={4} md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "thirdname" })}</label>
                              <input
                                placeholder={covert({ id: "thirdname" })}
                                name="thirdName"
                                value={values.thirdName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col>
                          <Col lg={4} md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "lname" })}</label>
                              <input
                                placeholder={covert({ id: "lname" })}
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col>
                          <Col lg={4} md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "doctorid" })}</label>
                              <input
                                placeholder={covert({ id: "doctorid" })}
                                name="doctorId"
                                value={values.doctorId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />

                              {/* <Select
                                placeholder={covert({ id: "doctorid" })}
                                name="doctorId"
                                value={doctorId}
                                onChange={(value) => {
                                  setDoctorId(value);
                                  values.doctorId = value.value;
                                }}
                                onBlur={handleBlur}
                                isSearchable={true}
                                options={docListOption}
                                isLoading={false}
                                loadingMessage={() => "Fetching Data"}
                                noOptionsMessage={() => "Doctor List"}
                              /> */}
                            </div>
                          </Col>

                          <Col lg={4} md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "Pharmacy Id" })}</label>
                              <input
                                placeholder={covert({ id: "Pharmacy Id" })}
                                name="doctorId"
                                value={values.pharmacyId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "laboratory Id" })}</label>
                              <input
                                placeholder={covert({ id: "laboratory Id" })}
                                name="laboratoryId"
                                value={values.laboratoryId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6}>
                            <div className="form-group">
                              <label>
                                {covert({ id: "ImagingCenter Id" })}
                              </label>
                              <input
                                placeholder={covert({ id: "ImagingCenter Id" })}
                                name="ImagingCenterId"
                                value={values.ImagingCenterId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col>
                          <Col lg={4} md={6}>
                            {/* <div className="form-group">
                            <label>Organization</label>
                            <input
                              placeholder="Alvin Hospital"
                              // value={userinfo?.username}
                            />
                          </div> */}
                            <div className="form-group">
                              <label>{covert({ id: "InstitutionId" })}</label>
                              <input
                                placeholder={covert({ id: "InstitutionId" })}
                                name="instituionId"
                                value={values.instituionId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                readOnly={editinput}
                              />
                              {/* 
                              <Select
                                placeholder={covert({ id: "InstitutionId" })}
                                name="instituionId"
                                value={instituionId}
                                onChange={(value) => {
                                  setInstitutionId(value);
                                  values.instituionId = value.value;
                                }}
                                onBlur={handleBlur}
                                isSearchable={true}
                                options={InstitutionListOption}
                                isLoading={false}
                                loadingMessage={() => "Fetching Data"}
                                noOptionsMessage={() => "Institution List"}
                              /> */}
                            </div>
                          </Col>

                          {/* <Col lg={4} md={6}>
                          <div className="form-group">
                            <label>Benefeciary Id</label>
                            <input
                              type="text"
                              placeholder="Benefeciary Id"
                              value={props?.userinfo?.beneficiaryId}
                            />
                          </div>
                        </Col> */}
                          <Col lg={4} md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "SubscribweId" })}</label>
                              <input
                                type="text"
                                placeholder={covert({ id: "SubscribweId" })}
                                name="subscriberId"
                                value={values.subscriberId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                // readOnly={editinput}
                              />

                              {/* <Select
                                placeholder={covert({ id: "SubscribweId" })}
                                name="subscriberId"
                                value={benfId}
                                onChange={(value) => {
                                  setBenefId(value);
                                  values.subscriberId = value.value;
                                }}
                                onBlur={handleBlur}
                                isSearchable={true}
                                options={benefOption}
                                isLoading={false}
                                loadingMessage={() => "Fetching Data"}
                                noOptionsMessage={() => "Subscriber List"}
                              /> */}
                            </div>
                          </Col>

                          <Col lg={4} md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "Phone Number" })}</label>
                              <input
                                placeholder="1235-452-567"
                                name="phoneNumber"
                                value={values.phoneNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {/* <img
                                className="inpt-img"
                                src={"/assets/images/accept-mob.svg"}
                                alt="img"
                              /> */}
                            </div>
                          </Col>

                          <Col lg={4} md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "Email" })}</label>
                              <input
                                placeholder="1235-452-567"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {/* <img
                                className="inpt-img"
                                src={"/assets/images/accept-mob.svg"}
                                alt="img"
                              /> */}
                            </div>
                          </Col>

                          <Col lg={4} md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "password" })}</label>
                              <input
                                placeholder={covert({ id: "password" })}
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col>

                          {/* <Col lg={4} md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "Birth Date" })}</label>
                              <input
                                type="date"
                                name="birthdate"
                                value={values.birthdate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col> */}

                          <Col lg={4} md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "auxid" })}</label>
                              <input
                                placeholder="1235-452-567"
                                name="auxiliaryCenterId"
                                value={values.auxiliaryCenterId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col>

                          <Col md={4}>
                            <div className="re-edit-pss benfits-btn mt-4">
                              {/* <button>Discard </button> */}
                              <button
                                className="clr-btn"
                                for="form-datas"
                                type="submit"
                              >
                                {covert({ id: "Submit" })}
                              </button>
                            </div>
                          </Col>

                          {/* <Col md={4}>
                          {userrole?.length > 0 && (
                            // <div className="orgn-tags mt-4">
                            //   <ul>
                            //     {userrole &&
                            //       userrole?.map((val, i) => <li>{val}</li>)}
                            //   </ul>
                            // </div>

                            <div className="prt-fmr">
                              <div className="orgn-tags edt-tags">
                                {userrole &&
                                  userrole?.map((val, is) => (
                                    <label className="multipal-slt" key={is}>
                                      {val}{" "}
                                      <img
                                        className="img-fluid mt-4"
                                        src={"/assets/images/sl-close.svg"}
                                        alt="img"
                                        onClick={(e) => removeRole(e, val)}
                                      />
                                    </label>
                                  ))}
                              </div>
                            </div>
                          )} */}

                          {/* <div className="tag-inpt">
                            <select onChange={(e) => setRoles(e)}>
                              <option value="" selected>
                                --Select Role--
                              </option>
                              {data &&
                                data?.map((val, ind) => (
                                  <option
                                    value={val.role}
                                    disabled={userrole?.includes(val?.role)}
                                  >
                                    {val?.role}
                                  </option>
                                ))}
                            </select>
                          </div> */}
                          {/* </Col> */}
                        </Row>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
      <UserEditModal
        show={userEdit}
        onHide={() => setUserEditModal(false)}
        userinfo={userInformation}
        InstitutionListOption={InstitutionListOption}
        benefOption={benefOption}
        docListOption={docListOption}
        docList={docList}
        benefList={benefList}
        institutionList={institutionList}
      />
      <ChangePassword
        show={passwordmodal}
        onHide={() => setPasswordModal(false)}
        useridforpasswordchange={useridforpasswordchange}
      />
    </div>
  );
}

export default Admiration;
