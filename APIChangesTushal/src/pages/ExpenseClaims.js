import React, { useEffect, useState } from "react";
import { Button, Col, Modal, ProgressBar, Row, Table } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { GetData, MedicalCenters } from "../redux/actions/action";
import Swal from "sweetalert2";
import moment from "moment/moment";

function ExpenseClaim() {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [medical, setMedicalData] = useState([]);
  const [fromdate, setFromDate] = useState("");
  const [healthID, setHeatlhId] = useState("");
  const [searchq, SetsearchQuery] = useState("");
  const [todate, setToDate] = useState("");
  const { data_res, medica_res } = useSelector((state) => state.fetchdata);

  useEffect(() => {
    // dispatch(GetData(fromdate, todate, healthID));
    // dispatch(MedicalCenters());
  }, [todate, fromdate, healthID]);

  useEffect(() => {
    if (data_res) {
      if (data_res?.data?.codeStatus == "200") {
        setData(data_res?.data?.data?.objectArray);
      } else {
        Swal.fire({
          icon: "error",
          text: "SomeThing Went Wrong",
          timer: 2000,
        });
      }
    }
    return () => {
      dispatch({ type: "GET_DATA_RESPONSE", payload: "" });
    };
  }, [data_res]);

  useEffect(() => {
    if (medica_res) {
      if (medica_res?.data?.codeStatus == "200") {
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

  const [show, setShow] = useState(false);
  const [greenRow, setGreeenRowIndex] = useState([]);
  const [yellowRow, setYellowRowIndex] = useState([]);
  const [RedRow, setRedRowIndex] = useState([]);
  const [openss, setOpenRow] = useState([]);
  const [tableval, SettableVal] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = (e, id) => {
    e.preventDefault();
    setShow(true);
    if (RedRow.includes(id)) {
      setRedRowIndex((pre) => pre.filter((id) => id !== id));
    } else {
      setRedRowIndex((pre) => [...pre, id]);
    }
  };

  const handleShows = (e, id) => {
    e.preventDefault();

    if (RedRow.includes(id)) {
      setRedRowIndex((pre) => pre.filter((id) => id !== id));
    } else {
      setRedRowIndex((pre) => [...pre, id]);
    }
  };
  const arr = [
    {
      id: 1,
      claim_id: 24324324,
      patient_id: 24324324,
      patient_name: "hmad Mohammed",
      service_id: 24324324,
      service_name: "Walk-in clinich visit",
      service_date: "25/12/2020",
      amount_charged: 10,
      amount_allow: 8,
      amount_allow_coverd: 8,
      amount_not_allow_coverd: 8,
      showdata: {
        patient_id_package: 800,
        pateint_pacakge_limit: 7800,
      },
      calculatedata: [
        {
          ACH: 80,
          AA: 100,
          AC: 78,
          ANC: 0,
        },
        {
          ACH: 80,
          AA: 60,
          AC: 78,
          ANC: 0,
        },
      ],
    },

    {
      id: 2,
      claim_id: 24324324,
      patient_id: 24324324,
      patient_name: "hmad Mohammed",
      service_id: 24324324,
      service_name: "Walk-in clinich visit",
      service_date: "25/12/2020",
      amount_charged: 10,
      amount_allow: 8,
      amount_allow_coverd: 8,
      amount_not_allow_coverd: 8,
      showdata: {
        patient_id_package: 800,
        pateint_pacakge_limit: 7800,
      },
      calculatedata: [
        {
          ACH: 80,
          AA: 100,
          AC: 78,
          ANC: 0,
        },
        {
          ACH: 80,
          AA: 60,
          AC: 78,
          ANC: 0,
        },
      ],
    },

    {
      id: 3,
      claim_id: 24324324,
      patient_id: 24324324,
      patient_name: "hmad Mohammed",
      service_id: 24324324,
      service_name: "Walk-in clinich visit",
      service_date: "25/12/2020",
      amount_charged: 10,
      amount_allow: 8,
      amount_allow_coverd: 8,
      amount_not_allow_coverd: 8,
    },

    {
      id: 4,
      claim_id: 24324324,
      patient_id: 24324324,
      patient_name: "hmad Mohammed",
      service_id: 24324324,
      service_name: "Walk-in clinich visit",
      service_date: "25/12/2020",
      amount_charged: 10,
      amount_allow: 8,
      amount_allow_coverd: 8,
      amount_not_allow_coverd: 8,
    },

    {
      id: 5,
      claim_id: 24324324,
      patient_id: 24324324,
      patient_name: "hmad Mohammed",
      service_id: 24324324,
      service_name: "Walk-in clinich visit",
      service_date: "25/12/2020",
      amount_charged: 10,
      amount_allow: 8,
      amount_allow_coverd: 8,
      amount_not_allow_coverd: 8,
    },
  ];

  const openRow = (e, val) => {
    e.preventDefault();
    // console.log("ddd", val.id);
    if (openss === val.id) {
      setOpenRow();
    } else {
      setOpenRow(val.id);
    }
  };
  const Settable = (e, data) => {
    e.preventDefault();
    SettableVal(data.id);
  };
  const saveSubmit = (e, data) => {
    if (yellowRow?.includes(data?.id)) {
      setYellowRowIndex((pre) => pre.filter((id) => id !== data.id));
    } else {
      setYellowRowIndex((pre) => [...pre, data.id]);
    }

    setOpenRow();
  };

  return (
    <div>
      <div className="main-content">
        <div className="flter-section">
          <div className="slct-srt">
            <Row>
              <Col md={4} className="mb-4">
                <div className="flter d-inline">
                  <label>Institution</label>
                  <select>
                    <option>List of institutions</option>
                    <option>List of institutions</option>
                    {/* <option>last 7 Days</option> */}
                  </select>
                </div>
              </Col>
              <Col md={4} className="mb-4">
                <div className="flter d-inline">
                  <label>Medical Center</label>
                  <select>
                    <option>List of medical centers</option>
                    <option>List of institutions</option>
                    {/* <option>last 7 Days</option> */}
                  </select>
                </div>
              </Col>
              <Col md={4} className="mb-4">
                <div className="flter d-inline">
                  <label>Claim Report</label>
                  <select>
                    <option>List of claim reports</option>
                    <option>List of medical centers</option>
                    <option>List of institutions</option>
                    {/* <option>last 7 Days</option> */}
                  </select>
                </div>
              </Col>
            </Row>
          </div>
          <div className="filter-chek">
            <div className="srch-text mb-2">
              <input
                type="text"
                placeholder="Search here..."
                onChange={(e) => SetsearchQuery(e.target.value)}
              />
              <img src={"/assets/images/srch-1.svg"} alt="img" />
            </div>
            <div className="flter">
              <label className="flterbox">
                Pending (32432)
                <input type="checkbox" />
                <b></b>
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="flter">
              <label className="flterbox">
                Approved (123214)
                <input type="checkbox" />
                <b></b>
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="flter">
              <label className="flterbox">
                Denied (12321)
                <input type="checkbox" />
                <b></b>
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="flter">
              <label className="flterbox">
                Revised (214)
                <input type="checkbox" />
                <b></b>
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="restet-tble">
          <h3>Expenses</h3>
          <div className="expenses-tble">
            <Table className="table-responsive">
              <thead>
                <tr>
                  <th>claim ID</th>
                  <th>patient ID</th>
                  <th>Patient Name</th>
                  <th>Service ID</th>
                  <th>Service Name</th>
                  <th>Service Date</th>
                  <th>Amount Charged</th>
                  <th>Amount Allowed</th>
                  <th>Ammount Covered</th>
                  <th>Amount not Covered</th>
                  <th>
                    Actions
                    <span>
                      <img src={"/assets/images/check-mark.svg"} alt="img" />{" "}
                      <img src={"/assets/images/cross-mark.svg"} alt="img" />
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {arr &&
                  arr.map((vc, i) => (
                    <>
                      <tr
                        // className="green-row"
                        className={
                          greenRow?.includes(vc.id)
                            ? "green-row"
                            : RedRow?.includes(vc.id)
                            ? "red-row"
                            : yellowRow?.includes(vc.id)
                            ? "yellow-row"
                            : ""
                        }
                        onClickCapture={(e) => e.preventDefault()}
                      >
                        <td onClick={(e) => openRow(e, vc)}>{vc?.claim_id}</td>
                        <td onClick={(e) => openRow(e, vc)}>
                          {vc?.patient_id}
                        </td>
                        <td onClick={(e) => openRow(e, vc)}>
                          {vc?.patient_name}
                        </td>
                        <td onClick={(e) => openRow(e, vc)}>
                          {vc?.service_id}
                        </td>
                        <td onClick={(e) => openRow(e, vc)}>
                          {vc?.service_name}
                        </td>
                        <td onClick={(e) => openRow(e, vc)}>
                          {vc?.service_date}
                        </td>
                        <td onClick={(e) => openRow(e, vc)}>
                          {vc?.amount_charged}
                        </td>
                        <td onClick={(e) => openRow(e, vc)}>
                          {vc?.amount_allow}
                        </td>
                        <td onClick={(e) => openRow(e, vc)}>
                          {vc?.amount_allow_coverd}
                        </td>
                        <td onClick={(e) => openRow(e, vc)}>
                          {vc?.amount_not_allow_coverd}
                        </td>
                        <td>
                          <span>
                            {greenRow?.includes(vc.id) ? (
                              <img
                                src={"/assets/images/check-mark.svg"}
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (greenRow.includes(vc.id)) {
                                    return setGreeenRowIndex((pre) =>
                                      pre.filter((id) => id !== vc.id)
                                    );
                                  } else {
                                    setGreeenRowIndex((pre) => [
                                      ...pre,
                                      vc?.id,
                                    ]);
                                  }
                                }}
                                alt="img"
                              />
                            ) : RedRow?.includes(vc.id) ? (
                              <img
                                onClick={(e) => handleShows(e, vc?.id)}
                                src={"/assets/images/cross-mark.svg"}
                                alt="img"
                              />
                            ) : yellowRow?.includes(vc.id) ? (
                              <img
                                onClick={(e) => openRow(e, vc)}
                                src={"/assets/images/yellow-edit.svg"}
                                alt="img"
                              />
                            ) : (
                              <>
                                <img
                                  src={"/assets/images/check-mark.svg"}
                                  onClick={() =>
                                    setGreeenRowIndex((pre) => [...pre, vc?.id])
                                  }
                                  alt="img"
                                />{" "}
                                <img
                                  onClick={(e) => handleShow(e, vc.id)}
                                  src={"/assets/images/cross-mark.svg"}
                                  alt="img"
                                />
                              </>
                            )}
                          </span>
                        </td>
                      </tr>
                      <tr
                        className="yellow-row ectnd-tr"
                        style={{
                          display:
                            openss && openss === vc.id ? "revert " : "none",
                        }}
                      >
                        <td>24324324</td>
                        <td>24324324</td>
                        <td>Ahmad Mohammed</td>
                        <td>24324324</td>
                        <td>Walk-in clinich </td>
                        <td className="bdr-btm">Expected:</td>
                        <td className="bdr-btm">80</td>
                        <td className="bdr-btm">60</td>
                        <td className="bdr-btm">20</td>
                        <td className="bdr-btm">0</td>
                        <td>
                          {" "}
                          <span>
                            {/* <img src={"/assets/images/yellow-edit.svg"} alt="img" /> */}
                          </span>
                        </td>
                      </tr>
                      <tr
                        className="yellow-row ectnd-tr"
                        style={{
                          display:
                            openss && openss === vc.id ? "revert " : "none",
                        }}
                      >
                        <td colspan="3" className="text-end pan-pck">
                          Patient Package Expenditure:
                        </td>
                        <td colspan="2" className="tle-dnr text-center">
                          800 Dinars
                        </td>
                        <td className="bdr-btm">Expected:</td>
                        <td className="bdr-btm">80</td>
                        <td className="bdr-btm">60</td>
                        <td className="bdr-btm">20</td>
                        <td className="bdr-btm">0</td>
                        <td></td>
                      </tr>
                      <tr
                        className="yellow-row ectnd-tr"
                        style={{
                          display:
                            openss && openss === vc.id ? "revert " : "none",
                        }}
                      >
                        <td colspan="3" className="text-end pan-pck">
                          Patient Package Limit:
                        </td>
                        <td colspan="2" className="tle-dnr text-center">
                          1000 Dinars
                        </td>
                        <td>Expected:</td>
                        <td>80</td>
                        <td>
                          <input
                            type="number"
                            name="tableval"
                            value={tableval}
                            onChange={(e) => Settable(e, vc.id)}
                          />
                        </td>
                        <td>20</td>
                        <td>0</td>
                        <td>
                          <button
                            className="sbt-btn-btn"
                            onClick={(e) => saveSubmit(e, vc)}
                          >
                            Submit
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                {/* <tr>
                  <td>24324324</td>
                  <td>24324324</td>
                  <td>Ahmad Mohammed</td>
                  <td>24324324</td>
                  <td>Walk-in clinich visit </td>
                  <td>25/12/2020</td>
                  <td>10</td>
                  <td>8</td>
                  <td>7.5</td>
                  <td>2.5</td>
                  <td>
                    <span>
                      <img
                        src={"/assets/images/check-mark.svg"}
                        onClick={() => setGreeenRowIndex(1)}
                        alt="img"
                      />{" "}
                      <img onClick={handleShow} src={"/assets/images/cross-mark.svg"} alt="img" />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>24324324</td>
                  <td>24324324</td>
                  <td>Ahmad Mohammed</td>
                  <td>24324324</td>
                  <td>Walk-in clinich visit </td>
                  <td>25/12/2020</td>
                  <td>10</td>
                  <td>8</td>
                  <td>7.5</td>
                  <td>2.5</td>
                  <td>
                    <span>
                      <img
                        src={"/assets/images/check-mark.svg"}
                        onClick={() => setGreeenRowIndex(2)}
                        alt="img"
                      />{" "}
                      <img onClick={handleShow} src={"/assets/images/cross-mark.svg"} alt="img" />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>24324324</td>
                  <td>24324324</td>
                  <td>Ahmad Mohammed</td>
                  <td>24324324</td>
                  <td>Walk-in clinich visit </td>
                  <td>25/12/2020</td>
                  <td>10</td>
                  <td>8</td>
                  <td>7.5</td>
                  <td>2.5</td>
                  <td>
                    <span>
                      <img
                        src={"/assets/images/check-mark.svg"}
                        onClick={() => setGreeenRowIndex(3)}
                        alt="img"
                      />{" "}
                      <img onClick={handleShow} src={"/assets/images/cross-mark.svg"} alt="img" />
                    </span>
                  </td>
                </tr>

                <tr className="red-row">
                  <td>24324324</td>
                  <td>24324324</td>
                  <td>Ahmad Mohammed</td>
                  <td>24324324</td>
                  <td>Walk-in clinich visit </td>
                  <td>25/12/2020</td>
                  <td>10</td>
                  <td>8</td>
                  <td>7.5</td>
                  <td>2.5</td>
                  <td>
                    <span>
                      {" "}
                      <img src={"/assets/images/cross-mark.svg"} alt="img" />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>24324324</td>
                  <td>24324324</td>
                  <td>Ahmad Mohammed</td>
                  <td>24324324</td>
                  <td>Walk-in clinich visit </td>
                  <td>25/12/2020</td>
                  <td>10</td>
                  <td>8</td>
                  <td>7.5</td>
                  <td>2.5</td>
                  <td>
                    <span>
                      <img
                        src={"/assets/images/check-mark.svg"}
                        onClick={() => setGreeenRowIndex()}
                        alt="img"
                      />{" "}
                      <img src={"/assets/images/cross-mark.svg"} alt="img" />
                    </span>
                  </td>
                </tr>
                <tr className="yellow-row">
                  <td>24324324</td>
                  <td>24324324</td>
                  <td>Ahmad Mohammed</td>
                  <td>24324324</td>
                  <td>Walk-in clinich visit </td>
                  <td>25/12/2020</td>
                  <td>10</td>
                  <td>8</td>
                  <td>7.5</td>
                  <td>2.5</td>
                  <td>
                    <span>
                      <img src={"/assets/images/yellow-edit.svg"} alt="img" />
                    </span>
                  </td>
                </tr>
                <tr className="yellow-row">
                  <td>24324324</td>
                  <td>24324324</td>
                  <td>Ahmad Mohammed</td>
                  <td>24324324</td>
                  <td>Walk-in clinich visit </td>
                  <td>25/12/2020</td>
                  <td>10</td>
                  <td>8</td>
                  <td>7.5</td>
                  <td>2.5</td>
                  <td>
                    <span>
                      <img src={"/assets/images/yellow-edit.svg"} alt="img" />{" "}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>24324324</td>
                  <td>24324324</td>
                  <td>Ahmad Mohammed</td>
                  <td>24324324</td>
                  <td>Walk-in clinich visit </td>
                  <td>25/12/2020</td>
                  <td>10</td>
                  <td>8</td>
                  <td>7.5</td>
                  <td>2.5</td>
                  <td>
                    <span>
                      <img
                        src={"/assets/images/check-mark.svg"}
                        onClick={() => setGreeenRowIndex()}
                        alt="img"
                      />{" "}
                      <img src={"/assets/images/cross-mark.svg"} alt="img" />
                    </span>
                  </td>
                </tr>
                <tr className="green-row">
                  <td>24324324</td>
                  <td>24324324</td>
                  <td>Ahmad Mohammed</td>
                  <td>24324324</td>
                  <td>Walk-in clinich visit </td>
                  <td>25/12/2020</td>
                  <td>10</td>
                  <td>8</td>
                  <td>7.5</td>
                  <td>2.5</td>
                  <td>
                    <span>
                      <img src={"/assets/images/check-mark.svg"} alt="img" />
                    </span>
                  </td>
                </tr>
                <tr className="green-row">
                  <td>24324324</td>
                  <td>24324324</td>
                  <td>Ahmad Mohammed</td>
                  <td>24324324</td>
                  <td>Walk-in clinich visit </td>
                  <td>25/12/2020</td>
                  <td>10</td>
                  <td>8</td>
                  <td>7.5</td>
                  <td>2.5</td>
                  <td>
                    <span>
                      <img src={"/assets/images/check-mark.svg"} alt="img" />
                    </span>
                  </td>
                </tr> */}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <Modal className="rejection-mdl" show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="reje-res">
            <h3>Rejection or Revise Reason</h3>
            <div className="serch-section mb-4">
              <input type="name" placeholder="Search by name" />
              <img src={"/assets/images/search-normal.svg"} alt="img" />
            </div>
            <Table>
              <thead>
                <tr>
                  <th>Reason ID</th>
                  <th>Reason Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>23432234</td>
                  <td>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </td>
                </tr>
                <tr>
                  <td>23432234</td>
                  <td>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </td>
                </tr>
                <tr>
                  <td>23432234</td>
                  <td>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </td>
                </tr>
                <tr>
                  <td>23432234</td>
                  <td>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </td>
                </tr>
                <tr>
                  <td>23432234</td>
                  <td>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </td>
                </tr>
              </tbody>
            </Table>
            <div className="reson-fild">
              <textarea
                cols="4"
                rows="5"
                placeholder="Custom reason...."
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="can-sve mt-0 reson-btn-btn">
            <button onClick={handleClose} className="cls-btn-btn">
              Cancel
            </button>
            <button className="add-fmy-btn" onClick={handleClose}>
              Add
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ExpenseClaim;
