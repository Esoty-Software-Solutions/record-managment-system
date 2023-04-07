import AddCityModal from "@/Component/Modals/MisceLinuos/AddCityModal";
import AddMedicalSpecilaty from "@/Component/Modals/MisceLinuos/AddMedicalSpecilaty";
import { CityList, MedicalSpecialList } from "@/redux/actions/action";
import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

function MedicalSpecilaty() {
  const dispatch = useDispatch();
  const { medical_special_list } = useSelector((state) => state.fetchdata);
  const [cityModal, setCityModal] = useState(false);
  const { add_medicalspeciality_Res, delete_city_res } = useSelector(
    (state) => state.submitdata
  );
  // const { delete_city_res } = useSelector((state) => state.submidata);
  const [cityList, setCityList] = useState([]);
  useEffect(() => {
    dispatch(MedicalSpecialList());
  }, []);

  useEffect(() => {
    if (medical_special_list) {
      // console.log("sss1", medical_special_list?.data?.data?.objectArray);
      if (medical_special_list?.data?.statusCode == "200") {
        setCityList(medical_special_list?.data?.data?.objectArray);
      } else {
        Swal.fire({
          icon: "error",
          text: "Something Went Wrong",
        });
      }
    }
  }, [medical_special_list]);

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
    if (add_medicalspeciality_Res) {
      if (add_medicalspeciality_Res?.data?.statusCode === "200") {
        // setLoader(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: add_medicalspeciality_Res?.data?.message,
          timer: 2000,
        });
        setCityModal(false);
        dispatch(MedicalSpecialList());
      } else {
        Swal.fire({
          icon: "error",
          text: add_medicalspeciality_Res,
        });
      }
    }
    return () => {
      dispatch({ type: "ADD_MEDIACLSPECILAITY_RES", payload: "" });
    };
  }, [add_medicalspeciality_Res]);

  return (
    <>
      <div className="main-content">
        <div className="tnstitution">
          <Row className="align-items-center">
            <Col md={12} className="text-end">
              <div className="benfits-btn">
                <button onClick={() => setCityModal(true)}>
                  + Add New Medical Specialty
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
                <h3>Medical Specialty List</h3>
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

        <AddMedicalSpecilaty
          show={cityModal}
          onHide={() => setCityModal(false)}
        />
      </div>
    </>
  );
}

export default MedicalSpecilaty;
