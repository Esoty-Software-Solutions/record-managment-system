import React, { useEffect, useState } from "react";

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
  GetAdmistratotUserList,
  GetUserInfo,
  PostUserInfo,
} from "../redux/actions/action";
import _ from "lodash";
import Swal from "sweetalert2";
import { Formik } from "formik";
function Admiration() {
  const dispatch = useDispatch();

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
  const [count, setObjectCount] = useState();

  let data = [
    {
      id: "1",
      role: "general",
    },
    {
      id: "2",
      role: "doctor",
    },
    {
      id: "3",
      role: "nurse",
    },
    {
      id: "3",
      role: "pateint",
    },
    {
      id: "4",
      role: "Clerk",
    },
    {
      id: "5",
      role: "medical-staff",
    },
  ];
  useEffect(() => {
    if (key == "user") {
      if (stopapi === false) {
        setLoader(true);
        dispatch(GetAdmistratotUserList(skip, limit));
      }
    }
    if (key == "home") {
      dispatch(GetUserInfo("user"));
    }
    return () => {
      dispatch({ type: "GET_USER_ADMIS_LIST", payload: "" });
      dispatch({ type: "GET_USER_INFORMATION", payload: "" });
      dispatch({ type: "ADD_USER_RES", payload: "" });
    };
  }, [key, skip]);

  const { admist_usr_list, get_user_information } = useSelector(
    (state) => state.fetchdata
  );

  const { add_admist_user_res } = useSelector((state) => state.submitdata);

  useEffect(() => {
    if (admist_usr_list) {
      // if (admist_usr_list?.data?.codeStatus === "200") {

      if (admist_usr_list?.data?.statusCode == "200") {
        setLoader(false);
        if (skip == 0) {
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

  const handleSubmit = (values, { resetForm }) => {
    // console.log("Sss", values);
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
    // console.log("data", count, benef_lists?.length)

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
      // setLoadMoreAlwways(false)
    } else {
      setStopAPi(false);
    }
  }, [count, userlist]);
  return (
    <div>
      <div className="main-content">
        <div className="tbs-bot">
          <Tabs
            defaultActiveKey="home"
            transition={false}
            activeKey={key}
            onSelect={(k) => setKey(k)}
            id="noanim-tab-example"
            className="admintration-tbs"
          >
            <Tab eventKey="home" title="Profile">
              <div className="admintration-tbs-dtl">
                <form className="inpt-fld">
                  <div className="prt-fmr">
                    <Row>
                      <Col lg={4} md={6}>
                        <div className="form-group">
                          <label>User Name</label>
                          <input
                            readOnly={editinput}
                            placeholder="username123"
                            value={userinfo?.username}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={6}>
                        <div className="form-group">
                          <label>First Name</label>
                          <input
                            readOnly={editinput}
                            placeholder="Firstname"
                            value={userinfo?.firstName}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={6}>
                        <div className="form-group">
                          <label>Second Name</label>
                          <input
                            readOnly={editinput}
                            placeholder="Secondname"
                            value={userinfo?.secondName}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={6}>
                        <div className="form-group">
                          <label>Third Name</label>
                          <input
                            readOnly={editinput}
                            placeholder="Thirdname"
                            value={userinfo?.thirdName}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={6}>
                        <div className="form-group">
                          <label>Last Name</label>
                          <input
                            readOnly={editinput}
                            placeholder="Lastname"
                            value={userinfo?.lastName}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={6}>
                        <div className="form-group">
                          <label>User Role</label>
                          <input
                            readOnly={editinput}
                            placeholder="Doctor"
                            value={userinfo?.doctorId}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={6}>
                        <div className="form-group">
                          <label>Organization</label>
                          <input
                            readOnly={editinput}
                            placeholder="Alvin Hospital"
                            // value={userinfo?.username}
                          />
                        </div>
                      </Col>

                      <Col lg={4} md={6}>
                        <div className="form-group">
                          <label>Benefeciary Id</label>
                          <input
                            type="text"
                            placeholder="Benefeciary Id"
                            value={userinfo?.beneficiaryId}
                            readOnly={editinput}
                          />
                        </div>
                      </Col>

                      <Col lg={4} md={6}>
                        <div className="form-group">
                          <label>Doctor Id</label>
                          <input
                            type="text"
                            placeholder="Doctor Id"
                            value={userinfo?.doctorId}
                            readOnly={editinput}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={6}>
                        <div className="form-group">
                          <label>Phone Number</label>
                          <input
                            readOnly={editinput}
                            placeholder="1235-452-567"
                            value={userinfo?.phoneNumber}
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
                          <label>Email</label>
                          <input
                            readOnly={editinput}
                            placeholder="example@gmail.com"
                            value={userinfo?.email}
                          />
                          <img
                            className="inpt-img"
                            src={"/assets/images/question-email.svg"}
                            alt="img"
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={6}>
                        <div className="orgn-tags mt-4">
                          <ul>
                            <li>Admin</li>
                            <li>Doctor</li>
                            <li>Reception</li>
                          </ul>
                        </div>
                      </Col>
                      <Col lg={4} md={6} className="porcn-retle">
                        <div className="prt-fmr">
                          <div className="re-edit-pss benfits-btn mt-3">
                            <button>Reset Password </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setEdit(!editinput);
                              }}
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </form>
              </div>
            </Tab>
            <Tab eventKey="user" title="User Management">
              <div className="admintration-tbs-dtl p-0">
                <div className="data-tble fixheder-tbl">
                  {/* <Table className="table-responsive" onScroll={handleScroll}> */}
                  <Table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Account Status</th>
                        <th>Organization</th>
                        <th>User Rols</th>
                        <th>Actions</th>
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
                              <button className="brdr-btn-btn">
                                Reset Password
                              </button>
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
                    Load More{" "}
                  </button>
                </center>
              ) : (
                ""
              )}
            </Tab>
            <Tab eventKey="adduser" title="Add New User">
              <div className="admintration-tbs-dtl">
                <Formik
                  initialValues={{
                    // username: "",
                    // phone: "",
                    // beneid: "",
                    // firstname: "",
                    // lastname: "",
                    // doctor_id: "",

                    username: "",
                    firstname: "",
                    lastname: "",
                    secondName: "",
                    thirdName: "",
                    phoneNumber: "",
                    email: "",
                    doctor_id: "",
                    beneid: "",
                  }}
                  onSubmit={handleSubmit}
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
                          <Col md={4}>
                            <div className="form-group">
                              <label>User Name</label>
                              <input
                                type="text"
                                name="username"
                                placeholder="username123"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="form-group">
                              <label>First Name</label>
                              <input
                                type="text"
                                placeholder="Firstname"
                                name="firstname"
                                value={values.firstname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="form-group">
                              <label>Second Name</label>
                              <input
                                type="text"
                                placeholder="Secondname"
                                name="secondName"
                                value={values.secondName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="form-group">
                              <label>Third Name</label>
                              <input
                                type="text"
                                placeholder="Thirdname"
                                name="thirdName"
                                value={values.thirdName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="form-group">
                              <label>Last Name</label>
                              <input
                                type="text"
                                placeholder="Lastname"
                                name="lastname"
                                value={values.lastname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="form-group">
                              <label>User Role</label>
                              <input type="text" placeholder="Doctor" />
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="form-group">
                              <label>Organization</label>
                              <input type="text" placeholder="Alvin Hospital" />
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="form-group">
                              <label>Benefeciary Id</label>
                              <input
                                type="text"
                                placeholder="Benefeciary Id"
                                name="beneid"
                                value={values.beneid}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="form-group">
                              <label>Doctor Id</label>
                              <input
                                type="text"
                                name="doctor_id"
                                placeholder="Doctor Id"
                                // value={userinfo?.DoctorId}
                                value={values.doctor_id}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="form-group">
                              <label>Phone Number</label>
                              <input
                                type="text"
                                placeholder="1235-452-567"
                                name="phone"
                                value={values.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="form-group">
                              <label>Email</label>
                              <input
                                type="text"
                                placeholder="example@gmail.com"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="prt-fmr">
                              <div className="orgn-tags edt-tags">
                                {rolelist &&
                                  rolelist?.map((val, is) => (
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
                                <img
                                  src={"/assets/images/more-add.svg"}
                                  alt="img"
                                  onClick={() => setHideDiv(true)}
                                />
                                {!hideDiv ? (
                                  ""
                                ) : (
                                  <div className="tag-inpt">
                                    <select onChange={(e) => setRoles(e)}>
                                      <option value="" selected>
                                        --Select Role--
                                      </option>
                                      {data &&
                                        data?.map((val, ind) => (
                                          <option
                                            value={val.role}
                                            disabled={rolelist?.includes(
                                              val?.role
                                            )}
                                          >
                                            {val?.role}
                                          </option>
                                        ))}
                                    </select>
                                  </div>
                                )}
                              </div>
                            </div>
                          </Col>

                          <Col md={4}>
                            <div className="re-edit-pss benfits-btn mt-4">
                              <button>Discard </button>
                              <button className="clr-btn" type="submit">
                                Submit
                              </button>
                            </div>
                          </Col>
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
    </div>
  );
}

export default Admiration;
