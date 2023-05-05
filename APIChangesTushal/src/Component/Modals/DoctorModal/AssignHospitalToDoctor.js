import React, { useCallback, useEffect, useState } from "react";
import {
  Tooltip,
  OverlayTrigger,
  Modal,
  Row,
  Col,
  Table,
} from "react-bootstrap";

import { TiTick } from "react-icons/ti";
import {
  MedicalCenterList,
  createSchedulesByDoctor,
} from "../../../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";
function AssignHospitalToDoctor(props) {
  const dispatch = useDispatch();
  const [medicalList, setMedicalList] = useState([]);
  const [count, setObjectCount] = useState();
  const [skip, setSkip] = useState(0);
  const [limit] = useState(5);
  const [loader, setLoader] = useState(false);
  const [stopapi, setStopAPi] = useState(false);
  const oldmedical = props?.previosMedical?.map((val) => {
    return val?.medicalCenter?._id;
  });

  const CreateSchedule = (e, val) => {
    e.preventDefault();
    console.log("medical", val);
    const data = {
      medicalCenterId: val?._id,
      doctorId: props.medicaldata?._id,
      timeSlot: null,
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
    };
    dispatch(createSchedulesByDoctor(data));
    setTimeout(() => {
      props.onHide();
    }, 1000);
  };

  const { medica_res } = useSelector((state) => state.fetchdata);

  const APICall = (value) => {
    if (stopapi === false) {
      setLoader(true);
      const filter = "";
      // alert("scje");
      dispatch(MedicalCenterList(skip, limit, filter, value));
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
      setMedicalList([]);
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
  }, [count, medicalList]);

  const { formatMessage: covert } = useIntl();

  useEffect(() => {
    if (medica_res) {
      if (medica_res?.data?.statusCode == "200") {
        // setData(medica_res?.data?.data?.objectArray);
        setLoader(false);

        if (skip == 0) {
          setMedicalList(medica_res?.data?.data?.objectArray);

          setObjectCount(medica_res?.data?.data?.objectCount);
        } else {
          // let common = _?.differenceBy(
          //   medica_res?.data?.data?.objectArray,
          //   medicalList,
          //   "_id"
          // );
          // setMedicalList((pre) => [...pre, ...common]);

          // setLoader(false);
          setMedicalList([
            ...medicalList,
            ...medica_res?.data?.data?.objectArray,
          ]);

          setObjectCount(medica_res?.data?.data?.objectCount);
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
      dispatch({ type: "GET_DATA_MEDICAL_RESPONSE", payload: "" });
    };
  }, [medica_res]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="p-0 ">
        <div className="add-new-bene institution">
          <div className="hdd-mdl ">
            <h4>{covert({ id: "Add Hospital" })}</h4>
            <div className="srch-text">
              <input
                type="text"
                placeholder={covert({ id: "Search" })}
                onChange={(e) => {
                  optimizedFn(e.target.value);
                }}
              />
              <img src={"/assets/images/srch-1.svg"} alt="img" />
            </div>
          </div>
          <div className="restet-tble">
            {/* <h4>{props.centerlist?.length} Lisitngs..</h4> */}
            <h4>
              {medicalList?.length} {covert({ id: "Listings" })}..
            </h4>
            <div className="data-tble add-dr-tble   new-table-res">
              {/* <Table className="table-responsive" onScroll={handleScroll}> */}
              <Table>
                <thead>
                  <tr>
                    {/* <th>CenterID</th>
                    <th>Certer Name</th>
                    <th>City</th>
                    <th>Contact</th> */}

                    <th>{covert({ id: "Center ID" })}</th>
                    <th>{covert({ id: "CenterName" })}</th>
                    <th>{covert({ id: "Address" })}</th>
                    <th>{covert({ id: "City" })}</th>

                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {medicalList &&
                    medicalList?.map((val, index) => (
                      <tr>
                        <td>{val?._id}</td>
                        <td>{val?.name}</td>
                        <td className="d-flex">
                          <span className="me-2">
                            <img src={"/assets/images/add-pin.svg"} alt="img" />
                          </span>
                          <span>{val?.city?.englishName}</span>{" "}
                        </td>
                        <td>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id={`tooltip-${index}`}>
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
                              {val?.phoneNumber?.slice(0, 2)?.map((vas, k) => (
                                <span key={k}>{vas}</span>
                              ))}
                            </p>
                          </OverlayTrigger>
                        </td>
                        <td className="">
                          {oldmedical?.includes(val._id) ? (
                            <button>
                              <TiTick style={{ fontSize: "15px" }} />
                            </button>
                          ) : (
                            <button onClick={(e) => CreateSchedule(e, val)}>
                                   {covert({ id: "Add" })}
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
            <button onClick={props.onHide} className="add-fmy-btn">
              Save
            </button>
          </div>
        </Modal.Footer> */}
    </Modal>
  );
}

export default AssignHospitalToDoctor;
