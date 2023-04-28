import AddCityModal from "@/Component/Modals/MisceLinuos/AddCityModal";
import AddMedicalSpecilaty from "@/Component/Modals/MisceLinuos/AddMedicalSpecilaty";
import { CityList, MedicalSpecialList } from "@/redux/actions/action";
import React, { useCallback, useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

function MedicalSpecilaty() {
  const dispatch = useDispatch();
  const { medical_special_list } = useSelector((state) => state.fetchdata);
  const [cityModal, setCityModal] = useState(false);
  const [UpdateData, setUpdateData] = useState([]);
  const [updatecityModal, UpdatesetCityModal] = useState(false);
  const {
    add_medicalspeciality_Res,
    delete_city_res,
    update_medicalspeciality_Res,
  } = useSelector((state) => state.submitdata);
  // const { delete_city_res } = useSelector((state) => state.submidata);
  const [conut, setObjectCount] = useState();
  const [totaldata, setTotalData] = useState(false);
  const [loader, setLoader] = useState(false);
  const [limit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [cityList, setCityList] = useState([]);

  // useEffect(() => {
  //   setLoader(true);
  //   dispatch(MedicalSpecialList(skip, limit));
  // }, [skip]);

  const APICall = (value) => {
    if (totaldata == false) {
      dispatch(MedicalSpecialList(skip, limit, value));
    } else {
      setLoader(false);
    }
  };

  useEffect(() => {
    setLoader(true);
    APICall();
  }, [skip]);

  useEffect(() => {
    if (medical_special_list) {
      // console.log("sss1", medical_special_list?.data?.data?.objectArray);
      if (medical_special_list?.data?.statusCode == "200") {
        setLoader(false);
        if (skip == 0) {
          setCityList(medical_special_list?.data?.data?.objectArray);
          setObjectCount(medical_special_list?.data?.data?.objectCount);
        } else {
          let datas = [...medical_special_list?.data?.data?.objectArray];
          let result = datas.filter(
            (o1) => !cityList.some((o2) => o1._id == o2._id)
          );

          setCityList((pre) => [...pre, ...result]);
          // setData((pre) => [...pre, ...medical_special_list?.data?.data?.objectArray]);
          setObjectCount(medical_special_list?.data?.data?.objectCount);
        }
      } else {
        Swal.fire({
          icon: "error",
          text: "Something Went Wrong",
        });
      }
    }
  }, [medical_special_list]);

  useEffect(() => {
    // this condition for data ==[]
    if (conut == undefined) {
      setTotalData(true);
      setLoader(false);
    } else if (conut <= skip + limit) {
      setTotalData(true);
    } else {
      setTotalData(false);
      setLoader(false);
    }
  }, [conut, cityList]);

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
      if (add_medicalspeciality_Res?.data?.statusCode == "200") {
        // setLoader(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: add_medicalspeciality_Res?.data?.message,
          timer: 2000,
        });
        setCityModal(false);
        dispatch(MedicalSpecialList(skip, limit));
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

  useEffect(() => {
    if (update_medicalspeciality_Res) {
      if (update_medicalspeciality_Res?.data?.statusCode == "200") {
        // setLoader(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: update_medicalspeciality_Res?.data?.message,
          timer: 2000,
        });
        setCityModal(false);
        setSkip(0);
        dispatch(MedicalSpecialList(0, limit));
      } else {
        Swal.fire({
          icon: "error",
          text: update_medicalspeciality_Res,
        });
      }
    }
    return () => {
      dispatch({ type: "UPDATE_MEDIACLSPECILAITY_RES", payload: "" });
    };
  }, [update_medicalspeciality_Res]);

  const { formatMessage: covert } = useIntl();
  const EditMedicalSpecilaty = (e, val) => {
    e.preventDefault();
    setUpdateData(val);
    UpdatesetCityModal(true);
  };

  const LoadMore = () => {
    if (totaldata === false) {
      setLoader(true);
      // setsKip((pre) => pre + 5);
      setSkip((pre) => pre + 10);
    } else {
      setLoader(false);
    }
  };

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
      setLoader(true);
      APICall(valu);
      setCityList([]);
    }),
    []
  );
  return (
    <>
      <div className="main-content">
        <div className="tnstitution">
          <Row className="align-items-center">
            <Col md={6}>
              <div className="filter-chek mt-4">
                <div className="srch-text">
                  <input
                    type="text"
                    placeholder={covert({ id: "Search" })}
                    onChange={(e) => {
                      setLoader(true);
                      // SetsearchQuery(e.target.value);
                      optimizedFn(e.target.value);
                    }}
                  />
                  <img src={"/assets/images/srch-1.svg"} alt="img" />
                </div>
              </div>
            </Col>
            <Col md={6} className="text-end">
              <div className="benfits-btn">
                <button onClick={() => setCityModal(true)}>
                  {covert({ id: "addnewmedicalspecilaty" })}
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
                <h3>{covert({ id: "medicalSpcecalty" })}</h3>
                <div className="data-tble new-tble-sec">
                  {/* <Table className="table-responsive" onScroll={handleScroll}> */}
                  <Table>
                    <thead>
                      <tr>
                        <th>{covert({ id: "bankendName" })}</th>
                        <th>{covert({ id: "DisplayName" })}</th>
                        <th>{covert({ id: "arabicName" })}</th>
                        <th>{covert({ id: "Action" })}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cityList &&
                        cityList?.map((val, i) => (
                          <tr key={i}>
                            <td>{val?.backendName}</td>
                            <td>{val?.englishName}</td>
                            <td>{val?.arabicName}</td>
                            <td>
                              <button
                                className="stus-btn-new"
                                onClick={(e) => EditMedicalSpecilaty(e, val)}
                              >
                                <AiFillEdit style={{ fontSize: "20px" }} />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>

                  {loader === true ? (
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
            </Col>
          </Row>
        </div>

        <AddMedicalSpecilaty
          show={cityModal}
          onHide={() => setCityModal(false)}
        />
        <AddMedicalSpecilaty
          show={updatecityModal}
          onHide={() => UpdatesetCityModal(false)}
          data={UpdateData}
        />
      </div>
    </>
  );
}

export default MedicalSpecilaty;
