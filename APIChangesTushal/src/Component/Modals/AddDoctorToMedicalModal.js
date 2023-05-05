import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Table } from "react-bootstrap";
import {
  DoctorList,
  createSchedulesByMedical,
} from "../../redux/actions/action";

import { TiTick } from "react-icons/ti";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import moment from "moment";
function AddDocotorToMedical(props) {
  const dispatch = useDispatch();
  // const [doctorarray, setdoctorArray] = useState([]);
  const olddoctor = props?.previosudoctor?.map((val) => {
    return val?.doctor?._id;
  });

  const [doctorList, setDoctorList] = useState([]);
  const [count, setObjectCount] = useState();
  const [skip, setSkip] = useState(0);
  const [limit] = useState(5);
  const [loader, setLoader] = useState(false);
  const [stopapi, setStopAPi] = useState(false);

  const { get_doctor_list } = useSelector((state) => state.fetchdata);

  const APICall = (value) => {
    if (stopapi === false) {
      setLoader(true);
      const filter = "";
      dispatch(DoctorList(skip, limit, filter, value));
    }
  };
  useEffect(() => {
    if (props.show) {
      APICall();
    }
  }, [skip, stopapi, props.show]);

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
      APICall(valu);
      setLoader(true);
      setDoctorList([]);
    }),
    []
  );

  const LoadMore = () => {
    if (stopapi === false) {
      // setLoader(true);
      setSkip((pre) => pre + 5);
    } else {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (count <= skip + limit) {
      setStopAPi(true);
      // setLoadMoreAlwways(false)
    } else {
      setStopAPi(false);
      setLoader(false);
    }
  }, [count, doctorList]);

  useEffect(() => {
    if (get_doctor_list) {
      if (get_doctor_list?.data?.statusCode == "200") {
        // setData(get_doctor_list?.data?.data?.objectArray);
        setLoader(false);

        if (skip == 0) {
          setDoctorList(get_doctor_list?.data?.data?.objectArray);

          setObjectCount(get_doctor_list?.data?.data?.objectCount);
        } else {
          setDoctorList([
            ...doctorList,
            ...get_doctor_list?.data?.data?.objectArray,
          ]);

          setObjectCount(get_doctor_list?.data?.data?.objectCount);
        }
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
      dispatch({ type: "GET_DOCTOR_LIST", payload: "" });
    };
  }, [get_doctor_list]);

  const medicaldatas = props?.medicaldata;

  // const addDoctortoMedical = (e, doctorId) => {
  //   setdoctorArray((pre) => [...pre, doctorId]);
  // };
  // // console.log("doctorarray", doctorarray);
  // const Save = (e) => {
  //   e.preventDefault();
  //   for (let i = 0; i < doctorarray.length; i++) {
  //     const data = {
  //       medicalCenterId: medicaldatas?.medicalCenterId,
  //       doctorId: doctorarray[i],
  //       timeslot: "morning",
  //       startDate: "2023-04-05",
  //       endDate: "2025-02-03",
  //       price: 25,
  //       sunday: false,
  //       monday: false,
  //       tuesday: false,
  //       wednesday: false,
  //       thursday: false,
  //       friday: false,
  //       saturday: false,
  //     };
  //     dispatch(createSchedulesByMedical(data));
  //   }
  //   return props.onHide();
  // };

  const addDoctortoMedical = (e, doctorId) => {
    e.preventDefault();
    props.onHide();
    const data = {
      // medicalCenterId: medicaldatas?.medicalCenterId,
      medicalCenterId: medicaldatas?._id,
      doctorId: doctorId,
      // timeslot: "morning",
      timeSlot: null,
      startDate: "2023-04-05",
      endDate: "2025-02-03",
      price: 25,
      sunday: false,
      monday: true,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
    };
    dispatch(createSchedulesByMedical(data));
    // setTimeout(() => {
    //   return props.onHide();
    // }, 1500);
  };

  // console.log("medicaldatas",medicaldatas)

  const { formatMessage: covert } = useIntl();
  const { locale } = useRouter();

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={locale == "ar" ? "add-medi-cntr new-rtl" : "add-medi-cntr"}
    >
      <Modal.Body className="p-0 ">
        <div className="add-new-bene institution">
          <div className="hdd-mdl ">
            <h4>{covert({ id: "Add Doctor" })}</h4>
            <div class="srch-text">
              <input
                type="text"
                placeholder={covert({ id: "Search" })}
                onChange={(e) => optimizedFn(e.target.value)}
              />
              <img src={"/assets/images/srch-1.svg"} alt="img" />
            </div>
          </div>
          <div className="restet-tble new-table-res">
            <h4>
              {doctorList?.length} {covert({ id: "Listings" })}..
            </h4>
            <div className="data-tble  add-dr-tble ">
              {/* <Table className="table-responsive" onScroll={handleScroll}> */}
              <Table>
                <thead>
                  <tr>
                    {/* <th>Doctor ID</th>
                    <th>Doctor Name</th>
                    <th>Specialty</th>
                    <th>Level</th>
                    <th>Birthdate (Age)</th> */}
                    <th>{covert({ id: "doctorid" })}</th>
                    <th>{covert({ id: "doctorsname" })}</th>

                    <th>{covert({ id: "Specialty" })}</th>
                    <th>{covert({ id: "level" })}</th>
                    <th>{covert({ id: "birthday(age)" })}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {doctorList &&
                    doctorList?.map((value, index) => (
                      <tr>
                        <td>{value?._id}</td>
                        <td>{value?.firstName + " " + value?.lastName}</td>
                        <td>{value?.specialty?.englishName}</td>
                        <td>{value?.level}</td>
                        {/* <td>{value?.birthdate} (Age) </td> */}
                        <td>
                          {moment(value?.birthdate)
                            .subtract(10, "days")
                            .calendar()}{" "}
                        </td>
                        <td className="">
                          {olddoctor?.includes(value?._id) ? (
                            <button>
                              <TiTick style={{ fontSize: "15px" }} />
                            </button>
                          ) : (
                            <button
                              onClick={
                                (e) => addDoctortoMedical(e, value?._id)
                                // addDoctortoMedical(e, value?.doctorId)
                              }
                            >
                              {" "}
                              + {covert({ id: "onlyadd" })}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
                {loader == true ? (
                  <center>
                    <div className="loader-img text-center  m-5">
                      <img src={"/assets/images/ball-triangle.svg"} alt="img" />
                    </div>
                  </center>
                ) : (
                  ""
                )}
                {!stopapi && loader === false ? (
                  <center>
                    <button className="load-more-btn mt-5" onClick={LoadMore}>
                      {" "}
                      {covert({ id: "loadmore" })}
                    </button>
                  </center>
                ) : (
                  ""
                )}
              </Table>
            </div>
          </div>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
                <div className="can-sve mt-0">
                    <button onClick={props.onHide} className="cls-btn-btn">
                        Cancel
                    </button>
                    <button
                        // onClick={Save}
                        onClick={props.onHide}
                        className="add-fmy-btn"
                    >
                        Save
                    </button>
                </div>
            </Modal.Footer> */}
    </Modal>
  );
}

export default AddDocotorToMedical;
