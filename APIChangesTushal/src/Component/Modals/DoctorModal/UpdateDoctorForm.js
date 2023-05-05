import React, { useEffect, useState } from "react";
import {
  Tooltip,
  OverlayTrigger,
  Modal,
  Row,
  Col,
  Table,
} from "react-bootstrap";

import { TiTick } from "react-icons/ti";
import { Formik } from "formik";
import {
  createSchedulesByDoctor,
  getSingleDocotor,
  UpdateDoc,
} from "../../../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";
import ErrorComponent from "../../../Utils/ErrorComponent";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import Swal from "sweetalert2";
function UpdateDoctorForm(props) {
  const [singledoc, setSingleDoctor] = useState();
  const { single_doctor_res } = useSelector((state) => state.fetchdata);
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    dispatch(UpdateDoc(values, props.medicaldata?._id));
    props.onHide();
    dispatch({ type: "GET_SINGLE_DOCTOR", payload: "" });
  };
  const { locale } = useRouter();

  const { formatMessage: covert } = useIntl();

  useEffect(() => {
    if (props.show) dispatch(getSingleDocotor(props.medicaldata?._id));
  }, [props.show]);

  useEffect(() => {
    if (single_doctor_res) {
      if (single_doctor_res?.data?.statusCode == "200") {
        setSingleDoctor(single_doctor_res?.data?.data);
      } else {
        Swal.fire({
          icon: "error",
          title: single_doctor_res,
        });
      }
    }
  }, [single_doctor_res]);

  // console.log("single_doctor_res", singledoc);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={locale == "ar" ? "add-medi-cntr new-rtl" : "add-medi-cntr"}
    >
      <Modal.Body className="p-0 ">
        <div className="add-new-bene institution">
          <h4>{covert({ id: "updatedoctor" })}</h4>
          <Row>
            <Col md={12}>
              <Formik
                initialValues={{
                  first: singledoc?.firstName,
                  second: singledoc?.secondName,
                  // middle: singledoc?.middleName,
                  last: singledoc?.lastName,
                  gender: singledoc?.gender?._id,
                  birthdate: singledoc?.birthdate,
                  specialty: singledoc?.specialty?._id,
                  level: singledoc?.level,
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
                  <div className="add-denefi-marker">
                    <div className="add-form p-0">
                      <form id="form-data" onSubmit={handleSubmit}>
                        <Row>
                          <Col md={4}>
                            <div className="form-group">
                              <label>{covert({ id: "fname" })} </label>
                              <input
                                type="text"
                                name="first"
                                value={values.first}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={covert({ id: "fname" })}
                              />
                            </div>
                            <ErrorComponent
                              error={
                                errors.first && touched.first && errors.first
                              }
                            />
                          </Col>
                          <Col md={4}>
                            <div className="form-group">
                              <label>{covert({ id: "secondname" })}</label>
                              <input
                                type="text"
                                name="second"
                                value={values.second}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={covert({ id: "secondname" })}
                              />
                            </div>
                            <ErrorComponent
                              error={
                                errors.second && touched.second && errors.second
                              }
                            />
                          </Col>
                          {/* <Col md={4}>
                            <div className="form-group">
                              <label>{covert({ id: "mname" })} </label>
                              <input
                                type="text"
                                placeholder={covert({ id: "mname" })}
                                name="middle"
                                value={values.middle}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                            <ErrorComponent
                              error={
                                errors.middle && touched.middle && errors.middle
                              }
                            />
                          </Col> */}
                          <Col md={4}>
                            <div className="form-group">
                              <label>{covert({ id: "lname" })} </label>
                              <input
                                type="text"
                                placeholder={covert({ id: "lname" })}
                                name="last"
                                value={values.last}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                            <ErrorComponent
                              error={errors.last && touched.last && errors.last}
                            />
                          </Col>
                          <Col md={3}>
                            <div className="form-group">
                              <label>{covert({ id: "gender" })}: </label>
                              <select
                                name="gender"
                                value={values.gender}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option value="" selected>
                                  --Select Gender--
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
                            <ErrorComponent
                              error={
                                errors.gender && touched.gender && errors.gender
                              }
                            />
                          </Col>
                          <Col md={3}>
                            <div className="form-group">
                              <label>{covert({ id: "onlydob" })} </label>
                              <input
                                type="date"
                                name="birthdate"
                                value={values.birthdate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                            <ErrorComponent
                              error={
                                errors.birthdate &&
                                touched.birthdate &&
                                errors.birthdate
                              }
                            />
                          </Col>
                          <Col md={3}>
                            <div className="form-group">
                              <label>{covert({ id: "Specialty" })} </label>
                              <select
                                name="specialty"
                                value={values.specialty}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option value="" selected>
                               
                                  {covert({ id: "selectSpecilaity" })}
                                </option>

                                {props.specialLists &&
                                  props.specialLists?.map((v, ia) => (
                                    <option key={ia} value={v?._id}>
                                      {locale == "ar"
                                        ? v?.arabicName
                                        : v?.englishName}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <ErrorComponent
                              error={
                                errors.specialty &&
                                touched.specialty &&
                                errors.specialty
                              }
                            />
                          </Col>
                          <Col md={3}>
                            <div className="form-group">
                              <label>{covert({ id: "level" })} </label>
                              <select
                                name="level"
                                value={values.level}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option value="" selected>
                                  --Select Level--
                                </option>
                                <option value="Intern">Intern</option>
                                <option value="General Doctor">
                                  General Doctor
                                </option>
                              </select>
                            </div>
                            <ErrorComponent
                              error={
                                errors.level && touched.level && errors.level
                              }
                            />
                          </Col>
                        </Row>
                      </form>
                    </div>
                  </div>
                )}
              </Formik>
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="can-sve mt-0">
          <button onClick={props.onHide} className="cls-btn-btn">
            {covert({ id: "Cancel" })}
          </button>
          <button className="add-fmy-btn" type="submit" form="form-data">
            {covert({ id: "onlyUpdate" })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateDoctorForm;
