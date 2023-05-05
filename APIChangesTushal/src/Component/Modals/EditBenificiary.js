import {
  CreateBenefeciary,
  UpdateBenefeciary,
  UpdateRelationShipMember,
  getSingleBenificary,
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
function EditBenificiary(props) {
  const { formatMessage: covert } = useIntl();
  const dispatch = useDispatch();
  const { single_benificary_res } = useSelector((state) => state.fetchdata);
  const [singleSubscriber, setSingleSubscriber] = useState();
  // console.log("beneficarydataEdit",props.beneficarydataEdit , props.familymember?._id)
  useEffect(() => {
    if (props.show) {
      dispatch(
        getSingleBenificary(props.beneficarydataEdit, props.familymember?._id)
      );
    }
  }, [props.show]);

  useEffect(() => {
    if (single_benificary_res) {
      if (single_benificary_res?.data?.statusCode == "200") {
        setSingleSubscriber(single_benificary_res?.data?.data);
      } else {
        Swal.fire({
          icon: "error",
          title: single_benificary_res,
        });
      }
    }
  }, [single_benificary_res]);

  const handleSubmit = (values) => {
    const data = {
      firstName: values.firtname,
      secondName: values.secondName,
      thirdName: values.thirdName,
      lastName: values.lastName,
      birthdate: values.birthday,
      gender: values.gender,
      relationshipToSubscriber: values.relationshipToSubscriber,
    };

    dispatch(
      UpdateRelationShipMember(
        data,
        props?.beneficarydataEdit,
        props.familymember?._id
      )
    );

    setTimeout(() => {
      props.onHide();
    }, 1200);
    dispatch({ type: "GET_SINGLE_SUBSCRIBER", payload: "" });
  };

  // const data = props?.institutiondata?.split("-");
  const { locale } = useRouter();

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
            <h4>{covert({ id: "Update Beneficiary" })}</h4>
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
                    birthday: singleSubscriber?.birthdate,

                    gender: singleSubscriber?.gender?._id,
                    relationshipToSubscriber:
                      singleSubscriber?.relationshipToSubscriber?._id,
                  }}
                  onSubmit={handleSubmit}
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
                        <Col lg={4} md={4}>
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
                        <Col lg={4} md={4}>
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

                        <Col lg={4} md={4}>
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
                        <Col lg={4} md={4}>
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
                        <Col lg={4} md={4}>
                          <div className="form-group">
                            <label>{covert({ id: "RelationShip" })}: </label>
                            <select
                              value={values.relationshipToSubscriber}
                              name="relationshipToSubscriber"
                              id="relationshipToSubscriber"
                              onChange={handleChange}
                            >
                              <option value="" disabled selected>
                                {covert({ id: "RelationShip" })}
                              </option>
                              {props.relationship &&
                                props.relationship?.map((val, i) => (
                                  <option value={val._id}>
                                    {locale == "ar"
                                      ? val.arabicName
                                      : val.englishName}{" "}
                                  </option>
                                ))}
                              {/* <option value="brother">Brother </option> */}
                            </select>
                          </div>
                        </Col>
                        <Col lg={4} md={4}>
                          <div className="form-group">
                            <label>{covert({ id: "gender" })}: </label>
                            <select
                              name="gender"
                              value={values.gender}
                              onChange={handleChange}
                            >
                              <option value={""} disabled selected>
                                {covert({ id: "Select Gender" })}
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

export default EditBenificiary;
