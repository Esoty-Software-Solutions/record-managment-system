import AddCityModal from "@/Component/Modals/MisceLinuos/AddCityModal";
import AddRelationShip from "@/Component/Modals/MisceLinuos/AddRelationShip";
import { CityList, ReltationShipBeneficary } from "@/redux/actions/action";
import React, { useCallback, useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

function RelationShip() {
  const dispatch = useDispatch();
  const { formatMessage: covert } = useIntl();

  const [conut, setObjectCount] = useState([]);
  const [totaldata, setTotalData] = useState(false);
  const [loader, setLoader] = useState(false);
  const [limit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [UpdateData, setUpdateData] = useState([]);
  const [updatecityModal, UpdatesetCityModal] = useState(false);
  const { beneficary_relation_list } = useSelector((state) => state.fetchdata);
  const [cityModal, setCityModal] = useState(false);
  const { add_relation_res, update_relation_res } = useSelector(
    (state) => state.submitdata
  );
  // const { delete_city_res } = useSelector((state) => state.submidata);
  const [cityList, setCityList] = useState([]);
  // useEffect(() => {
  //   setLoader(true);
  //   dispatch(ReltationShipBeneficary(skip, limit));
  // }, [skip, limit]);



  const APICall = (value) => {
    if (totaldata == false) {
      dispatch(ReltationShipBeneficary(skip, limit, value));
    } else {
      setLoader(false);
    }
  };
  useEffect(() => {
    setLoader(true);
    APICall();
  }, [skip, limit]);

  useEffect(() => {
    if (beneficary_relation_list) {
      setLoader(false);
      if (beneficary_relation_list?.data?.statusCode == "200") {
        // setCityList(beneficary_relation_list?.data?.data?.objectArray);

        if (skip == 0) {
          setCityList(beneficary_relation_list?.data?.data?.objectArray);
          setObjectCount(beneficary_relation_list?.data?.data?.objectCount);
        } else {
          let datas = [...beneficary_relation_list?.data?.data?.objectArray];
          let result = datas.filter(
            (o1) => !cityList.some((o2) => o1._id == o2._id)
          );

          setCityList((pre) => [...pre, ...result]);

          setObjectCount(beneficary_relation_list?.data?.data?.objectCount);
        }
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





  useEffect(() => {
    if (add_relation_res) {
      if (add_relation_res?.data?.statusCode == "200") {
        // setLoader(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: add_relation_res?.data?.message,
          timer: 2000,
        });
        setCityModal(false);
        dispatch(ReltationShipBeneficary(skip, limit));
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

  useEffect(() => {
    if (update_relation_res) {
      if (update_relation_res?.data?.statusCode == "200") {
        // setLoader(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: update_relation_res?.data?.message,
          timer: 2000,
        });
        setCityModal(false);
        setSkip(0)
        dispatch(ReltationShipBeneficary(0, limit));
      } else {
        Swal.fire({
          icon: "error",
          text: update_relation_res,
        });
      }
    }
    return () => {
      dispatch({ type: "UPDATE_BENE_RETALTION_LIST", payload: "" });
    };
  }, [update_relation_res]);

  const EditMedicalService = (e, val) => {
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


  useEffect(() => {
    // if (conut == data?.length) {
    //   setTotalData(true);
    // }
    // // if (data_res?.data?.data?.objectCount >= data?.length) {
    // if (conut > data?.length) {
    //   setTotalData(false);
    // }

    if (conut <= skip + limit) {
      setTotalData(true);
    } else {
      setTotalData(false);
      setLoader(false);
    }
  }, [conut, cityList]);


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
                  + {covert({ id: "addRelationShip" })}
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
                <h3> {covert({ id: "RelationShip" })}</h3>
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
                                onClick={(e) => EditMedicalService(e, val)}
                              >
                                <AiFillEdit style={{ fontSize: "20px" }} />
                              </button>
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

        <AddRelationShip show={cityModal} onHide={() => setCityModal(false)} />
        <AddRelationShip
          show={updatecityModal}
          onHide={() => UpdatesetCityModal(false)}
          data={UpdateData}
        />
      </div>
    </>
  );
}

export default RelationShip;
