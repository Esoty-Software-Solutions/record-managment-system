import AddCityModal from "@/Component/Modals/MisceLinuos/AddCityModal";
import { CityList } from "@/redux/actions/action";
import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

function Cities() {
  const dispatch = useDispatch();
  const { city_list } = useSelector((state) => state.fetchdata);
  const [cityModal, setCityModal] = useState(false);
  const { add_city_Res, delete_city_res } = useSelector(
    (state) => state.submitdata
  );
  // const { delete_city_res } = useSelector((state) => state.submidata);
  const [cityList, setCityList] = useState([]);
  useEffect(() => {
    dispatch(CityList());
  }, []);

  useEffect(() => {
    if (city_list) {
      if (city_list?.data?.statusCode === "200") {
        // setLoader(false);
        setCityList(city_list?.data?.data?.objectArray);
      } else {
        Swal.fire({
          icon: "error",
          text: "Something Went Wrong",
        });
      }
    }
  }, [city_list]);

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
    if (add_city_Res) {
      if (add_city_Res?.data?.statusCode === "200") {
        // setLoader(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: add_city_Res?.data?.message,
          timer: 2000,
        });
        setCityModal(false);
        dispatch(CityList());
      } else {
        Swal.fire({
          icon: "error",
          text: add_city_Res,
        });
      }
    }
    return () => {
      dispatch({ type: "ADD_CITY_RES", payload: "" });
    };
  }, [add_city_Res]);

  return (
    <>
      <div className="main-content">
        <div className="tnstitution">
          <Row className="align-items-center">
            <Col md={12} className="text-end">
              <div className="benfits-btn">
                <button onClick={() => setCityModal(true)}>
                  + Add New City
                </button>
              </div>
            </Col>
          </Row>
        </div>

        <div className="data-mdcl-cntr mt-2 mb-2">
          <Row>
            {/* <Col lg={editsidecomponent ? 8 : 12} md={12}> */}
            <Col md={12}>
              <div className="restet-tble">
                <h3>City List</h3>
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
                          <tr>
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
            {/* {editsidecomponent ? (
              <Col lg={4} md={12} className="trans-col">
                <div className="clms-expl-dtl mt-4">
                  <div className="explan-name-hdr">
                    <h4>Example Name</h4>
                    <p>Gender: Male</p>
                    <p>Claim ID: 4568</p>
                    <p>Medical Center: Medical Ceneter Name</p>
                  </div>
                  <div className="expl-img">
                    <img src={"/assets/images/explan-img.png"} alt="img" />
                  </div>
                  <table className="clms-drl-tbl">
                    <thead>
                      <tr>
                        <th>Service</th>
                        <th>Package</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Service 1</td>
                        <td>Package 1</td>
                        <td className="d-dlex">
                          <img
                            className="me-3"
                            src={"/assets/images/accept-claim-1.svg"}
                            alt="img"
                          />{" "}
                          <img
                            src={"/assets/images/cross-claim-1.svg"}
                            alt="img"
                          />{" "}
                        </td>
                      </tr>
                      <tr>
                        <td>Service 1</td>
                        <td>Package 1</td>
                        <td className="d-dlex">
                          <img
                            className="me-3"
                            src={"/assets/images/accept-claim-1.svg"}
                            alt="img"
                          />{" "}
                          <img
                            src={"/assets/images/cross-claim-1.svg"}
                            alt="img"
                          />{" "}
                        </td>
                      </tr>
                      <tr>
                        <td>Service 1</td>
                        <td>Package 1</td>
                        <td className="d-dlex">
                          <img
                            className="me-3"
                            src={"/assets/images/accept-claim-1.svg"}
                            alt="img"
                          />{" "}
                          <img
                            src={"/assets/images/cross-claim-1.svg"}
                            alt="img"
                          />{" "}
                        </td>
                      </tr>
                      <tr>
                        <td>Service 1</td>
                        <td>Package 1</td>
                        <td className="d-dlex">
                          <img
                            className="me-3"
                            src={"/assets/images/accept-claim-1.svg"}
                            alt="img"
                          />{" "}
                          <img
                            src={"/assets/images/cross-claim-1.svg"}
                            alt="img"
                          />{" "}
                        </td>
                      </tr>
                      <tr>
                        <td>Service 1</td>
                        <td>Package 1</td>
                        <td className="d-dlex">
                          <img
                            className="me-3"
                            src={"/assets/images/accept-claim-1.svg"}
                            alt="img"
                          />{" "}
                          <img
                            src={"/assets/images/cross-claim-1.svg"}
                            alt="img"
                          />{" "}
                        </td>
                      </tr>
                      <tr>
                        <td>Service 1</td>
                        <td>Package 1</td>
                        <td className="d-dlex">
                          <img
                            className="me-3"
                            src={"/assets/images/accept-claim-1.svg"}
                            alt="img"
                          />{" "}
                          <img
                            src={"/assets/images/cross-claim-1.svg"}
                            alt="img"
                          />{" "}
                        </td>
                      </tr>
                      <tr>
                        <td>Service 1</td>
                        <td>Package 1</td>
                        <td className="d-dlex">
                          <img
                            className="me-3"
                            src={"/assets/images/accept-claim-1.svg"}
                            alt="img"
                          />{" "}
                          <img
                            src={"/assets/images/cross-claim-1.svg"}
                            alt="img"
                          />{" "}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="acc-refle-btn">
                    <button>Accept All</button>
                    <button className="red-clr">Refuse All</button>
                  </div>
                </div>
              </Col>
            ) : (
              ""
              // <Col lg={4}>
              //   <center>
              //     <div className="loader-img text-center  m-5">
              //       <img src={"/assets/images/ball-triangle.svg"} alt="img" />
              //     </div>
              //   </center>
              // </Col>
            )} */}
          </Row>
        </div>

        <AddCityModal show={cityModal} onHide={() => setCityModal(false)} />
      </div>
    </>
  );
}

export default Cities;
