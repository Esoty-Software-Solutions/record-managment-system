import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Table } from "react-bootstrap"
import { createSchedulesByMedical } from '../../redux/actions/action';

import { TiTick } from "react-icons/ti"
import { useIntl } from 'react-intl';
function AddDocotorToMedical(props) {
    const dispatch = useDispatch();
    // const [doctorarray, setdoctorArray] = useState([]);
    const olddoctor = props?.previosudoctor?.map((val) => {
        return val?.doctor?._id;
    });
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
        props.onHide()
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
                        <h4>{covert({id:"Add Doctor"})}</h4>
                        <div class="srch-text">
                            <input type="text" placeholder="Search here..." />
                            <img src={"/assets/images/srch-1.svg"} alt="img" />
                        </div>
                    </div>
                    <div className="restet-tble">
                        <h4>{props?.doctorlist?.length} Lisitngs..</h4>
                        <div className="data-tble add-dr-tble">
                            {/* <Table className="table-responsive" onScroll={handleScroll}> */}
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Doctor ID</th>
                                        <th>Doctor Name</th>
                                        <th>Specialty</th>
                                        <th>Level</th>
                                        <th>Birthdate (Age)</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props?.doctorlist &&
                                        props?.doctorlist?.map((value, index) => (
                                            <tr>
                                                <td>{value?._id}</td>
                                                <td>{value?.firstName + " " + value?.lastName}</td>
                                                <td>{value?.specialty?.englishName}</td>
                                                <td>{value?.level}</td>
                                                {/* <td>{value?.birthdate} (Age) </td> */}
                                                <td>{value?.birthdate} </td>
                                                <td className="">
                                                    {olddoctor?.includes(value?._id) ? (
                                                        <button>
                                                            <TiTick style={{ fontSize: "15px" }} />
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={(e) =>
                                                                addDoctortoMedical(e, value?._id)
                                                                // addDoctortoMedical(e, value?.doctorId)
                                                            }
                                                        >
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

export default AddDocotorToMedical