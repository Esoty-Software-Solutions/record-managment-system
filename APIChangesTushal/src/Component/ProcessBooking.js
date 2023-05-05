import React, { useCallback, useEffect, useState } from "react";
import {
  Col,
  OverlayTrigger,
  ProgressBar,
  Row,
  Table,
  Tooltip,
} from "react-bootstrap";

import { BiReset, BiSortAlt2 } from "react-icons/bi";

import { useDispatch, useSelector } from "react-redux";
import {
  GetData,
  MedicalCenters,
  UpdateAppointment,
  getAppointmentStatus,
} from "../redux/actions/action";
import Swal from "sweetalert2";
import moment from "moment/moment";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";

function ProcessBooking() {
  const { locale } = useRouter();

  // const tableref = useRef();
  // const tablebodyref = useRef();
  // const tableheadref = useRef();
  // const tableref = useRef(null);

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [skip, setsKip] = useState(0);
  const [medical, setMedicalData] = useState([]);
  const [fromdate, setFromDate] = useState("");
  const [totaldata, setTotalData] = useState(false);
  const [loader, setLoader] = useState(false);
  const [healthID, setHeatlhId] = useState("");
  const [searchq, SetsearchQuery] = useState("");
  // const [status, setStatuss] = useState("");
  const [booked, setBooked] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [pending, setPending] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [top, setTop] = useState();
  const [conut, setObjectCount] = useState(0);
  const [appointmentStatusid, setAPpoinMntStatus] = useState("");
  const [sorting, setSorting] = useState("descending");
  const [medicalcenterid, setMedicalCenterid] = useState("");
  const [appointmentList, setAppointMentList] = useState([]);

  const [todate, setToDate] = useState("");
  const { data_res, medica_res, appointment_List } = useSelector(
    (state) => state.fetchdata
  );
  // const {  } = useSelector((state) => state.fetchdata);

  const { update_res } = useSelector((state) => state.submitdata);
  const [filterview, setfilterView] = useState(true);
  useEffect(() => {
    dispatch(MedicalCenters());
    dispatch(getAppointmentStatus(0, 500, ""));
  }, []);

  const APICall = (
    value,
    appointmentStatusID,
    medicalcenterID,
    fromdate,
    todate,
    sorting
  ) => {
    if (totaldata == false) {
      dispatch(
        GetData(
          fromdate,
          todate,
          healthID,
          limit,
          skip,
          booked,
          completed,
          pending,
          cancelled,
          value ? value : searchq,
          appointmentStatusid
            ? appointmentStatusid
            : appointmentStatusID
            ? appointmentStatusID
            : "",
          medicalcenterid
            ? medicalcenterid
            : medicalcenterID
            ? medicalcenterID
            : "",
          sorting
        )
      );
    } else {
      setLoader(false);
    }
  };

  useEffect(() => {
    APICall(
      "",
      appointmentStatusid,
      medicalcenterid,
      fromdate,
      todate,
      sorting
    );
    return () => {
      dispatch({ type: "GET_DATA_RESPONSE", payload: "" });
    };
  }, [
    skip,
    booked,
    completed,
    pending,
    cancelled,
    healthID,
    medicalcenterid,
    appointmentStatusid,
    searchq,
    fromdate,
    todate,
    sorting,
  ]);

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
    debounce((valu, app, medical, fromdate, todate, sorting) => {
      setLoader(true);
      APICall(valu, app, medical, fromdate, todate, sorting);

      // setData([]);
    }),
    []
  );

  useEffect(() => {
    if (data_res) {
      if (data_res?.data?.statusCode == "200") {
        setLoader(false);
        // if (!booked) {
        //   setData((pre) => [...pre, ...data_res?.data?.data?.objectArray]);
        // } else {
        //   if (skip === 0) {
        //     setData(data_res?.data?.data?.objectArray);
        //   } else {
        //     setData((pre) => [...pre, ...data_res?.data?.data?.objectArray]);
        //   }
        // }

        if (skip == 0) {
          setData(data_res?.data?.data?.objectArray);
          setObjectCount(data_res?.data?.data?.objectCount);
        } else {
          setData((pre) => [...pre, ...data_res?.data?.data?.objectArray]);
          setObjectCount(data_res?.data?.data?.objectCount);
        }
      } else {
        Swal.fire({
          icon: "error",
          text: "SomeThing Went Wrong",
          timer: 2000,
        });
        setLoader(false);
      }
    }
    return () => {
      dispatch({ type: "GET_DATA_RESPONSE", payload: "" });
    };
  }, [data_res]);

  useEffect(() => {
    if (medica_res) {
      if (medica_res?.data?.statusCode == "200") {
        setMedicalData(medica_res?.data?.data?.objectArray);
      } else {
        Swal.fire({
          icon: "error",
          text: "SomeThing Went Wrong",
          timer: 2000,
        });
      }
    }
    return () => {
      dispatch({ type: "GET_DATA_MEDICAL_RESPONSE", payload: "" });
    };
  }, [medica_res]);

  useEffect(() => {
    if (update_res) {
      if (update_res?.data?.statusCode == "200") {
        dispatch(
          GetData(
            fromdate,
            todate,
            healthID,
            limit,
            skip,
            booked,
            completed,
            pending,
            cancelled
          )
        );
        Swal.fire({
          icon: "success",
          text: update_res?.data?.message,
          timer: 2000,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "SomeThing Went Wrong",
          timer: 2000,
        });
      }
    }
    return () => {
      dispatch({ type: "UPDATE_APPOINTMENT_LIST", payload: "" });
    };
  }, [update_res]);

  const updateAppointeMent = (e, apptid, bookingid) => {
    e.preventDefault();
    setsKip(0);
    setCompleted(false);
    setBooked(false);
    setPending(false);
    setCancelled(false);
    setAPpoinMntStatus("");
    dispatch(UpdateAppointment(apptid, bookingid));
    // setsKip();
  };

  function handleScroll(e) {
    e.preventDefault();
    // Table Scrlll
    // if (top !== e.target.scrollTop) {
    //   let d = e.target.scrollHeight - (e.target.scrollTop + 1);
    //   if (d === e.target.clientHeight) {
    //     setLoader(true);
    //     setsKip((pre) => pre + 5);
    //     // setTop(e.target.scrollTop);
    //   }
    // }

    // window Scroll

    setTop(document.documentElement.scrollTop);

    if (top !== document.documentElement.scrollTop) {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        // console.log("if call");
        setLoader(true);
        setsKip((pre) => pre + 5);
      }
    }
  }

  const handleBooked = (e) => {
    setTotalData(false);
    setsKip(0);
    setBooked(e.target.checked);
  };
  const handlePending = (e) => {
    setTotalData(false);
    setsKip(0);
    setPending(e.target.checked);
  };
  const handleCompleted = (e) => {
    setTotalData(false);
    setsKip(0);
    setCompleted(e.target.checked);
  };
  const handleCancelled = (e) => {
    setTotalData(false);
    setsKip(0);
    setCancelled(e.target.checked);
  };

  const LoadMore = () => {
    if (totaldata === false) {
      setLoader(true);
      // setsKip((pre) => pre + 5);
      setsKip((pre) => pre + 10);
    } else {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (conut <= skip + limit) {
      setTotalData(true);
    } else {
      setTotalData(false);
      setLoader(false);
    }
  }, [conut, data]);

  const { formatMessage: covert } = useIntl();

  useEffect(() => {
    if (appointment_List) {
      if (appointment_List?.data?.statusCode == "200") {
        setAppointMentList(appointment_List?.data?.data?.objectArray);
      } else {
        Swal.fire({
          icon: "error",
          text: "Something Went Wrong",
        });
      }
    }
  }, [appointment_List]);

  console.log("sorting", sorting);
  return (
    <div>
      <div className="main-content">
        <div className="flter-section">
          <h3 className="fltr-drop">
            {covert({ id: "filter" })}
            <img
              onClick={() => setfilterView(!filterview)}
              className={
                filterview ? `img-fluid ms-2` : ` img-fluid ms-2 rotate-imge`
              }
              src={"/assets/images/drop-icon.svg"}
              alt="img"
            />
          </h3>
          <div className={filterview ? "mt-4" : "removefltr"}>
            <div className="filter-chek">
              <div className="flter">
                <label className="flterbox">
                  {/* Booked */}
                  {covert({ id: "Booked" })}

                  <input
                    type="checkbox"
                    onChange={handleBooked}
                    value={"booked"}
                    checked={booked}
                  />
                  <b></b>
                  <span className="checkmark"></span>
                  {/* {booked ? <span className="checkmark"></span> : ""} */}
                </label>
              </div>
              <div className="flter">
                <label className="flterbox">
                  {/* Cancelled */}
                  {covert({ id: "Cancelled" })}

                  <input
                    type="checkbox"
                    // onChange={handleStatus}
                    onChange={handleCancelled}
                    value={"cancelled"}
                    checked={cancelled}
                  />
                  <b></b>
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="flter">
                <label className="flterbox">
                  {/* Completed */}

                  {covert({ id: "Completed" })}
                  <input
                    type="checkbox"
                    onChange={handleCompleted}
                    // onChange={handleStatus}
                    value={"completed"}
                    checked={completed}
                  />
                  <b></b>
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="flter">
                <label className="flterbox">
                  {/* Pending */}

                  {covert({ id: "Pending" })}
                  <input
                    type="checkbox"
                    // onChange={handleStatus}
                    onChange={handlePending}
                    value={"pending"}
                    checked={pending}
                  />
                  <b></b>
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="srch-text">
                <input
                  type="text"
                  placeholder={covert({ id: "Search" })}
                  value={searchq}
                  onChange={(e) => {
                    SetsearchQuery(e.target.value);
                    optimizedFn(
                      e.target.value,
                      appointmentStatusid,
                      medicalcenterid,
                      fromdate,
                      todate,
                      sorting
                    );
                  }}
                />
                <img src={"/assets/images/srch-1.svg"} alt="img" />
              </div>
            </div>
            <div className=" slct-srt">
              <Row>
                <Col md={3}>
                  <div className="flter d-inline date-input">
                    <label>{covert({ id: "From" })}</label>
                    <input
                      type="date"
                      onChange={(e) => {
                        setTotalData(false);
                        setFromDate(e.target.value);
                      }}
                    />
                  </div>
                </Col>
                <Col md={3}>
                  <div className="flter d-inline date-input">
                    <label>{covert({ id: "To" })}</label>
                    <input
                      type="date"
                      onChange={(e) => {
                        setTotalData(false);
                        setToDate(e.target.value);
                      }}
                    />
                  </div>
                </Col>

                <Col md={3}>
                  <div className="flter d-inline">
                    <label> {covert({ id: "Medical Center List" })}</label>

                    <select
                      value={medicalcenterid}
                      onChange={(e) => {
                        setTotalData(false);
                        setMedicalCenterid(e.target.value);
                        // optimizedFn1(e.target.value, "medical");
                      }}
                    >
                      <option selected value="">
                        {covert({ id: "Medical Center List" })}
                      </option>
                      {medical &&
                        medical?.map((value, i) => (
                          <option value={value?._id} key={i}>
                            {value?.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </Col>
                {/* <Col md={3}>
                  <div className="flter d-inline">
                    <label>{covert({ id: "Sort" })}</label>

                    <select>
                      <option>last 7 Days</option>
                      <option>last 15 Days</option>
                      <option>last 20 Days</option>
               
                    </select>
                  </div>
                </Col> */}
                {/* <Col md={3}>
                  <div className="flter d-inline">
                    <label>Status</label>
                    <select onChange={handleStatus} value={status}>
                      <option selected value="">
                        --Status--
                      </option>
                      <option value={"booked"}>Booked</option>
                      <option value={"cancelled"}>Cancelled</option>
                      <option value={"completed"}>Completed</option>
                      <option value={"pending"}>Pending</option>
                    </select>
                  </div>
                </Col> */}

                {/* <Col md={3}>
                  <div className="flter d-inline">
                   
                    <label>{covert({ id: "SearchBy" })}</label>
                    <select onChange={setHeathFilter}>
                      <option selected value="">
                        Search list of health centers
                      </option>
                      {medical && medical.length
                        ? medical?.map((va, i) => (
                            <option value={va?._id}>{va?.name}</option>
                          ))
                        : ""}
                    </select>
                  </div>
                </Col> */}

                <Col md={3}>
                  <div className="flter d-inline">
                    <label> {covert({ id: "Appoinment Status List" })}</label>
                    {/* <label>{covert({ id: "SearchBy" })}</label> */}
                    <select
                      value={appointmentStatusid}
                      onChange={(e) => {
                        setTotalData(false);
                        setAPpoinMntStatus(e.target.value);
                        // optimizedFn1(e.target.value, "appointment");
                      }}
                    >
                      <option selected value="">
                        {covert({ id: "Appoinment Status List" })}
                      </option>
                      {appointmentList?.map((value, i) => (
                        <option value={value?._id} key={i}>
                          {locale == "ar"
                            ? value?.arabicName
                            : value?.englishName}
                        </option>
                      ))}
                    </select>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>

        <div className="restet-tble">
          <h3>
            {conut} {covert({ id: "Total" })}
            {/* Total Processing Requests */}
          </h3>
          <div className="data-tble fixheder-tbl">
            {/* <Table className="table-responsive" onScroll={handleScroll}> */}
            <Table>
              <thead>
                <tr>
                  <th>{covert({ id: "idno" })}</th>
                  <th>{covert({ id: "Beneficiary Name" })}</th>

                  <th>{covert({ id: "Phone Number" })}</th>
                  <th>{covert({ id: "doctorsname" })}</th>
                  <th>{covert({ id: "Specialty" })}</th>

                  <th>{covert({ id: "CenterName" })}</th>
                  {/* <th>{covert({ id: "District/city" })}</th> */}
                  {/* <th>{covert({ id: "CenterInfo" })}</th> */}
                  <th style={{ cursor: "pointer" }}>
                    {covert({ id: "ApptDate" })}
                    <span
                      onClick={() => {
                        setTotalData(false);
                        sorting == "descending"
                          ? setSorting("ascending")
                          : setSorting("descending");
                      }}
                    >
                      <BiSortAlt2 />
                    </span>
                  </th>
                  {/* <th>{covert({ id: "ApptTime" })}</th> */}
                  <th>{covert({ id: "ApptimeSlot" })}</th>
                  {/* <th>{covert({ id: "ApptPrice" })}</th> */}
                  <th>{covert({ id: "Notes" })}</th>
                  <th>{covert({ id: "Appt Status" })}</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data?.map((val, i) => (
                    <tr key={i}>
                      <td>{val?._id}</td>
                      <td>
                        {val?.beneficiary?.firstName +
                          " " +
                          val?.beneficiary?.secondName +
                          " " +
                          val?.beneficiary?.lastName}
                      </td>
                      <td>{val?.createdBy?.phoneNumber}</td>

                      <td>
                        {val?.schedule?.doctor?.firstName +
                          " " +
                          val?.schedule?.doctor?.secondName +
                          " " +
                          val?.schedule?.doctor?.lastName}
                      </td>
                      <td>{val?.schedule?.doctor?.specialty?.englishName} </td>

                      <td>{val?.schedule?.medicalCenter?.name} </td>
                      {/* <td>
                      

                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id={`tooltip-${i}`}>
                              {val?.medicalCenter?.district}
                            </Tooltip>
                          }
                        >
                          <span>
                            {val?.medicalCenterObject?.district?.substr(0, 10)}
                            {val?.medicalCenterObject?.district?.substring(
                              10
                            ) ? (
                              <>....</>
                            ) : (
                              ""
                            )}
                          </span>
                        </OverlayTrigger>

                        <br />
                      </td> */}
                      {/* <td>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id={`tooltip-${i}`}>
                              {val?.medicalCenterId?.address}
                            </Tooltip>
                          }
                        >
                          <p>
                            {val?.medicalCenterId?.address?.substr(0, 10)}

                            {val?.medicalCenterId?.address?.substring(10) ? (
                              <>....</>
                            ) : (
                              ""
                            )}
                          </p>
                        </OverlayTrigger>
                      </td> */}
                      <td>
                        {moment(val?.appointmentDate).format(
                          // "MMMM Do YYYY, h:mm:ss a"
                          // "LT"
                          "MMMM DD YYYY"
                        )}
                        <br />
                        {/* {val?.timeslot} */}
                      </td>
                      <td>{val?.timeSlot?.englishName}</td>
                      {/* <td>{val?.price}</td> */}
                      <td>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            // <Tooltip id={`tooltip-${i}`}>{val?.notes}</Tooltip>
                            <Tooltip id={`tooltip-${i}`}>
                              {val?.schedule?.medicalCenter?.description}
                            </Tooltip>
                          }
                        >
                          <p>
                            {val?.schedule?.medicalCenter?.description?.substr(
                              0,
                              10
                            )}

                            {val?.schedule?.medicalCenter?.description?.substring(
                              10
                            ) ? (
                              <>....</>
                            ) : (
                              ""
                            )}
                          </p>
                        </OverlayTrigger>
                      </td>
                      {/* <td className="link-acces-btn">
                        {val?.appointmentStatus === "pending" ||
                        val?.appointmentStatus === "completed" ||
                        val?.appointmentStatus === "rejected" ? (
                          <>
                            <button
                              onClick={(e) => updateAppointeMent(e, val, "")}
                              className="modi"
                            >
                              Modify
                            </button>{" "}
                            <button
                              onClick={(e) =>
                                updateAppointeMent(
                                  e,
                                  val?.appointmentId,
                                  "cancelled"
                                )
                              }
                              className="refu"
                            >
                              Refuse
                            </button>
                            <button
                              onClick={(e) =>
                                updateAppointeMent(
                                  e,
                                  val?.appointmentId,
                                  "booked"
                                )
                              }
                              className="accept"
                            >
                              Accept
                            </button>{" "}
                            <button className="msg-btn border-0">
                              <img
                                style={{ background: "transparent" }}
                                src={"/assets/images/msg-icon.svg"}
                                alt="img"
                              />
                            </button>
                          </>
                        ) : val?.appointmentStatus === "cancelled" ? (
                          <div className="status-div">
                            <img
                              src={"/assets/images/remove-i.svg"}
                              alt="img"
                             
                            />

                            <span>Refused By User</span>
                            <button
                              className="msg-btn border-0"
                              onClick={(e) => ResetStatus(e, val)}
                            >
                              
                              <BiReset style={{ fontSize: "15px" }} />
                            </button>
                            <button className="msg-btn border-0">
                              <img
                                style={{ background: "transparent" }}
                                src={"/assets/images/msg-icon.svg"}
                                alt="img"
                              />
                            </button>
                          </div>
                        ) : val?.appointmentStatus === "booked" ? (
                          <div className="status-div">
                            <img
                              src={"/assets/images/accept-1.svg"}
                              alt="img"
                            />
                            <span>Accept By User</span>

                            <button
                              className="msg-btn border-0"
                              onClick={(e) => ResetStatus(e, val)}
                            >
                              
                              <BiReset style={{ fontSize: "15px" }} />
                            </button>
                            <button className="msg-btn border-0">
                              <img
                                style={{ background: "transparent" }}
                                src={"/assets/images/msg-icon.svg"}
                                alt="img"
                              />
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </td> */}
                      <td className="slct-srt">
                        {appointmentList && (
                          <select
                            onChange={(e) =>
                              updateAppointeMent(e, val?._id, e.target.value)
                            }
                            value={val?.appointmentStatus?._id}
                          >
                            <option selected value="">
                              {covert({ id: "Appoinment Status List" })}
                            </option>
                            {appointmentList?.map((value, i) => (
                              <option value={value?._id} key={i}>
                                {locale == "ar"
                                  ? value?.arabicName
                                  : value?.englishName}
                              </option>
                            ))}
                          </select>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
              {/* {loader === false ? (
                <center>
                  <div className="loader-img text-center  m-5">
                    <img src={Loader} alt="img" />
                  </div>
                </center>
              ) : (
                ""
              )} */}
            </Table>
            {loader === true ? (
              <center>
                <div className="loader-img text-center  m-5">
                  <img src={"/assets/images/ball-triangle.svg"} alt="img" />
                </div>
              </center>
            ) : (
              ""
            )}

            {!totaldata && loader == false ? (
              <center>
                <button className="load-more-btn" onClick={LoadMore}>
                  {" "}
                  {covert({ id: "loadmore" })}
                </button>
              </center>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcessBooking;
