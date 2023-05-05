import {
  CreateBenefeciary,
  UpdateBenefeciary,
  getSingleSubScriber,
} from "@/redux/actions/action";
import { Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Modal,
  OverlayTrigger,
  Row,
  Tab,
  Table,
  Tabs,
  Tooltip,
} from "react-bootstrap";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
function EditSubscriberData(props) {
  const { formatMessage: covert } = useIntl();
  const dispatch = useDispatch();
  const { single_subscriber_res } = useSelector((state) => state.fetchdata);
  const [singleSubscriber, setSingleSubscriber] = useState();
  useEffect(() => {
    if (props.show) {
      dispatch(getSingleSubScriber(props?.beneficarydataEdit?._id));
    }
  }, [props.show]);

  useEffect(() => {
    if (single_subscriber_res) {
      if (single_subscriber_res?.data?.statusCode == "200") {
        setSingleSubscriber(single_subscriber_res?.data?.data);
      } else {
        Swal.fire({
          icon: "error",
          title: single_subscriber_res,
        });
      }
    }
  }, [single_subscriber_res]);

  const handleSubmit = (values) => {
    const data = {
      firstName: values.firtname,
      // middleName: values.middleName,
      secondName: values.secondName,
      thirdName: values.thirdName,
      lastName: values.lastName,
      birthdate: values.birthday,
      phoneNumber: values.phone,
      gender: values.gender,
      // familyMembers: tabsa,
      //   beneficiaries: tabsa,
      institutionId: values.institutionID,
      city: values.cityId,
    };

    dispatch(UpdateBenefeciary(data, props?.beneficarydataEdit?._id));

    setTimeout(() => {
      props.onHide();
    }, 1200);
    dispatch({ type: "GET_SINGLE_SUBSCRIBER", payload: "" });
  };

  // const data = props?.institutiondata?.split("-");
  const { locale } = useRouter();

  // console.log("singleSubscriber", singleSubscriber);
  return (
    <div>
      <Modal
        className={locale == "ar" ? "add-fmly-mbm new-rtl" : "add-fmly-mbm"}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="p-0 ">
          <div className="add-new-bene">
            <h4>{covert({ id: "Update Subscriber" })}</h4>
            <p>
              {" "}
              {/* {covert({ id: "Company Name" })}:{" "} */}
              {/* <span>{props?.institutiondata?.split("-")[2]}</span>{" "} */}
            </p>
            <div className="add-denefi-marker">
              <div className="add-form">
                <Formik
                  initialValues={{
                    firtname: singleSubscriber?.firstName,
                    secondName: singleSubscriber?.secondName,
                    thirdName: singleSubscriber?.thirdName,

                    lastName: singleSubscriber?.lastName,
                    // grandfathername: singleSubscriber?.thirdName,
                    birthday: singleSubscriber?.birthdate,
                    phone: singleSubscriber?.phoneNumber,

                    cityId: singleSubscriber?.city?._id,
                    // district: singleSubscriber?.thirdName,
                    institutionID: singleSubscriber?.institution?._id,
                    gender: singleSubscriber?.gender?._id,
                    // empId: ,
                    // passport: "",
                    // status: "",
                    // identify_process: "",
                    // institutionID: props?.institutiondata?.split("-")[1],
                  }}
                  onSubmit={handleSubmit}
                  // validationSchema={DoctorForm}
                  enableReinitialize
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                  }) => (
                    <form id="new-form" onSubmit={handleSubmit}>
                      <Row>
                        <Col lg={3} md={4}>
                          <div className="form-group">
                            <label>{covert({ id: "fname" })}: </label>
                            <input
                              type="text"
                              placeholder={covert({ id: "fname" })}
                              name="firtname"
                              value={values.firtname}
                              onChange={handleChange}
                            />
                          </div>
                        </Col>
                        <Col lg={3} md={4}>
                          <div className="form-group">
                            <label>{covert({ id: "secondName" })}: </label>
                            <input
                              type="text"
                              placeholder={covert({ id: "secondName" })}
                              name="secondName"
                              value={values.secondName}
                              onChange={handleChange}
                            />
                          </div>
                        </Col>

                        <Col lg={3} md={4}>
                          <div className="form-group">
                            <label>{covert({ id: "lname" })}: </label>
                            <input
                              type="text"
                              placeholder={covert({ id: "lname" })}
                              name="lastName"
                              value={values.lastName}
                              onChange={handleChange}
                            />
                          </div>
                        </Col>
                        <Col lg={3} md={4}>
                          <div className="form-group">
                            <label>{covert({ id: "onlydob" })}: </label>
                            <input
                              type="date"
                              placeholder="Last name:"
                              name="birthday"
                              value={values.birthday}
                              onChange={handleChange}
                            />
                          </div>
                        </Col>
                        <Col lg={3} md={4}>
                          <div className="form-group">
                            <label>{covert({ id: "Phone Number:" })}</label>
                            <input
                              type="text"
                              placeholder="091-556-3377"
                              name="phone"
                              value={values.phone}
                              onChange={handleChange}
                            />
                          </div>
                        </Col>
                        <Col lg={3} md={4}>
                          <div className="form-group">
                            <label>{covert({ id: "City" })}: </label>
                            <select
                              name="cityId"
                              value={values.cityId}
                              onChange={handleChange}
                            >
                              <option value={""} disabled selected>
                                -- Select City --
                              </option>

                              {props.cityList &&
                                props.cityList?.map((v, ia) => (
                                  <option key={ia} value={v?._id}>
                                    {locale == "ar"
                                      ? v?.arabicName
                                      : v?.englishName}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </Col>

                        <Col lg={3} md={4}>
                          <div className="form-group">
                            <label>{covert({ id: "InstitutionId" })} </label>

                            {/* <input
                              type="text"
                              placeholder={covert({ id: "InstitutionId" })}
                              name="institutionID"
                              value={values.institutionID}
                              onChange={handleChange}
                              readOnly
                            /> */}

                            <select
                              name="institutionID"
                              value={values.institutionID}
                              onChange={handleChange}
                            >
                              <option value={""} selected>
                                --Select Institution--
                              </option>
                              {props.institutionList &&
                                props.institutionList?.map((val, ins) => (
                                  <option value={val?._id} key={ins}>
                                    {val?.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </Col>
                        <Col lg={3} md={4}>
                          <div className="form-group">
                            <label>{covert({ id: "gender" })}: </label>
                            <select
                              name="gender"
                              value={values.gender}
                              onChange={handleChange}
                            >
                              <option value={""} disabled selected>
                                -- Select Gender --
                              </option>

                              {props.genderList &&
                                props.genderList?.map((v, ia) => (
                                  <option key={ia} value={v?._id}>
                                    {locale == "ar"
                                      ? v?.arabicName
                                      : v?.englishName}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </Col>
                      </Row>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="can-sve">
            <button onClick={props.onHide} className="cls-btn-btn">
              {covert({ id: "Cancel" })}
            </button>
            <button className="add-fmy-btn" type="submit" form={"new-form"}>
              {covert({ id: "Update" })}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditSubscriberData;
