import React, { useCallback, useEffect, useState } from "react";
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

import { useDispatch, useSelector } from "react-redux";
import { getCookies } from "cookies-next";
import {
  BenefeciaryList,
  CityList,
  CreateBenefeciary,
  CreateInstitution,
  FamilyMemberAllergies,
  FamilyMemberChronicDiseases,
  FamilyMemberClinicalVisits,
  FamilyMemberHealthIssueDetails,
  FamilyMemberMedicalTests,
  FamilyMemberSurgeryHistories,
  GenderList,
  GetInstitutionList,
  ReltationShipBeneficary,
  getHightWeightHelath,
} from "../redux/actions/action";
import Swal from "sweetalert2";
import moment from "moment";
import { Formik } from "formik";
import { AiOutlineProfile } from "react-icons/ai";
import _ from "lodash";
import AddNewInfo from "../Component/Modals/AddNewMedicalInfo";
import Link from "next/link";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import EditSubscriberData from "@/Component/Modals/EditSubscriberData";

function MyVerticallyCenteredModal(props) {
  // console.log("props", props);
  const { formatMessage: covert } = useIntl();

  const dispatch = useDispatch();
  const [addFamilyMemberForm, SetFamilyMemberForm] = useState(false);
  const [indes, setIndex] = useState();
  const [tabsa, setTabs] = useState([]);
  const [relationship, setrelationshipList] = useState([]);
  const [key, setKey] = useState("home");

  const [familyDetails, setFamilyDetails] = useState({
    firstName: "",
    secondName: "",
    lastName: "",
    birthdate: "",
    relationshipToSubscriber: "",
    gender: "",
    // familyMemberId: Math.floor(Math.random() * Date.now()).toString(36),
  });

  // districtapi
  useEffect(() => {
    dispatch(ReltationShipBeneficary(0, 500));
  }, []);

  const { beneficary_relation_list } = useSelector((state) => state.fetchdata);

  useEffect(() => {
    if (beneficary_relation_list) {
      if (beneficary_relation_list?.data?.statusCode == "200") {
        setrelationshipList(beneficary_relation_list?.data?.data?.objectArray);
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

  // console.log("benfiacry_list", beneficary_relation_list)
  const addNewRow = (event) => {
    event.preventDefault();

    // if (
    //   familyDetails?.firstName == "" ||
    //   familyDetails?.middleName === "" ||
    //   familyDetails?.lastName == "" ||
    //   familyDetails?.birthdate === "" ||
    //   familyDetails?.relationshipToBeneficiary == "" ||
    //   familyDetails?.gender === ""
    // ) {
    //   Swal.fire({
    //     icon: "error",
    //     text: "Add All Fields",
    //   });
    // }
    //  else {
    //   setTabs((pre) => [...pre, familyDetails]);
    //   setFamilyDetails({
    //     firstName: "",
    //     middleName: "",
    //     lastName: "",
    //     birthdate: "",
    //     relationshipToBeneficiary: "",
    //     gender: "",
    //     familyMemberId: random.toString(),
    //   });
    // }

    if (tabsa) {
      setTabs((pre) => [...pre, familyDetails]);
    } else {
      setTabs([familyDetails]);
    }
    setFamilyDetails({
      firstName: "",
      secondName: "",
      lastName: "",
      birthdate: "",
      relationshipToSubscriber: "",
      gender: "",
      // familyMemberId: Math.floor(Math.random() * Date.now()).toString(36),
    });
  };

  const HandleAddFamilyMember = () => {
    SetFamilyMemberForm(!addFamilyMemberForm);
    setIndex();
    setFamilyDetails({
      firstName: "",
      secondName: "",

      lastName: "",

      birthdate: "",
      relationshipToSubscriber: "",
      gender: "",
      // familyMemberId: Math.floor(Math.random() * Date.now()).toString(36),
    });
  };

  const handleChanges = (e) => {
    e.preventDefault();
    setFamilyDetails((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };

  const setFieldValue = (e, val, indes) => {
    e.preventDefault();
    // console.log("Sdsd", indes);
    setIndex(indes);
    setFamilyDetails({
      // firstName: "",
      // secondName: "",
      // thirdName: "",
      // lastName: "",
      firstName: val?.firstName,
      secondName: val?.secondName,

      lastName: val?.lastName,
      birthdate: val?.birthdate,
      relationshipToSubscriber: val?.relationshipToSubscriber,
      gender: val?.gender,
      // familyMemberId: Math.floor(Math.random() * Date.now()).toString(36),
    });
  };

  const UpdateROw = (e) => {
    e.preventDefault();
    let new_tabs = JSON.parse(JSON.stringify(tabsa));
    new_tabs[indes] = familyDetails;

    setTabs(new_tabs);
    setFamilyDetails({
      firstName: "",
      secondName: "",
      lastName: "",
      birthdate: "",
      relationshipToSubscriber: "",
      gender: "",
      // familyMemberId: Math.floor(Math.random() * Date.now()).toString(36),
    });
    setIndex();
  };

  const CancelData = (e) => {
    e.preventDefault();
    setFamilyDetails({
      firstName: "",
      secondName: "",
      lastName: "",
      birthdate: "",
      relationshipToSubscriber: "",
      gender: "",
      // familyMemberId: Math.floor(Math.random() * Date.now()).toString(36),
    });
    setIndex();
  };

  const CancelAddedData = (e) => {
    e.preventDefault();
    let new_tabs = JSON.parse(JSON.stringify(tabsa));
    new_tabs[indes] = familyDetails;

    setTabs((oldValues) => {
      return oldValues.filter((_, i) => i !== indes);
    });
    setFamilyDetails({
      firstName: "",
      secondName: "",
      lastName: "",
      birthdate: "",
      relationshipToSubscriber: "",
      gender: "",
      // familyMemberId: Math.floor(Math.random() * Date.now()).toString(36),
    });

    setIndex();

    // setTabs(new_tabs);
    // setFamilyDetails({
    //   firstName: "",
    //   middleName: "",
    //   lastName: "",
    //   birthdate: "",
    //   relationshipToSubscriber: "",
    //   gender: "",
    //   familyMemberId: random.toString(),
    // });
    // setIndex();
  };

  const handleSubmit = (values) => {
    if (key == "home") {
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
        beneficiaries: tabsa,
        institutionId: values.institutionID,
        city: values.cityId,
      };
      dispatch(CreateBenefeciary(data));

      setTimeout(() => {
        props.onHide();
        setFamilyDetails({
          firstName: "",
          secondName: "",
          lastName: "",
          birthdate: "",
          relationshipToSubscriber: "",
          gender: "",
          // familyMemberId: "",
        });
        setTabs();
        setIndex();
      }, 1200);
    } else {
    }
  };

  // const data = props?.institutiondata?.split("-");
  const { locale } = useRouter();
  // const [search, setSearchQuery] = useState("");

 
  return (
    <Modal
      className={locale == "ar" ? "add-fmly-mbm new-rtl" : "add-fmly-mbm"}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="p-0 ">
        <div className="add-new-bene">
          <h4>{covert({ id: "addnewsubs" })}</h4>
          <p>
            {" "}
            {covert({ id: "Company Name" })}:{" "}
            <span>{props?.institutiondata?.split("-")[2]}</span>{" "}
          </p>
          <div className="add-denefi-marker">
            <Tabs
              defaultActiveKey="home"
              id="uncontrolled-tab-example"
              className="add-bene-tabs"
              onSelect={(k) => setKey(k)}
            >
              <Tab eventKey="home" title={covert({ id: "New Primary" })}>
                <div className="add-form">
                  <Formik
                    initialValues={{
                      firtname: "",
                      secondName: "",
                      thirdName: "",

                      lastName: "",
                      grandfathername: "",
                      birthday: "",
                      phone: "",
                      email: "",
                      cityId: "",
                      district: "",
                      gender: "",
                      empId: "",
                      passport: "",
                      status: "",
                      identify_process: "",
                      institutionID: props?.institutiondata?.split("-")[1],
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
                          {/* <Col lg={3} md={4}>
                            <div className="form-group">
                              <label>District: </label>
                              <input
                                type="text"
                                placeholder="district"
                                name="district"
                                value={values.district}
                                onChange={handleChange}
                              />
                            </div>
                          </Col> */}

                          <Col lg={3} md={4}>
                            <div className="form-group">
                              <label>{covert({ id: "InstitutionId" })} </label>
                              <input
                                type="text"
                                placeholder={covert({ id: "InstitutionId" })}
                                name="institutionID"
                                value={values.institutionID}
                                onChange={handleChange}
                                readOnly
                              />
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
                          {/* <Col lg={3} md={4}>
                            <div className="form-group">
                              <label>Employee ID: </label>
                              <input
                                type="text"
                                placeholder="231432-314"
                                name="empId"
                                value={values.empId}
                                onChange={handleChange}
                              />
                            </div>
                          </Col> */}
                          {/* <Col lg={3} md={4}>
                            <div className="form-group">
                              <label>Passport Number: </label>
                              <input
                                type="text"
                                placeholder="NFG90342"
                                name="passport"
                                value={values.passport}
                                onChange={handleChange}
                              />
                            </div>
                          </Col> */}
                          {/* <Col lg={3} md={4}>
                            <div className="form-group">
                              <label>Status </label>
                              <select
                                name="status"
                                value={values.status}
                                onChange={handleChange}
                              >
                                <option value="" selected>
                                  --Select Status--
                                </option>
                                <option value="disabled">Disabled</option>
                                <option value="active">Active</option>
                              </select>
                            </div>
                          </Col> */}
                          {/* <Col lg={3} md={4}>
                            <div className="form-group">
                              <label
                                name="identify_process"
                                value={values.identify_process}
                                onChange={handleChange}
                              >
                                Idnetification Process:{" "}
                              </label>
                              <select>
                                <option value="" selected>
                                  --Select Idnetification--
                                </option>
                                <option value="biometric">Biometric </option>
                                <option value="eye-scan">Eye Scan </option>
                              </select>
                            </div>
                          </Col> */}
                        </Row>
                      </form>
                    )}
                  </Formik>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
        <div className="add-fmy-mambr">
          <h3>{covert({ id: "Family Members" })}:</h3>
          <div className="add-fmlt-btn">
            {tabsa &&
              tabsa?.map((val, ss) => (
                <button
                  className="tabs-data"
                  onClick={(e) => setFieldValue(e, val, ss)}
                  key={ss}
                >
                  {val?.firstName}
                </button>
              ))}
            <button onClick={HandleAddFamilyMember}>
              {covert({ id: "Add Family Members" })}
            </button>
          </div>

          {addFamilyMemberForm ? (
            <div className="add-form p-4">
              <form>
                <Row>
                  <Col lg={4} md={4}>
                    <div className="form-group">
                      <label>{covert({ id: "fname" })}: </label>
                      <input
                        placeholder={covert({ id: "fname" })}
                        type="text"
                        value={familyDetails?.firstName}
                        name="firstName"
                        id="firstName"
                        onChange={handleChanges}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={4}>
                    <div className="form-group">
                      <label>{covert({ id: "secondName" })}: </label>
                      <input
                        type="text"
                        value={familyDetails?.secondName}
                        name="secondName"
                        id="secondName"
                        onChange={handleChanges}
                        placeholder={covert({ id: "secondName" })}
                        // onChange={(e)=>setFamilyDetails([...familyDetails, {...user[user.length], mobile_number: e.target.value }])}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={4}>
                    <div className="form-group">
                      <label>{covert({ id: "lname" })}: </label>
                      <input
                        placeholder={covert({ id: "lname" })}
                        type="text"
                        value={familyDetails?.lastName}
                        name="lastName"
                        id="lastName"
                        onChange={handleChanges}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={4}>
                    <div className="form-group">
                      <label>{covert({ id: "onlydob" })}: </label>
                      <input
                        type="date"
                        value={familyDetails?.birthdate}
                        name="birthdate"
                        id="birthdate"
                        onChange={handleChanges}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={4}>
                    <div className="form-group">
                      <label>{covert({ id: "RelationShip" })}: </label>
                      <select
                        value={familyDetails.relationshipToSubscriber}
                        name="relationshipToSubscriber"
                        id="relationshipToSubscriber"
                        onChange={handleChanges}
                      >
                        <option value="" disabled selected>
                          --Select--{" "}
                        </option>
                        {relationship &&
                          relationship?.map((val, i) => (
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
                        value={familyDetails.gender}
                        name="gender"
                        id="gender"
                        onChange={handleChanges}
                      >
                        <option value="" selected disabled>
                          --Select--
                        </option>
                        {props.genderList &&
                          props.genderList?.map((v, ia) => (
                            <option key={ia} value={v?._id}>
                              {locale == "ar" ? v?.arabicName : v?.englishName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </Col>
                </Row>
                <Row className="mt-3 text-center">
                  <Col>
                    {indes !== undefined ? (
                      <>
                        <button className="add-fmy-btn" onClick={UpdateROw}>
                          {covert({ id: "Update" })}
                        </button>
                        <button
                          className="add-fmy-btn-cancel"
                          onClick={CancelAddedData}
                        >
                          {covert({ id: "Cancel" })}
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="add-fmy-btn" onClick={addNewRow}>
                          {covert({ id: "Accept" })}
                        </button>
                        <button
                          className="add-fmy-btn-cancel"
                          onClick={CancelData}
                        >
                          {covert({ id: "Cancel" })}
                        </button>
                      </>
                    )}
                  </Col>
                </Row>
              </form>
            </div>
          ) : (
            ""
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="can-sve">
          <button onClick={props.onHide} className="cls-btn-btn">
            {covert({ id: "Cancel" })}
          </button>
          <button
            className="add-fmy-btn"
            type="submit"
            form={key == "home" ? "new-form" : "exists-form"}
          >
            {covert({ id: "Save" })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

function MyVerticallyInstitution(props) {
  const dispatch = useDispatch();
  const { formatMessage: covert } = useIntl();

  const [file, setFile] = useState([]);
  const [files, setFiles] = useState([]);

  function uploadSingleFile(e) {
    let ImagesArray = Object.entries(e.target.files).map((e) =>
      URL.createObjectURL(e[1])
    );
    setFile([...file, ...ImagesArray]);
    if (e.target.files.length == "1") {
      setFiles((pre) => [...pre, e.target.files[0]]);
    } else {
      setFiles((pre) => [...pre, ...e.target.files]);
    }
  }
  function deleteFile(e) {
    const s = file.filter((item, index) => index !== e);
    const sa = files.filter((item, index) => index !== e);
    setFile(s);
    setFiles(sa);
  }

  const handleSubmit = (values) => {
    // const data = {
    //   name: values?.institutionName,
    //   cityId: values?.city,
    //   phoneNumber: values.phoneNumber,
    //   email: values.email,
    //   employeeCount: values.employeeCount,
    //   file:files
    // };

    const formdata = new FormData();
    formdata.append("name", values?.institutionName);
    formdata.append("cityId", values?.city);
    formdata.append("phoneNumber", values.phone);
    formdata.append("email", values.email);
    formdata.append("employeeCount", values.employeeCount);
    formdata.append("file", files);
    dispatch(CreateInstitution(formdata));
    setFile();
    setFiles();
    setTimeout(() => {
      props.onHide();
    }, 1200);
  };
  const { locale } = useRouter();
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="p-0">
        <div className="add-new-bene institution">
          <h4>{covert({ id: "Add New Institution" })}</h4>

          <div className="add-denefi-marker">
            <div className="add-form p-0">
              <Formik
                initialValues={{
                  institutionName: "",
                  city: "",
                  phone: "",
                  employeeCount: "",
                  email: "",

                  // address: "",
                  // website: "",
                  // facebook: "",
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
                  <form id="form-data" onSubmit={handleSubmit}>
                    <Row>
                      <Col lg={6} md={6}>
                        <div className="form-group">
                          <label>{covert({ id: "Name" })} </label>
                          <input
                            type="text"
                            placeholder={covert({ id: "Name" })}
                            name="institutionName"
                            value={values.institutionName}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>

                      {/* <Col lg={6} md={6}>
                        <div className="form-group">
                          <label>Street Address </label>
                          <input
                            type="text"
                            placeholder="Street Address"
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                          />
                        </div>
                      </Col> */}
                      <Col lg={4} md={4}>
                        <div className="form-group">
                          <label>{covert({ id: "City" })} :</label>
                          <select
                            name="city"
                            value={values.city}
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
                      <Col lg={6} md={6}>
                        <div className="form-group">
                          <label>{covert({ id: "Phone Number" })}</label>
                          <input
                            type="text"
                            placeholder="091-556-3377"
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col lg={6} md={6}>
                        <div className="form-group">
                          <label>{covert({ id: "Email" })} </label>
                          <input
                            type="text"
                            placeholder="sdaf@work.coom"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>

                      <Col lg={12} md={8}>
                        <div className="form-group">
                          <label>{covert({ id: "Employee Count" })}</label>
                          <input
                            type="text"
                            placeholder="15"
                            name="employeeCount"
                            value={values.employeeCount}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>

                      {/* <Col lg={6} md={4}>
                        <div className="form-group">
                          <label>Website:</label>
                          <input
                            type="text"
                            placeholder="www.work.com"
                            name="website"
                            value={values.website}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col lg={6} md={4}>
                        <div className="form-group">
                          <label>Facebook</label>
                          <input
                            type="text"
                            placeholder="facebook link"
                            name="facebook"
                            value={values.facebook}
                          />
                        </div>
                      </Col> */}

                      <Col md={3}></Col>
                      <Col md={6}>
                        <div className="upld-img-section">
                          <div className="form-group">
                            <img
                              src={"/assets/images/upload-img-1.svg"}
                              alt="img"
                            />
                            <input
                              type="file"
                              disabled={file?.length == 5}
                              className="form-control"
                              onChange={uploadSingleFile}
                              multiple
                            />
                          </div>
                        </div>
                        <div className="form-group preview">
                          {file?.length > 0 &&
                            file?.map((item, index) => {
                              return (
                                <div className="up-img-slct" key={item}>
                                  <img src={item} alt="" />
                                  <button
                                    className="dtl-img-btn"
                                    type="button"
                                    onClick={() => deleteFile(index)}
                                  >
                                    <img
                                      src={"/assets/images/dltee-img.svg"}
                                      alt="img"
                                    />
                                  </button>
                                </div>
                              );
                            })}
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
        <div className="can-sve mt-0">
          <button onClick={props.onHide} className="cls-btn-btn">
            {covert({ id: "Cancel" })}
          </button>
          <button className="add-fmy-btn" type="submit" form="form-data">
            {covert({ id: "Save" })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

function MedicalFileModal(props) {
  const { formatMessage: covert } = useIntl();
  const { locale } = useRouter();
  const dispatch = useDispatch();
  const [medicalkey, setmedicalKey] = useState("Allergies");
  const [fullscreen, setFullscreen] = useState(true);
  const [addMedicalForm, setAddMedicalDataForm] = useState(false);
  const [list, setList] = useState([]);
  const { health_issue_family_member, get_height_weight } = useSelector(
    (state) => state.fetchdata
  );
  const { add_health_issue_family_res } = useSelector(
    (state) => state.submitdata
  );
  // console.log("familymemberHealtDetail", props?.data);
  useEffect(() => {
    if (props.show) {
      dispatch({ type: "HEALTH_ISSUE_FAMILY_MEMBER", payload: "" });
      setList();
      if (medicalkey == "Allergies") {
        dispatch(FamilyMemberAllergies(props.bene_id, props?.data?._id));
      }

      if (medicalkey == "ChronicDisease") {
        dispatch(FamilyMemberChronicDiseases(props.bene_id, props?.data?._id));
      }

      if (medicalkey == "ChronicMedicine") {
        dispatch(FamilyMemberMedicalTests(props.bene_id, props?.data?._id));
      }

      if (medicalkey == "Surgery") {
        dispatch(FamilyMemberSurgeryHistories(props.bene_id, props?.data?._id));
      }

      if (medicalkey == "Clinic") {
        dispatch(FamilyMemberClinicalVisits(props.bene_id, props?.data?._id));
      }

      if (medicalkey == "MedicalTests") {
        dispatch(FamilyMemberMedicalTests(props.bene_id, props?.data?._id));
      }
    }
  }, [props.show, medicalkey]);

  useEffect(() => {
    if (health_issue_family_member) {
      if (health_issue_family_member?.data?.statusCode == "200") {
        setList(health_issue_family_member?.data?.data?.objectArray);
      } else if (
        health_issue_family_member?.startsWith("beneficiaries validation faile")
      ) {
        Swal.fire({
          icon: "error",
          text: health_issue_family_member?.substr(0, 26),
        });
      }
    }
    return () => {
      dispatch({ type: "HEALTH_ISSUE_FAMILY_MEMBER", payload: "" });
    };
  }, [health_issue_family_member]);

  const handleSubmit = (values) => {
    const data = {
      name: values?.institutionName,
      cityHQ: values?.city,
      phoneNumber: values.phoneNumber,
    };
    dispatch(CreateInstitution(data));
    setTimeout(() => {
      props.onHide();
    }, 1200);
  };
  const data = props?.data?.medicalFiles;
  let name =
    props?.data?.firstName +
    " " +
    props?.data?.secondName +
    " " +
    props?.data?.lastName;

  let gender = props?.data?.gender;

  useEffect(() => {
    if (add_health_issue_family_res) {
      if (add_health_issue_family_res?.data?.statusCode == "200") {
        setAddMedicalDataForm(false);
        // dispatch(BenefeciaryList(limit, skip));
      }

      // else {
      //   Swal.fire({
      //     icon: "error",
      //     text: "Something Went Wrong",
      //   });
      // }
    }
    return () => {
      dispatch({ type: "ADD_HEALTH_ISSUE_FAMILY_MEMBER", payload: "" });
    };
  }, [add_health_issue_family_res]);

  const [familymemberHeighdetails, setFamilyMemeberHeightdata] = useState([]);
  useEffect(() => {
    if (get_height_weight) {
      if (get_height_weight?.data?.statusCode == "200") {
        setFamilyMemeberHeightdata(get_height_weight?.data?.data);
      } else if (
        get_height_weight?.startsWith("beneficiaries validation faile")
      ) {
        Swal.fire({
          icon: "error",
          text: get_height_weight?.substr(0, 26),
        });
      }
    }
    return () => {
      dispatch({ type: "GET_HEIGHT_WEIGHT", payload: "" });
    };
  }, [get_height_weight]);
  // console.log("list", list);
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        fullscreen={fullscreen}
        className={
          locale == "ar" ? "beneficiaries-full new-rtl" : "beneficiaries-full"
        }
      >
        <Modal.Body className="full-modl-screen">
          <Row className=" h-100">
            <Col lg={2}></Col>
            {/* {addMedicalForm ? <Col lg={1}></Col> : <Col lg={2}></Col>} */}
            {/* <Col lg={addMedicalForm ? 5 : 8} md={12} className="add-mdicl-file"> */}
            <Col lg={8} md={12} className="add-mdicl-file">
              <Modal.Header closeButton className="mb-4">
                <Modal.Title>{covert({ id: "Medical file" })}</Modal.Title>
              </Modal.Header>
              <div className="add-denefi-marker">
                <div className="add-form p-0">
                  <Formik
                    initialValues={{
                      id: familymemberHeighdetails?._id,
                      fName: name,
                      gender: gender,
                      height: familymemberHeighdetails?.height,
                      weight: familymemberHeighdetails?.weight,
                    }}
                    onSubmit={handleSubmit}
                    // validationSchema={DoctorForm}
                    enableReinitialize
                  >
                    {({
                      values,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                    }) => (
                      <form id="form-data" onSubmit={handleSubmit}>
                        <Row>
                          <Col md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "onlyid" })}</label>
                              <input
                                type="text"
                                name="id"
                                value={values.id}
                                readOnly
                              />
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="form-group">
                              <label> {covert({ id: "fname" })}</label>
                              <input
                                type="text"
                                name="fName"
                                value={values.fName}
                                readOnly
                              />
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="form-group">
                              <label> {covert({ id: "gender" })}</label>
                              <select
                                name="gender"
                                value={values.gender}
                                disabled
                              >
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
                          <Col md={4}>
                            <div className="form-group">
                              <label> {covert({ id: "Height" })}</label>
                              <input
                                type="text"
                                name="height"
                                value={values.height}
                                readOnly
                              />
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="form-group">
                              <label> {covert({ id: "weight" })}</label>
                              <input
                                type="number"
                                name="weight"
                                value={values.weight}
                                readOnly
                              />
                            </div>
                          </Col>
                        </Row>
                        <div className="can-sve mt-0 mb-3">
                          <button
                            className="add-fmy-btn"
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setAddMedicalDataForm(!addMedicalForm);
                            }}
                          >
                            {!addMedicalForm
                              ? covert({ id: "add" })
                              : covert({ id: "Cancel" })}
                            {/* Add */}
                          </button>
                        </div>

                        {/* Form Add  Start*/}

                        <div className="add-denefi-marker">
                          <Tabs
                            defaultActiveKey="Allergies"
                            id="uncontrolled-tab-example"
                            className="add-bene-tabs"
                            onSelect={(m) => {
                              setList();
                              setTimeout(() => {
                                setmedicalKey(m);
                              }, 1000);
                            }}
                          >
                            <Tab
                              eventKey="Allergies"
                              title={covert({ id: "Allergies" })}
                            >
                              {list?.map((val, is) => (
                                <div className="view-dtl-data" key={is}>
                                  <div>
                                    <h1>
                                      {val?.allergyName}
                                      {val?.fileLink !== "" &&
                                      val?.fileLink &&
                                      val?.thumbnailLink &&
                                      val?.thumbnailLink !== null ? (
                                        <div className="thumnbnail">
                                          <Link
                                            href={val?.fileLink}
                                            target="_blank"
                                          >
                                            <img src={val?.thumbnailLink} />
                                          </Link>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </h1>
                                  </div>
                                  <div>
                                    <span className="notes-heatj">Notes :</span>
                                    <p>{val?.notes}</p>
                                  </div>
                                </div>
                              ))}
                            </Tab>
                            <Tab
                              eventKey="ChronicDisease"
                              title={covert({ id: "Chronic Disease" })}
                            >
                              {list?.map((val, is) => (
                                <div className="view-dtl-data" key={is}>
                                  <div>
                                    <h1>
                                      {val?.DiseaseName}
                                      {val?.fileLink !== null &&
                                      val?.fileLink &&
                                      val?.thumbnailLink &&
                                      val?.thumbnailLink !== null ? (
                                        <div className="thumnbnail">
                                          <Link
                                            href={val?.fileLink}
                                            target="_blank"
                                          >
                                            <img src={val?.thumbnailLink} />
                                          </Link>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </h1>
                                  </div>
                                  <div>
                                    <ul className="crd-dtl">
                                      <li>
                                        <span>Diagnosed On :</span>{" "}
                                        {moment(val?.diagnosisDate).format(
                                          "LL"
                                        )}
                                      </li>
                                      <li>
                                        <span>Diagnosed By :</span>{" "}
                                        {val?.diagnosedBy}
                                      </li>
                                    </ul>
                                    <span className="notes-heatj">Notes :</span>
                                    <p>{val?.notes}</p>
                                  </div>
                                </div>
                              ))}
                            </Tab>
                            <Tab
                              eventKey="ChronicMedicine"
                              title={covert({ id: "Chronic Medicine" })}
                            >
                              <div className="add-form">
                                <Formik
                                  initialValues={{
                                    firtname: "",
                                    middleName: "",
                                    lastName: "",
                                    grandfathername: "",
                                    birthday: "",
                                    phone: "",
                                    email: "",
                                    cityId: "",
                                    district: "",
                                    gender: "",
                                    empId: "",
                                    passport: "",
                                    status: "",
                                    identify_process: "",
                                    institutionID:
                                      props?.institutiondata?.split("-")[1],
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
                                        <Col md={12}>
                                          <div className="form-group">
                                            <label>Title</label>
                                            <input type="text" />
                                          </div>
                                        </Col>
                                        <Col md={12}>
                                          <div className="form-group">
                                            <label>Note</label>
                                            <textarea></textarea>
                                          </div>
                                        </Col>
                                      </Row>
                                    </form>
                                  )}
                                </Formik>
                              </div>
                            </Tab>
                            <Tab
                              eventKey="Surgery"
                              title={covert({ id: "Surgery History" })}
                            >
                              {list?.map((val, is) => (
                                <div className="view-dtl-data" key={is}>
                                  <div>
                                    <h1>
                                      {val?.SurgeryName}
                                      {val?.fileLink !== null &&
                                      val?.fileLink &&
                                      val?.thumbnailLink &&
                                      val?.thumbnailLink !== null ? (
                                        <div className="thumnbnail">
                                          <Link
                                            href={val?.fileLink}
                                            target="_blank"
                                          >
                                            <img src={val?.thumbnailLink} />
                                          </Link>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </h1>
                                  </div>
                                  <div>
                                    <ul className="crd-dtl">
                                      <li>
                                        <span>Date:</span>{" "}
                                        {moment(val?.SurgeryDate).format("LL")}
                                      </li>
                                      <li>
                                        <span>HealthCenter:</span>{" "}
                                        {val?.medicalCenterName}
                                      </li>
                                      <li>
                                        <span>Doctor:</span> {val?.doctorName}
                                      </li>
                                    </ul>

                                    <span className="notes-heatj">Notes :</span>
                                    <p>{val?.notes}</p>
                                  </div>
                                </div>
                              ))}
                            </Tab>
                            <Tab
                              eventKey="Clinic"
                              title={covert({ id: "Clinic Visit" })}
                            >
                              {list?.map((val, is) => (
                                <div className="view-dtl-data" key={is}>
                                  <div>
                                    <h1>
                                      {val?.visitType}

                                      {val?.fileLink !== null &&
                                      val?.fileLink &&
                                      val?.thumbnailLink &&
                                      val?.thumbnailLink !== null ? (
                                        <div className="thumnbnail">
                                          <Link
                                            href={val?.fileLink}
                                            target="_blank"
                                          >
                                            <img src={val?.thumbnailLink} />
                                          </Link>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </h1>
                                  </div>
                                  <div>
                                    <ul className="crd-dtl">
                                      <li>
                                        <span>Date:</span>{" "}
                                        {moment(val?.visitDate).format("LL")}
                                      </li>
                                      <li>
                                        <span>HealthCenter:</span>{" "}
                                        {val?.centerName}
                                      </li>
                                      <li>
                                        <span>Doctor:</span> {val?.doctorName}
                                      </li>
                                    </ul>

                                    <span className="notes-heatj">Notes :</span>
                                    <p>{val?.notes}</p>
                                  </div>
                                </div>
                              ))}
                            </Tab>
                            <Tab
                              eventKey="MedicalTests"
                              title={covert({ id: "Medical Tests" })}
                            >
                              {list?.map((val, is) => (
                                <div className="view-dtl-data" key={is}>
                                  <div>
                                    <h1>
                                      {val?.labReportCategory}
                                      {val?.fileLink !== null &&
                                      val?.fileLink &&
                                      val?.thumbnailLink &&
                                      val?.thumbnailLink !== null ? (
                                        <div className="thumnbnail">
                                          <Link
                                            href={val?.fileLink}
                                            target="_blank"
                                          >
                                            <img src={val?.thumbnailLink} />
                                          </Link>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </h1>{" "}
                                    <div className="medical-test">
                                      <p>{val?.centerName}</p>
                                      <span>
                                        {val?.city} , {val?.district}
                                      </span>
                                    </div>
                                  </div>

                                  <div>
                                    <ul className="crd-dtl">
                                      <li>
                                        <span>ReportDate:</span>{" "}
                                        {moment(val?.reportDate).format("LL")}
                                      </li>
                                    </ul>
                                  </div>

                                  {val?.testInformation?.map((value, s) =>
                                    value?.result?.reference &&
                                    value?.result?.reference !== "" ? (
                                      <div className="tst-pro clr-bg-sect">
                                        <Row>
                                          <Col md={6}>
                                            <div className="nme-man">
                                              <label>{value?.testName}</label>
                                              <p>
                                                ({value?.acronym})
                                                <span>
                                                  {value?.result?.level}
                                                </span>
                                              </p>
                                            </div>
                                          </Col>
                                          <Col md={6} className="ali-cntr">
                                            <div className="">
                                              <h6>
                                                <span>Value: </span>
                                                {value?.result?.value}
                                              </h6>
                                              <h6>
                                                <span>Reference:</span>
                                                {value?.result?.reference}
                                              </h6>
                                            </div>
                                          </Col>
                                        </Row>
                                      </div>
                                    ) : (
                                      <div className="tst-pro" key={s}>
                                        <Row>
                                          <Col md={6}>
                                            <div className="nme-man">
                                              <label>{value?.testName}</label>
                                              <p>
                                                ({value?.acronym})
                                                <span>
                                                  {value?.result?.level}
                                                </span>
                                              </p>
                                            </div>
                                          </Col>
                                          <Col md={6}>
                                            <p>
                                              {value?.result?.upperRange}{" "}
                                              <span>
                                                {" "}
                                                {value?.result?.unit}
                                              </span>
                                            </p>
                                            <div className="prog">
                                              <div
                                                className="pro-line"
                                                style={{ width: "50%" }}
                                              ></div>
                                            </div>
                                            <p>
                                              {value?.result?.lowerRange}{" "}
                                              <span>
                                                {" "}
                                                {value?.result?.value}
                                              </span>
                                            </p>
                                          </Col>
                                        </Row>
                                      </div>
                                    )
                                  )}
                                </div>
                              ))}
                            </Tab>
                          </Tabs>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </Col>
            {/* {!addMedicalForm ? "" : <Col lg={1}></Col>} */}
          </Row>
        </Modal.Body>
      </Modal>

      <AddNewInfo
        show={addMedicalForm}
        onHide={() => setAddMedicalDataForm(false)}
        data={props?.data}
        beni_id={props?.bene_id}
        setMedicalModal={props.setMedicalModal}
        familydata={props.data}
        setAddMedicalDataForm={setAddMedicalDataForm}
        cityList={props.cityList}
      />
    </>
  );
}

const Benificiary = () => {
  const { formatMessage: covert } = useIntl();
  const [modalShow, setModalShow] = useState(false);
  const [institutionList, setInstitutionList] = useState([]);

  const [modalShow1, setModalShow1] = useState(false);
  const [benef_lists, setBeneList] = useState([]);
  const [genderList, setGenderList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [detatilsbtn, setDetailsButton] = useState(false);
  const [top, setTop] = useState();
  const [stopapi, setStopAPi] = useState(false);
  const [loader, setLoader] = useState(false);
  const [benefitbtn, setbenifitpolicyButton] = useState(false);
  const [showalergies, setAlergiesShow] = useState(false);
  const [limit] = useState(10);
  const [skip, setSKip] = useState(0);
  const [secondRow, setSecondRow] = useState([]);
  const [alergies, setAlergies] = useState([]);
  const [thirdRow, setThirdRow] = useState([]);

  const [institutiondata, setInstitution] = useState();
  const [medicaldmodal, setMedicalModal] = useState(false);
  const [editsubscriber, setEditModalofSubScriber] = useState(false);
  const [beneficarydataEdit, setBeneficaryData] = useState([]);
  const [familymember, setFamilyMember] = useState();
  const [beniId, setBeneID] = useState();

  const dispatch = useDispatch();
  const { gender_list, get_height_weight, city_list } = useSelector(
    (state) => state.fetchdata
  );
  const setShowRow = (e, row) => {
    // e.preventDefault();

    if (secondRow === row?._id) {
      setSecondRow();
      setBeneID();
    } else {
      setSecondRow(row?._id);
      setBeneID(row?._id);
    }
  };

  const setShowThirdRow = (e, row) => {
    e.preventDefault();

    if (thirdRow === row?._id) {
      setThirdRow();
    } else {
      setThirdRow(row?._id);
    }
  };

  const ShowAllergies = (e, row) => {
    e.preventDefault();

    // if (secondRow === row?._id) {
    //   setThirdRow();
    // } else {
    //   setThirdRow(row?._id);
    // }
    if (row?.medicalFiles?.allergies === alergies) {
      setAlergiesShow(false);
      setAlergies();
    } else {
      setAlergiesShow(true);
      setAlergies(row?.medicalFiles?.allergies);
    }

    // console.log("show all",)
  };

  useEffect(() => {
    dispatch(GenderList(0, 500));
    dispatch(CityList(0, 500));
  }, []);




  const APICall = (value) => {
    if (stopapi == false) {
      dispatch(BenefeciaryList(limit, skip,value));
      
    } else {
      setLoader(false);
    }
  };

  
  useEffect(() => {
    setLoader(true);
    APICall();
  }, [skip]);

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
      setBeneList([]);
    }),
    []
  );





  useEffect(() => {
    dispatch(GetInstitutionList());
  }, []);

  const { benef_list, institution_list, health_issue_family_member } =
    useSelector((state) => state.fetchdata);
  const {
    add_benef_res,
    add_instition_res,
    health_issue_family_res,
    update_benef_Res,
    add_health_issue_family_res,
  } = useSelector((state) => state.submitdata);

  const [count, setObjectCount] = useState();

  useEffect(() => {
    if (benef_list) {
      if (benef_list?.data?.statusCode == "200") {
        setLoader(false);
        if (skip == 0) {
          setBeneList(benef_list?.data?.data?.objectArray);
          setObjectCount(benef_list?.data?.data?.objectCount);
        } else {
          setLoader(false);

          let common = _?.differenceBy(
            benef_list?.data?.data?.objectArray,
            benef_lists,
            "_id"
          );
          setBeneList((pre) => [...pre, ...common]);
          // setBeneList((pre) => [...pre, ...benef_list?.data?.data?.objectArray]);
          setObjectCount(benef_list?.data?.data?.objectCount);
        }

        // if (benef_list?.data?.data?.objectCount == benef_lists?.length) {
        //   setStopAPi(true);
        //   setLoader(false);
        // }
        // if (benef_list?.data?.data?.objectCount > benef_lists?.length) {
        //   setStopAPi(false);
        //   setLoader(false);
        // }
      } else {
        Swal.fire({
          icon: "error",
          text: "Something Went Wrong",
        });
      }
    }
    return () => {
      dispatch({ type: "GET_BENE_LIST", payload: "" });
    };
  }, [benef_list]);

  useEffect(() => {
    if (institution_list) {
      if (institution_list?.data?.statusCode == "200") {
        setInstitutionList(institution_list?.data?.data?.objectArray);

        // if (skip == 0) {
        //
        // } else {
        //   setLoader(false);
        //   setInstitutionList((pre) => [...pre, ...institution_list?.data?.object]);
        // }
        // if (institution_list?.data?.hasMore == false) {
        //   setStopAPi(true);
        //   setLoader(false);
        // }
      } else {
        Swal.fire({
          icon: "error",
          text: "Something Went Wrong",
        });
      }
    }
    return () => {
      dispatch({ type: "GET_INSTITUTION_LIST", payload: "" });
    };
  }, [institution_list]);

  useEffect(() => {
    if (add_benef_res) {
      if (add_benef_res?.data?.statusCode == "200") {
        Swal.fire({
          icon: "success",
          text: add_benef_res?.data?.message,
        });
        // setSKip(0);
        setStopAPi(false);
        // setBeneList([]);
        let skpips = skip;
        dispatch(BenefeciaryList(limit, skip));
      } else if (add_benef_res?.startsWith("beneficiaries validation")) {
        Swal.fire({
          icon: "error",
          text: add_benef_res?.substr(0, 31),
        });
      }
      // else {
      //   Swal.fire({
      //     icon: "error",
      //     text: add_benef_res?.data?.message,
      //   });
      // }
    }
    return () => {
      dispatch({ type: "ADD_BENEFICIARY_DATA", payload: "" });
    };
  }, [add_benef_res]);

  useEffect(() => {
    if (add_instition_res) {
      if (add_instition_res?.data?.statusCode == "200") {
        Swal.fire({
          icon: "success",
          text: add_instition_res?.data?.message,
        });
        dispatch(GetInstitutionList());
      } else if (
        add_instition_res?.startsWith("beneficiaries validation faile")
      ) {
        Swal.fire({
          icon: "error",
          text: add_instition_res?.substr(0, 26),
        });
      }

      // else {
      //   Swal.fire({
      //     icon: "error",
      //     text: "Something Went Wrong",
      //   });
      // }
    }
    return () => {
      dispatch({ type: "ADD_INSTITUTION_ITEM", payload: "" });
    };
  }, [add_instition_res]);

  useEffect(() => {
    if (add_health_issue_family_res) {
      if (add_health_issue_family_res?.data?.statusCode == "200") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: add_health_issue_family_res?.data?.message,
          timer: 2000,
        });
        // setAddMedicalDataForm(false);
        // dispatch(BenefeciaryList(limit, skip));
        setMedicalModal(false);
        // props.onHide();
      } else if (
        add_health_issue_family_res?.startsWith(
          "beneficiaries validation faile"
        )
      ) {
        Swal.fire({
          icon: "error",
          text: add_health_issue_family_res?.substr(0, 26),
        });
      }
    }
    return () => {
      dispatch({ type: "ADD_HEALTH_ISSUE_FAMILY_MEMBER", payload: "" });
    };
  }, [add_health_issue_family_res]);

  useEffect(() => {
    if (update_benef_Res) {
      if (update_benef_Res?.data?.statusCode == "200") {
        Swal.fire({
          icon: "success",
          text: update_benef_Res?.data?.message,
        });

        dispatch(BenefeciaryList(limit, skip));
      } else if (update_benef_Res?.startsWith("beneficiaries validation")) {
        Swal.fire({
          icon: "error",
          text: update_benef_Res?.substr(0, 31),
        });
      }
      // else {
      //   Swal.fire({
      //     icon: "error",
      //     text: update_benef_Res?.data?.message,
      //   });
      // }
    }
    return () => {
      dispatch({ type: "UPDATE_BENEFICIARY_DATA", payload: "" });
    };
  }, [update_benef_Res]);

  // function handleScroll(e) {
  //   e.preventDefault();
  //   setTop(document.documentElement.scrollTop);

  //   if (top !== document.documentElement.scrollTop) {
  //     if (
  //       window.innerHeight + document.documentElement.scrollTop + 1 >=
  //       document.documentElement.scrollHeight
  //     ) {
  //       // setLoader(true);
  //       setSKip((pre) => pre + 5);
  //     }
  //   }
  // }
  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const LoadMore = () => {
    if (stopapi === false) {
      setLoader(true);
      // setSKip((pre) => pre + 5);
      setSKip((pre) => pre + 10);
    } else {
      setLoader(false);
    }
  };

  const [familymemberHealtDetail, setFamilyMemeberHealthData] = useState([]);
  useEffect(() => {
   
    if (count <= skip + limit) {
      setStopAPi(true);
      // setLoadMoreAlwways(false)
    }
  }, [count, benef_lists]);

  useEffect(() => {
    if (medicaldmodal && familymember) {
      // dispatch(
      //   FamilyMemberHealthIssueDetails(beniId, familymember?.familyMemberId)
      // );
      // console.log("beni", beniId, familymember?._id);
      dispatch(getHightWeightHelath(beniId, familymember?._id));
    }
  }, [medicaldmodal]);

  // useEffect(() => {
  //   if (health_issue_family_member) {
  //     if (health_issue_family_member?.data?.statusCode == "200") {
  //       setFamilyMemeberHealthData(health_issue_family_member?.data?.data);
  //     } else if (
  //       health_issue_family_member?.startsWith("beneficiaries validation faile")
  //     ) {
  //       Swal.fire({
  //         icon: "error",
  //         text: health_issue_family_member?.substr(0, 26),
  //       });
  //     }
  //   }
  //   return () => {
  //     dispatch({ type: "HEALTH_ISSUE_FAMILY_MEMBER", payload: "" });
  //   };
  // }, [health_issue_family_member]);

  // Add Modal Res

  useEffect(() => {
    if (gender_list) {
      if (gender_list?.data?.statusCode == "200") {
        setGenderList(gender_list?.data?.data?.objectArray);
      } else {
        Swal.fire({
          icon: "error",
          text: "Something Went Wrong",
        });
      }
    }
  }, [gender_list]);
  useEffect(() => {
    if (city_list) {
      if (city_list?.data?.statusCode == "200") {
        setCityList(city_list?.data?.data?.objectArray);
      } else {
        Swal.fire({
          icon: "error",
          text: "Something Went Wrong",
        });
      }
    }
  }, [city_list]);

  return (
    <div className="main-content">
      <div className="tnstitution">
        <Row className="align-items-center">
          <Col lg={6} md={12}>
            <div className="cmy-drp">
              <form>
                <div className="form-group">
                  <label>{covert({ id: "Institution" })}</label>
                  <select onChange={(e) => setInstitution(e.target.value)}>
                    <option value={""} selected>
                      Select Company
                    </option>
                    {institutionList &&
                      institutionList?.map((val, ins) => (
                        <option
                          value={
                            val?.city?.englishName +
                            "-" +
                            // val?.institutionId +
                            val?._id +
                            "-" +
                            val?.name +
                            "-" +
                            val?.phoneNumber
                          }
                          key={ins}
                        >
                          {val?.name}
                        </option>
                      ))}
                  </select>
                </div>
              </form>
            </div>
          </Col>
          <Col lg={6} md={12} className="text-end">
            <div className="benfits-btn">
              <button onClick={() => setModalShow1(true)}>
                {/* + Add New Institution */}
                {covert({ id: "addnewinstitution" })}
              </button>
              <MyVerticallyInstitution
                show={modalShow1}
                onHide={() => setModalShow1(false)}
                institutiondata={institutiondata}
                cityList={cityList}
              />
              <button
                onClick={() => {
                  if (institutiondata) {
                    setModalShow(true);
                  } else {
                    Swal.fire({
                      text: "Please Select Institution",
                      icon: "error",
                      timer: 2000,
                    });
                  }
                  // setModalShow(true);
                }}
              >
                {covert({ id: "addnewsubs" })}
                {/* + Add New Subscriber */}
              </button>
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                institutiondata={institutiondata}
                genderList={genderList}
                cityList={cityList}
              />
              <button>{covert({ id: "importSubs" })}</button>
            </div>
          </Col>
        </Row>
      </div>
      <div className="policy-beneficiary">
        <h5>{covert({ id: "policySubs" })}</h5>
        <div className="plcy-bene">
          <Row>
            <Col lg={4} md={12} className="p-0 bdr-rght">
              <div style={{ display: detatilsbtn ? "none" : "block" }}>
                <div className="title-hdr">
                  <h2>
                    <span></span>
                    {covert({ id: "onlyDetails" })}
                    <span>
                      <img
                        src={"/assets/images/file-icon.svg"}
                        alt="img"
                        onClick={() => setDetailsButton(!detatilsbtn)}
                      />
                    </span>
                  </h2>
                </div>
                <div className="drl-lst">
                  <ul>
                    <li>
                      {covert({ id: "InstitutionName" })}
                      <span> {institutiondata?.split("-")[2]}</span>
                    </li>
                    <li>
                      {covert({ id: "Phone Number:" })}{" "}
                      <span>091-954-3355</span>
                    </li>
                    <li>
                      {covert({ id: "Address" })}: <span>Shatar road</span>
                    </li>
                    <li>
                      {covert({ id: "City" })} :{" "}
                      <span> {institutiondata?.split("-")[0]}</span>
                    </li>
                    <li>
                      {covert({ id: "Employee Count" })}: <span>24231</span>
                    </li>
                    <li>
                      {covert({ id: "BenifCount" })}: <span>70231</span>
                    </li>
                    <li>
                      {covert({ id: "InsuBudget" })}:
                      <span>1,000,000 Dinars</span>
                    </li>
                    <li>
                      {covert({ id: "REsetDate" })}: <span>October 3</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div style={{ display: detatilsbtn ? "block" : "none" }}>
                <div className="title-hdr">
                  <h2>
                    <span>
                      <img
                        src={"/assets/images/cross-mark.svg"}
                        alt="img"
                        onClick={() => setDetailsButton(!detatilsbtn)}
                      />
                    </span>
                    {covert({ id: "onlyDetails" })}
                    <span>
                      <img
                        src={"/assets/images/check-mark.svg"}
                        alt="img"
                        onClick={() => setDetailsButton(!detatilsbtn)}
                      />
                    </span>
                  </h2>
                </div>
                <div className="drl-lst">
                  <ul>
                    <li>
                      {covert({ id: "InstitutionName" })}
                      <span>
                        <input type="text" placeholder="Al-Naseem company" />
                      </span>
                    </li>
                    <li>
                      {covert({ id: "Phone Number:" })}
                      <span>
                        <input type="number" placeholder="091-954" />
                      </span>
                    </li>
                    <li>
                      Address:{" "}
                      <span>
                        <input type="text" placeholder="Shatar road" />
                      </span>
                    </li>
                    <li>
                      City:{" "}
                      <span>
                        <input type="text" placeholder="Tripoli" />
                      </span>
                    </li>
                    <li>
                      Employee count:{" "}
                      <span>
                        <input type="text" placeholder="24231" />
                      </span>
                    </li>
                    <li>
                      Beneficiary count:{" "}
                      <span>
                        <input type="text" placeholder="70231" />
                      </span>
                    </li>
                    <li>
                      Insurance budget:{" "}
                      <span>
                        <input type="text" placeholder="1,000,000 Dinars" />
                      </span>
                    </li>
                    <li>
                      Reset date:
                      <span>
                        <input type="date" value={"2022-01-01"} />
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div style={{ display: benefitbtn ? "none" : "block" }}>
                <div className="title-hdr">
                  <h2>
                    <span></span>
                    {covert({ id: "Benifit Policy" })}
                    <span>
                      <img
                        src={"/assets/images/file-icon.svg"}
                        alt="img"
                        onClick={() => setbenifitpolicyButton(!benefitbtn)}
                      />
                    </span>
                  </h2>
                </div>
                <div className="tbs-bot">
                  <Tabs
                    defaultActiveKey="home"
                    transition={false}
                    id="noanim-tab-example"
                    className=" paitnt-tabs"
                  >
                    <Tab eventKey="home" title={covert({ id: "In-Patient" })}>
                      <div className="lmt-dan">
                        <h2>
                          Aggregate Limit <span>1000LYD per member</span>
                        </h2>
                      </div>
                      <div className="srce-lmt text-center">
                        <Row>
                          <Col>
                            <h4>{covert({ id: "onlyServie" })}</h4>
                          </Col>
                          <Col>
                            <h4>{covert({ id: "Limit" })}</h4>
                          </Col>
                          <hr />
                          <Col>
                            <p>Room and Board</p>
                            <p>Chronic Conditions</p>
                            <p>Pre existing cases</p>
                            <p>Emergency room services</p>
                            <p>Transportation</p>
                            <p>Room and Board</p>
                            <p>Room and Board</p>
                            <p>Room and Board</p>
                            <p>Room and Board</p>
                            <p>Room and Board</p>
                            <p>Room and Board</p>
                          </Col>
                          <Col>
                            <p>1000.00 LYD</p>
                            <p>1000.00 LYD</p>
                            <p>1000.00 LYD</p>
                            <p>1000.00 LYD</p>
                            <p>1000.00 LYD</p>
                            <p>1000.00 LYD</p>
                            <p>1000.00 LYD</p>
                            <p>1000.00 LYD</p>
                            <p>1000.00 LYD</p>
                            <p>1000.00 LYD</p>
                            <p>1000.00 LYD</p>
                          </Col>
                        </Row>
                      </div>
                    </Tab>
                    <Tab
                      eventKey="profile"
                      title={covert({ id: "Out-Patient" })}
                    >
                      <div className="lmt-dan">
                        <h2>
                          Aggregate Limit <span>1000LYD per member</span>
                        </h2>
                      </div>
                      <div className="srce-lmt text-center">
                        <Row>
                          <Col>
                            <h4>{covert({ id: "onlyServie" })}</h4>
                          </Col>
                          <Col>
                            <h4></h4>
                          </Col>
                          <hr />
                          <Col>
                            <p>Room and Board</p>
                            <p>Chronic Conditions</p>
                            <p>Pre existing cases</p>
                            <p>Emergency room services</p>
                            <p>Transportation</p>
                            <p>Room and Board</p>
                            <p>Room and Board</p>
                            <p>Room and Board</p>
                            <p>Room and Board</p>
                            <p>Room and Board</p>
                            <p>Room and Board</p>
                          </Col>
                          <Col>
                            <p>1000.00 LYD</p>
                            <p>1000.00 LYD</p>
                            <p>1000.00 LYD</p>
                            <p>1000.00 LYD</p>
                            <p>1000.00 LYD</p>
                            <p>1000.00 LYD</p>
                            <p>1000.00 LYD</p>
                            <p>1000.00 LYD</p>
                            <p>1000.00 LYD</p>
                            <p>1000.00 LYD</p>
                            <p>1000.00 LYD</p>
                          </Col>
                        </Row>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
              <div style={{ display: benefitbtn ? "block" : "none" }}>
                <div className="title-hdr">
                  <h2>
                    <span>
                      <img
                        src={"/assets/images/cross-mark.svg"}
                        alt="img"
                        onClick={() => setbenifitpolicyButton(!benefitbtn)}
                      />
                    </span>
                    Benefit Policys{" "}
                    <span>
                      <img
                        src={"/assets/images/check-mark.svg"}
                        alt="img"
                        onClick={() => setbenifitpolicyButton(!benefitbtn)}
                      />
                    </span>
                  </h2>
                </div>

                <div className="tbs-bot">
                  <Tabs
                    defaultActiveKey="home"
                    transition={false}
                    id="noanim-tab-example"
                    className=" paitnt-tabs"
                  >
                    <Tab eventKey="home" title="In-Patient">
                      <div className="lmt-dan">
                        <h2>
                          Aggregate Limit <span>1000LYD per member</span>
                        </h2>
                      </div>
                      <div className="edt-flds srce-lmt text-center">
                        <Row>
                          <Col>
                            <h4>{covert({ id: "onlyServie" })}</h4>
                          </Col>
                          <Col>
                            <h4>{covert({ id: "Limit" })}</h4>
                          </Col>
                          <hr />
                          <Col>
                            <p>Room and Board</p>
                            <p>Chronic Conditions</p>
                            <p>Pre existing cases</p>
                            <p>Emergency room services</p>
                            <p>Transportation</p>
                            <p>Room and Board</p>
                            <p>Room and Board</p>
                            <p>Room and Board</p>
                            <p>Room and Board</p>
                            <p>Room and Board</p>
                            <p>Room and Board</p>
                          </Col>
                          <Col>
                            <p>
                              <input type="text" placeholder="1000.00 LYD" />
                            </p>
                            <p>
                              <input type="text" placeholder="1000.00 LYD" />
                            </p>
                            <p>
                              <input type="text" placeholder="1000.00 LYD" />
                            </p>
                            <p>
                              <input type="text" placeholder="1000.00 LYD" />
                            </p>
                            <p>
                              <input type="text" placeholder="1000.00 LYD" />
                            </p>
                            <p>
                              <input type="text" placeholder="1000.00 LYD" />
                            </p>
                            <p>
                              <input type="text" placeholder="1000.00 LYD" />
                            </p>
                            <p>
                              <input type="text" placeholder="1000.00 LYD" />
                            </p>
                            <p>
                              <input type="text" placeholder="1000.00 LYD" />
                            </p>
                            <p>
                              <input type="text" placeholder="1000.00 LYD" />
                            </p>
                            <p>
                              <input type="text" placeholder="1000.00 LYD" />
                            </p>
                          </Col>
                        </Row>
                      </div>
                    </Tab>
                    <Tab eventKey="profile" title="Out-Patient">
                      <div className="lmt-dan">
                        <h2>
                          Aggregate Limit <span>1000LYD per member</span>
                        </h2>
                      </div>
                      <div className="srce-lmt text-center">
                        <Row>
                          <Col>
                            <h4>{covert({ id: "onlyServie" })}</h4>
                          </Col>
                          <Col>
                            <h4>{covert({ id: "Limit" })}</h4>
                          </Col>
                          <hr />
                          <Col>
                            <p>Room and Board</p>
                            <p>Chronic Conditions</p>
                            <p>Pre existing cases</p>
                            <p>Emergency room services</p>
                            <p>Transportation</p>
                            <p>Room and Board</p>
                            <p>Room and Board</p>
                            <p>Room and Board</p>
                            <p>Room and Board</p>
                            <p>Room and Board</p>
                            <p>Room and Board</p>
                          </Col>
                          <Col>
                            <p>
                              <input type="text" placeholder="1000.00 LYD" />
                            </p>
                            <p>
                              <input type="text" placeholder="1000.00 LYD" />
                            </p>
                            <p>
                              <input type="text" placeholder="1000.00 LYD" />
                            </p>
                            <p>
                              <input type="text" placeholder="1000.00 LYD" />
                            </p>
                            <p>
                              <input type="text" placeholder="1000.00 LYD" />
                            </p>
                            <p>
                              <input type="text" placeholder="1000.00 LYD" />
                            </p>
                            <p>
                              <input type="text" placeholder="1000.00 LYD" />
                            </p>
                            <p>
                              <input type="text" placeholder="1000.00 LYD" />
                            </p>
                            <p>
                              <input type="text" placeholder="1000.00 LYD" />
                            </p>
                            <p>
                              <input type="text" placeholder="1000.00 LYD" />
                            </p>
                            <p>
                              <input type="text" placeholder="1000.00 LYD" />
                            </p>
                          </Col>
                        </Row>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </Col>
            <Col lg={8} md={12} className="pdn-rght">
              <div className="table-hdr">
                <div className="serch-section">
                  <input
                    type="text"
                    placeholder={covert({ id: "Search By Name" })}
                    onChange={(e) => {
                      optimizedFn(e.target.value);
                    
                    }}
                  />
                  <img src={"/assets/images/search-normal.svg"} alt="img" />
                </div>
                <div className="heading-tble">
                  <h3>{covert({ id: "onlySubscribers" })}</h3>
                </div>
                <div className="imprt-btn">
                  <button>{covert({ id: "onlyImport" })}</button>
                </div>
              </div>
              <div className="benefic-tble">
                <Table className="table-responsive">
                  <thead>
                    <tr>
                      <th>{covert({ id: "onlyid" })}</th>
                      <th>
                        {covert({ id: "Full Name" })}
                        {/* Full Name */}
                      </th>
                      <th>{covert({ id: "birthday(age)" })}</th>
                      <th>{covert({ id: "Status" })}</th>
                      <th>{covert({ id: "Family Count" })}</th>
                      <th>{covert({ id: "Employee Id" })}</th>
                      <th>{covert({ id: "Phone Number" })}</th>
                      <th>{covert({ id: "residence" })} </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {benef_lists &&
                      benef_lists?.map((val, ins) => (
                        <>
                          <tr key={ins}>
                            <td>{val._id}</td>
                            <td>
                              {val?.firstName} {val?.middleName} {val?.lastName}
                            </td>
                            <td>
                              {moment(val.birthdate)
                                .subtract(10, "days")
                                .calendar()}
                              {/* <span>(Age)</span> */}
                            </td>
                            <td className="active-status">
                              <Form.Check
                                type="switch"
                                id="custom-switch"
                                checked={true}
                              />
                            </td>
                            <td>{val?.beneficiaries?.length}</td>
                            <td>Employee ID</td>
                            <td>{val?.phoneNumber}</td>
                            <td>{val?.residentCity} </td>
                            <td>
                              <button
                                onClick={(e) => {
                                  // e.stopPropagation();
                                  setShowRow(e, val);
                                }}
                              >
                                Details
                              </button>{" "}
                              <button
                                onClick={(e) => {
                                  // console.log("heeloo", val);
                                  setEditModalofSubScriber(true);
                                  setBeneficaryData(val);
                                }}
                              >
                                Edit
                              </button>{" "}
                            </td>
                          </tr>
                          {secondRow?.includes(val?._id) ? (
                            <>
                              {val?.beneficiaries &&
                                val?.beneficiaries?.map((v, i) => (
                                  <>
                                    <tr className="clr-tr">
                                      <td>{v?._id}</td>
                                      <td>
                                        {v.firstName} {v.middleName}{" "}
                                        {v.lastName}
                                      </td>
                                      <td>
                                        {moment(v.birthdate)
                                          .subtract(10, "days")
                                          .calendar()}
                                        {/* <span>(Age)</span> */}

                                        <span>(Age)</span>
                                      </td>
                                      <td className="active-status">
                                        <Form.Check
                                          type="switch"
                                          id="custom-switch"
                                        />
                                      </td>
                                      <td>{v?.relationshipToSubscriber}</td>
                                      <td style={{ cursor: "pointer" }}>
                                        <button
                                          className="mdcl-dlt-shbrtn"
                                          onClick={(e) => {
                                            setShowThirdRow(e, v);
                                            setFamilyMember(v);
                                            setMedicalModal(true);
                                          }}
                                        >
                                          <AiOutlineProfile
                                            style={{ fontSize: "15px" }}
                                          />
                                        </button>
                                      </td>
                                    </tr>

                                    <MedicalFileModal
                                      show={medicaldmodal}
                                      onHide={() => setMedicalModal(false)}
                                      data={familymember}
                                      familymemberHealtDetail={
                                        familymemberHealtDetail
                                      }
                                      bene_id={beniId}
                                      setMedicalModal={setMedicalModal}
                                      genderList={genderList}
                                      cityList={cityList}
                                    />

                                    {/* {
                                      thirdRow?.includes(v?._id) ?
                                        <>
                                          {
                                            v?.medicalFiles &&
                                            < tr >
                                              <td colspan="6" className="bodr-slctn-active">
                                                <Table className="table-responsive sub-mdi-dta">
                                                  <thead>
                                                    <tr>
                                                      <th>Id</th>
                                                      <th>Blood Group</th>
                                                      <th>Height</th>
                                                      <th>Weight</th>
                                                      <th></th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    <tr>
                                                      <td>{v?.medicalFiles?.medicalFileId}</td>
                                                      <td>{v?.medicalFiles?.bloodType}</td>
                                                      <td>{v?.medicalFiles?.height}</td>
                                                      <td>{v?.medicalFiles?.weight}</td>
                                                      <td ><button className="mdcl-dlt-shbrtn" onClick={(e) => ShowAllergies(e, v)}>Allergies</button></td>
                                                    </tr>

                                                    {showalergies &&
                                                      <tr>
                                                        <td colspan="6" className="bodr-slctn-active">
                                                          <Table className="table-responsive sub-mdi-dta">
                                                            <thead>
                                                              <tr>
                                                                <th>Allergy Name</th>
                                                                <th>Notes</th>
                                                              </tr>
                                                            </thead>
                                                            <tbody>
                                                              {showalergies && alergies?.map((vas, isa) => (
                                                                <tr>
                                                                  <td>{vas?.allergyName}</td>
                                                                  <td><OverlayTrigger
                                                                    placement="top"
                                                                    overlay={
                                                                      <Tooltip id={`tooltip-${isa}`}>
                                                                        {vas?.notes}
                                                                      </Tooltip>
                                                                    }
                                                                  >
                                                                    <p>
                                                                      {vas?.notes?.substr(0, 10)}

                                                                      {vas?.notes?.substring(
                                                                        10
                                                                      ) ? (
                                                                        <>....</>
                                                                      ) : (
                                                                        ""
                                                                      )}
                                                                    </p>
                                                                  </OverlayTrigger>

                                                                  </td>
                                                                </tr>
                                                              ))}
                                                            </tbody>
                                                          </Table>

                                                        </td>
                                                      </tr>
                                                    }

                                                  </tbody>
                                                </Table>
                                              </td>
                                            </tr>

                                          }

                                        </> : ""
                                    } */}
                                  </>
                                ))}
                            </>
                          ) : (
                            ""
                          )}
                        </>
                      ))}
                  </tbody>
                </Table>
                {loader ? (
                  <Col lg={12}>
                    <center>
                      <div className="loader-img text-center  m-5">
                        <img
                          src={"/assets/images/ball-triangle.svg"}
                          alt="img"
                        />
                      </div>
                    </center>
                  </Col>
                ) : (
                  ""
                )}
                {!stopapi && loader == false && (
                  <center>
                    <button
                      className="load-more-btn mx-5 mb-3 "
                      onClick={LoadMore}
                    >
                      {" "}
                      {covert({ id: "loadmore" })}
                    </button>
                  </center>
                )}
              </div>
              <EditSubscriberData
                show={editsubscriber}
                onHide={() => setEditModalofSubScriber(false)}
                genderList={genderList}
                cityList={cityList}
                beneficarydataEdit={beneficarydataEdit}
                institutionList={institutionList}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Benificiary;

// export const getServerSideProps = async (context) => {
//   let data  = context.req.cookies['Zept_Auth_token_User']
//   console.log("cont", data);

//   return {
//     props: {
//       data: [],
//     },
//   };
// };
