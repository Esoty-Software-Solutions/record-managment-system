import React from 'react'
import {Tooltip,OverlayTrigger,Modal,Row,Col,Table} from "react-bootstrap"

import { TiTick } from 'react-icons/ti';
import { createSchedulesByDoctor } from '../../../redux/actions/action';
import { useDispatch } from 'react-redux';
function AssignHospitalToDoctor(props) {
    const dispatch = useDispatch();
    const oldmedical = props?.previosMedical?.map((val) => {
      return val?.medicalCenter?._id;
    });

  
    const CreateSchedule = (e, val) => {
      e.preventDefault();
      console.log("medical", val);
      const data = {
        medicalCenterId: val?._id,
        doctorId: props.medicaldata?._id,
        timeSlot:null,
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
              <h4>Add Hospital</h4>
              <div className="srch-text">
                <input type="text" placeholder="Search here..." />
                <img src={"/assets/images/srch-1.svg"} alt="img" />
              </div>
            </div>
            <div className="restet-tble">
              <h4>{props.centerlist?.length} Lisitngs..</h4>
              <div className="data-tble add-dr-tble new-tble-sec">
                {/* <Table className="table-responsive" onScroll={handleScroll}> */}
                <Table>
                  <thead>
                    <tr>
                      <th>CenterID</th>
                      <th>Certer Name</th>
                      <th>City</th>
                      <th>Contact</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.centerlist &&
                      props.centerlist?.map((val, index) => (
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
                                {val?.phoneNumber
                                  ?.slice(0, 2)
                                  ?.map((vas, k) => (
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
                                + Add
                              </button>
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

export default AssignHospitalToDoctor