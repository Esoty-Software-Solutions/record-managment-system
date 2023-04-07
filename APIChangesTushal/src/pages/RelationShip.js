import AddCityModal from "@/Component/Modals/MisceLinuos/AddCityModal";
import AddRelationShip from "@/Component/Modals/MisceLinuos/AddRelationShip";
import { CityList, ReltationShipBeneficary } from "@/redux/actions/action";
import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

function RelationShip() {
  const dispatch = useDispatch();
  const { beneficary_relation_list } = useSelector((state) => state.fetchdata);
  const [cityModal, setCityModal] = useState(false);
  const { add_relation_res } = useSelector((state) => state.submitdata);
  // const { delete_city_res } = useSelector((state) => state.submidata);
  const [cityList, setCityList] = useState([]);
  useEffect(() => {
    dispatch(ReltationShipBeneficary());
  }, []);

  useEffect(() => {
    if (beneficary_relation_list) {
      if (beneficary_relation_list?.data?.statusCode == "200") {
        setCityList(beneficary_relation_list?.data?.data?.objectArray);
      } else {
        Swal.fire({
          icon: "error",
          text: "Something Went Wrong In Relation API",
        });
      }
    }
    return () => {
      dispatch({ type: "BENE_RETALTION_LIST", payload: "" });
    };
  }, [beneficary_relation_list]);

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
    if (add_relation_res) {
      if (add_relation_res?.data?.statusCode === "200") {
        // setLoader(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: add_relation_res?.data?.message,
          timer: 2000,
        });
        setCityModal(false);
        dispatch(ReltationShipBeneficary());
      } else {
        Swal.fire({
          icon: "error",
          text: add_relation_res,
        });
      }
    }
    return () => {
      dispatch({ type: "ADD_BENE_RETALTION_LIST", payload: "" });
    };
  }, [add_relation_res]);

  return (
    <>
      <div className="main-content">
        <div className="tnstitution">
          <Row className="align-items-center">
            <Col md={12} className="text-end">
              <div className="benfits-btn">
                <button onClick={() => setCityModal(true)}>
                  + Add New Relation
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
                <h3>RelationShip</h3>
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

        <AddRelationShip show={cityModal} onHide={() => setCityModal(false)} />
      </div>
    </>
  );
}

export default RelationShip;
