import AddAccountStatusModal from "@/Component/Modals/MisceLinuos/AddAccountStatusModal";
import AddCityModal from "@/Component/Modals/MisceLinuos/AddCityModal";
import AddRelationShip from "@/Component/Modals/MisceLinuos/AddRelationShip";
import TimeSlotModal from "@/Component/Modals/MisceLinuos/TimeSlotModal";
import {
  CityList,
  ReltationShipBeneficary,
  getAccountstatusEnum,
  getTimeSlotEnum,
} from "@/redux/actions/action";
import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

function AccountStatus() {
  const dispatch = useDispatch();
  const { get_account_list } = useSelector((state) => state.fetchdata);
  const [cityModal, setCityModal] = useState(false);
  const { add_account_status_Res } = useSelector((state) => state.submitdata);
  // const { delete_city_res } = useSelector((state) => state.submidata);
  const [cityList, setCityList] = useState([]);
  useEffect(() => {
    dispatch(getAccountstatusEnum());
  }, []);

  useEffect(() => {
    if (get_account_list) {
      if (get_account_list?.data?.statusCode == "200") {
        setCityList(get_account_list?.data?.data?.objectArray);
      } else {
        Swal.fire({
          icon: "error",
          text: "Something Went Wrong In Relation API",
        });
      }
    }
    return () => {
      dispatch({ type: "GET_ACCOUNTSTATUS_LIST", payload: "" });
    };
  }, [get_account_list]);

  const DeleteCity = (e, val) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // dispatch(DeleteCities(val._id));
      }
    });
  };

  // useEffect(() => {
  //   if (delete_city_res) {
  //     if (delete_city_res?.data?.statusCode === "200") {
  //       // setLoader(false);
  //        dispatch(CityList());
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         text: "Something Went Wrong",
  //       });
  //     }
  //   }
  // }, [delete_city_res]);

  useEffect(() => {
    if (add_account_status_Res) {
      if (add_account_status_Res?.data?.statusCode === "200") {
        // setLoader(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: add_account_status_Res?.data?.message,
          timer: 2000,
        });
        setCityModal(false);
        dispatch(getAccountstatusEnum());
      } else {
        Swal.fire({
          icon: "error",
          text: add_account_status_Res,
        });
      }
    }
    return () => {
      dispatch({ type: "ADD_ACCOUNT_STATUS_LIST", payload: "" });
    };
  }, [add_account_status_Res]);

  return (
    <>
      <div className="main-content">
        <div className="tnstitution">
          <Row className="align-items-center">
            <Col md={12} className="text-end">
              <div className="benfits-btn">
                <button onClick={() => setCityModal(true)}>
                  + Add New Account Status Enum
                </button>
              </div>
            </Col>
          </Row>
        </div>

        <div className="data-mdcl-cntr mt-2 mb- =\">
          <Row>
            {/* <Col lg={editsidecomponent ? 8 : 12} md={12}> */}
            <Col md={12}>
              <div className="restet-tble">
                <h3>Account Status List</h3>
                <div className="data-tble new-tble-sec">
                  {/* <Table className="table-responsive" onScroll={handleScroll}> */}
                  <Table>
                    <thead>
                      <tr>
                        <th>Backend Name</th>
                        <th>Display Name</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cityList &&
                        cityList?.map((val, i) => (
                          <tr key={i}>
                            <td>{val?.backendName}</td>
                            <td>{val?.displayName}</td>
                            <td>
                              {/* <button
                                className="stus-btn-new red"
                                onClick={(e) => DeleteCity(e, val)}
                              >
                                <AiFillDelete style={{ fontSize: "20px" }} />
                              </button> */}

                              {/* <button className="stus-btn-new">
                                <img
                                  src={"/assets/images/accept-claims.svg"}
                                  alt="img"
                                />{" "}
                                Accepted
                              </button> */}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>

                  {/* {loader === true ? (
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
                  )} */}
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <AddAccountStatusModal show={cityModal} onHide={() => setCityModal(false)} />
      </div>
    </>
  );
}

export default AccountStatus;
