import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import { UpdateUserDetail } from "../../redux/actions/action";
import ErrorComponent from "../../Utils/ErrorComponent";
import { useIntl } from "react-intl";
import Select from "react-select";
import { useRouter } from "next/router";
function UserEditModal(props) {
  const [userrole, setUserRole] = useState(
    props?.userinfo?.userRole ? props?.userinfo?.userRole : []
  );

  const [doctorId, setDoctorId] = useState(null);
  const [instituionId, setInstitutionId] = useState(null);
  const [benfId, setBenefId] = useState(null);

  // console.log("props", props?.userInformation);
  // const [role, setRole] = useState([]);
  const dispatch = useDispatch();

  const UpdateDetails = (values) => {
    // console.log("val", values);

    // dispatch(UpdateUserDetail(props?.userinfo?._id, values));

    const data = {
      ImagingCenterId: values?.ImagingCenterId ? values?.ImagingCenterId : "",
      auxiliaryCenterId: values?.auxiliaryCenterId
        ? values?.auxiliaryCenterId
        : null,
      lastName: values?.lastName ? values?.lastName : "",
      phoneNumber: values?.phoneNumber ? values?.phoneNumber : "",
      email: values?.email ? values?.email : null,
      doctorId: values?.doctorId ? values?.doctorId : null,
      laboratoryId: values?.laboratoryId ? values?.laboratoryId : null,
      pharmacyId: values?.pharmacyId ? values?.pharmacyId : null,
      subscriberId: values?.subscriberId ? values?.subscriberId : null,
      // subscriberId: benfId.value ? benfId.value : null,
      // doctorId: doctorId.value ? doctorId.value : null,
      // instituionId: instituionId.value ? instituionId.value : null,
      instituionId: values.instituionId ? values.instituionId : null,
      firstName: values?.firstName ? values?.firstName : "",
      secondName: values?.secondName ? values?.secondName : "",
      thirdName: values?.thirdName ? values?.thirdName : "",
      username: values?.username ? values?.username : "",
      role: values?.role ? values?.role : "",
    };

    dispatch(UpdateUserDetail(props?.userinfo?._id, data));

    // setTimeout(() => {

    // }, 1500);
    // props.onHide();
  };

  const setRoles = (e) => {
    e.preventDefault();
    if (userrole?.length == 0) {
      setUserRole([e.target.value]);
    } else {
      setUserRole((pre) => [...pre, e.target.value]);
    }
  };

  // console.log("role", props?.userinfo);

  const removeRole = (e, data) => {
    e.preventDefault();
    setUserRole((current) => current.filter((rolelist) => rolelist !== data));
  };
  const { formatMessage: covert } = useIntl();
  const { locale } = useRouter();
  useEffect(() => {
    if (props) {
      let findoctorvalue = props?.docList?.filter((val) => {
        return val._id == props?.userinfo?.doctorId;
      });
      let findsubsvalue = props?.benefList?.filter((val) => {
        return val._id == props?.userinfo?.subscriberId;
      });
      let findinstitutionvalue = props?.institutionList?.filter((val) => {
        return val._id == props?.userinfo?.instituionId;
      });

      // setDoctorId()

      if (findoctorvalue) {
        setDoctorId({
          value: findoctorvalue[0]?._id,
          label: findoctorvalue[0]?.firstName,
        });
      } else {
        setDoctorId(null);
      }

      if (findinstitutionvalue) {
        setInstitutionId({
          value: findinstitutionvalue[0]?._id,
          label: findinstitutionvalue[0]?.name,
        });
      } else {
        setInstitutionId(null);
      }

      if (findsubsvalue) {
        setBenefId({
          value: findsubsvalue[0]?._id,
          label: findsubsvalue[0]?.firstName,
        });
      } else {
        setBenefId(null);
      }

      // setInstitutionId(
      //   props?.userinfo?.instituionId ? props?.userinfo?.instituionId : null
      // );
      // setBenefId(
      //   props.userinfo?.subscriberId ? props.userinfo?.subscriberId : null
      // );
    }
  }, [props]);

  // console.log("props,", doctorId);
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
          <h4>{covert({ id: "updateUser" })}</h4>
          <Row>
            <Col md={12}>
              <Formik
                initialValues={{
                  username: props?.userinfo?.username,
                  email: props?.userinfo?.email ? props?.userinfo?.email : null,
                  firstName: props?.userinfo?.firstName,
                  secondName: props?.userinfo?.secondName,
                  thirdName: props?.userinfo?.thirdName,
                  lastName: props?.userinfo?.lastName,
                  phoneNumber: props?.userinfo?.phoneNumber
                    ? props?.userinfo?.phoneNumber
                    : "",
                  // birthdate: props?.userinfo?.birthdate,
                  // gender: props?.userinfo?.gender
                  //   ? props?.userinfo?.gender
                  //   : "",
                  instituionId: props?.userinfo?.instituionId
                    ? props?.userinfo?.instituionId
                    : null,

                  doctorId: props.userinfo?.doctorId
                    ? props.userinfo?.doctorId
                    : null,
                  subscriberId: props.userinfo?.subscriberId
                    ? props.userinfo?.subscriberId
                    : null,
                  auxiliaryCenterId: props.userinfo?.auxiliaryCenterId
                    ? props.userinfo?.auxiliaryCenterId
                    : null,

                  pharmacyId: props.userinfo?.pharmacyId
                    ? props.userinfo?.pharmacyId
                    : "",
                  laboratoryId: props.userinfo?.laboratoryId
                    ? props.userinfo?.laboratoryId
                    : null,

                  ImagingCenterId: props.userinfo?.ImagingCenterId
                    ? props.userinfo?.ImagingCenterId
                    : null,
                  role: props.userinfo?.role?._id
                    ? props.userinfo?.role?._id
                    : null,
                }}
                onSubmit={UpdateDetails}
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
                  <form
                    className="inpt-fld"
                    id="form-datass"
                    onSubmit={handleSubmit}
                  >
                    <div className="prt-fmr">
                      <Row>
                        <Col lg={4} md={6}>
                          <div className="form-group">
                            <label>{covert({ id: "username" })}</label>
                            <input
                              placeholder={covert({ id: "username" })}
                              name="username"
                              value={values.username}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={6}>
                          <div className="form-group">
                            <label>{covert({ id: "fname" })}</label>
                            <input
                              placeholder={covert({ id: "fname" })}
                              name="firstName"
                              value={values.firstName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={6}>
                          <div className="form-group">
                            <label>{covert({ id: "secondname" })}</label>
                            <input
                              placeholder="Secondname"
                              name="secondName"
                              value={values.secondName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={6}>
                          <div className="form-group">
                            <label>{covert({ id: "thirdname" })}</label>
                            <input
                              placeholder={covert({ id: "thirdname" })}
                              name="thirdName"
                              value={values.thirdName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={6}>
                          <div className="form-group">
                            <label>{covert({ id: "lname" })}</label>
                            <input
                              placeholder="Lastname"
                              name="lastName"
                              value={values.lastName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </Col>

                        {/* <Col lg={4} md={6}>
                          <div className="form-group">
                            <label>Birth Date</label>
                            <input
                              type="date"
                              name="birthdate"
                              value={values.birthdate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </Col> */}
                        <Col lg={4} md={6}>
                          <div className="form-group">
                            <label>{covert({ id: "doctorid" })}</label>
                            <input
                              placeholder={covert({ id: "doctorid" })}
                              name="doctorId"
                              value={values.doctorId}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {/* 
                            <Select
                              placeholder={covert({ id: "doctorid" })}
                              name="doctorId"
                              value={doctorId}
                              onChange={(value) => {
                                setDoctorId(value);
                                values.doctorId = value.value;
                              }}
                              onBlur={handleBlur}
                              isSearchable={true}
                              options={props.docListOption}
                              isLoading={false}
                              loadingMessage={() => "Fetching Data"}
                              noOptionsMessage={() => "Doctor List"}
                            /> */}
                          </div>
                        </Col>
                        <Col lg={4} md={6}>
                          {/* <div className="form-group">
                            <label>Organization</label>
                            <input
                              placeholder="Alvin Hospital"
                              // value={userinfo?.username}
                            />
                          </div> */}
                          <div className="form-group">
                            <label>{covert({ id: "InstitutionId" })}</label>
                            <input
                              placeholder={covert({ id: "InstitutionId" })}
                              name="instituionId"
                              value={values.instituionId}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />

                            {/* <Select
                              placeholder={covert({ id: "InstitutionId" })}
                              name="instituionId"
                              value={instituionId}
                              onChange={(value) => {
                                setInstitutionId(value);
                                values.instituionId = value.value;
                              }}
                              onBlur={handleBlur}
                              isSearchable={true}
                              options={props?.InstitutionListOption}
                              isLoading={false}
                              loadingMessage={() => "Fetching Data"}
                              noOptionsMessage={() => "Institution List"}
                            /> */}
                          </div>
                        </Col>

                        {/* <Col lg={4} md={6}>
                          <div className="form-group">
                            <label>Benefeciary Id</label>
                            <input
                              type="text"
                              placeholder="Benefeciary Id"
                              value={props?.userinfo?.beneficiaryId}
                            />
                          </div>
                        </Col> */}
                        <Col lg={4} md={6}>
                          <div className="form-group">
                            <label>{covert({ id: "SubscribweId" })}</label>
                            <input
                              type="text"
                              placeholder={covert({ id: "SubscribweId" })}
                              name="subscriberId"
                              value={values.subscriberId}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />

                            {/* <Select
                              placeholder={covert({ id: "SubscribweId" })}
                              name="subscriberId"
                              value={benfId}
                              onChange={(value) => {
                                setBenefId(value);
                                values.subscriberId = value.value;
                              }}
                              onBlur={handleBlur}
                              isSearchable={true}
                              options={props?.benefOption}
                              isLoading={false}
                              loadingMessage={() => "Fetching Data"}
                              noOptionsMessage={() => "Subscriber List"}
                            /> */}
                          </div>
                        </Col>
                        <Col lg={4} md={6}>
                          <div className="form-group">
                            <label>{covert({ id: "Pharmacy Id" })}</label>
                            <input
                              placeholder={covert({ id: "Pharmacy Id" })}
                              name="pharmacyId"
                              value={values.pharmacyId}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6}>
                          <div className="form-group">
                            <label>{covert({ id: "laboratory Id" })}</label>
                            <input
                              placeholder={covert({ id: "laboratory Id" })}
                              name="laboratoryId"
                              value={values.laboratoryId}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </Col>

                        {/* <Col lg={4} md={6}>
                          <div className="form-group">
                            <label>{covert({ id: "SubscribweId" })}</label>
                            <input
                              type="text"
                              placeholder={covert({ id: "SubscribweId" })}
                              name="subscriberId"
                              value={values.subscriberId}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </Col> */}

                        <Col lg={4} md={6}>
                          <div className="form-group">
                            <label>{covert({ id: "Phone Number" })}</label>
                            <input
                              placeholder={covert({ id: "Phone Number" })}
                              name="phoneNumber"
                              value={values.phoneNumber}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <img
                              className="inpt-img"
                              src={"/assets/images/accept-mob.svg"}
                              alt="img"
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6}>
                          <div className="form-group">
                            <label>{covert({ id: "Email" })}</label>
                            <input
                              placeholder={covert({ id: "Email" })}
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <img
                              className="inpt-img"
                              src={"/assets/images/accept-mob.svg"}
                              alt="img"
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6}>
                          <div className="form-group">
                            <label>{covert({ id: "auxid" })}</label>
                            <input
                              placeholder={covert({ id: "auxid" })}
                              name="auxiliaryCenterId"
                              value={values.auxiliaryCenterId}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6}>
                          <label>{covert({ id: "User Role List" })}</label>
                          <div className="form-group slct-srt">
                            {props.roleList && (
                              <select
                                onChange={handleChange}
                                value={values.role}
                                name="role"
                              >
                                <option selected value="">
                                  {covert({ id: "User Role List" })}
                                </option>
                                {props.roleList?.map((value, i) => (
                                  <option value={value?._id} key={i}>
                                    {locale == "ar"
                                      ? value?.arabicName
                                      : value?.englishName}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                        </Col>

                        {/* <Col md={4}>
                          {userrole?.length > 0 && (
                            // <div className="orgn-tags mt-4">
                            //   <ul>
                            //     {userrole &&
                            //       userrole?.map((val, i) => <li>{val}</li>)}
                            //   </ul>
                            // </div>

                            <div className="prt-fmr">
                              <div className="orgn-tags edt-tags">
                                {userrole &&
                                  userrole?.map((val, is) => (
                                    <label className="multipal-slt" key={is}>
                                      {val}{" "}
                                      <img
                                        className="img-fluid mt-4"
                                        src={"/assets/images/sl-close.svg"}
                                        alt="img"
                                        onClick={(e) => removeRole(e, val)}
                                      />
                                    </label>
                                  ))}
                              </div>
                            </div>
                          )} */}

                        {/* <div className="tag-inpt">
                            <select onChange={(e) => setRoles(e)}>
                              <option value="" selected>
                                --Select Role--
                              </option>
                              {data &&
                                data?.map((val, ind) => (
                                  <option
                                    value={val.role}
                                    disabled={userrole?.includes(val?.role)}
                                  >
                                    {val?.role}
                                  </option>
                                ))}
                            </select>
                          </div> */}
                        {/* </Col> */}
                      </Row>
                    </div>
                  </form>
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
          <button className="add-fmy-btn" type="submit" form="form-datass">
            {covert({ id: "onlyUpdate" })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default UserEditModal;
