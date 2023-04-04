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

import { useDispatch, useSelector } from "react-redux";
import { getCookies } from "cookies-next";
import {
  BenefeciaryList,
  CreateBenefeciary,
  CreateInstitution,
  FamilyMemberHealthIssueDetails,
  GetInstitutionList,
  ReltationShipBeneficary,
} from "../redux/actions/action";
import Swal from "sweetalert2";
import moment from "moment";
import { Formik } from "formik";
import { AiOutlineProfile } from "react-icons/ai";
import _ from "lodash";
import AddNewInfo from "../Component/Modals/AddNewMedicalInfo";
import Link from "next/link";

function MyVerticallyCenteredModal(props) {
  // console.log("props", props);
  const dispatch = useDispatch();
  const [addFamilyMemberForm, SetFamilyMemberForm] = useState(false);
  const [indes, setIndex] = useState();
  const [tabsa, setTabs] = useState([]);
  const [relationship, setrelationshipList] = useState([]);
  const [key, setKey] = useState("home");

  const [familyDetails, setFamilyDetails] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    birthdate: "",
    relationshipToBeneficiary: "",
    gender: "",
    familyMemberId: Math.floor(Math.random() * Date.now()).toString(36),
  });

  // districtapi
  useEffect(() => {
    dispatch(ReltationShipBeneficary());
  }, []);

  const { beneficary_relation_list } = useSelector((state) => state.fetchdata);

  useEffect(() => {
    if (beneficary_relation_list) {
      if (
        beneficary_relation_list?.data?.statusCode == "200" ||
        beneficary_relation_list?.data?.object ||
        beneficary_relation_list?.data?.objectCount
      ) {
        setrelationshipList(beneficary_relation_list?.data?.data);
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
      middleName: "",
      lastName: "",
      birthdate: "",
      relationshipToBeneficiary: "",
      gender: "",
      familyMemberId: Math.floor(Math.random() * Date.now()).toString(36),
    });
  };

  const HandleAddFamilyMember = () => {
    SetFamilyMemberForm(!addFamilyMemberForm);
    setIndex();
    setFamilyDetails({
      firstName: "",
      middleName: "",
      lastName: "",
      birthdate: "",
      relationshipToBeneficiary: "",
      gender: "",
      familyMemberId: Math.floor(Math.random() * Date.now()).toString(36),
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
      firstName: val?.firstName,
      middleName: val?.middleName,
      lastName: val?.lastName,
      birthdate: val?.birthdate,
      relationshipToBeneficiary: val?.relationshipToBeneficiary,
      gender: val?.gender,
      familyMemberId: Math.floor(Math.random() * Date.now()).toString(36),
    });
  };

  const UpdateROw = (e) => {
    e.preventDefault();
    let new_tabs = JSON.parse(JSON.stringify(tabsa));
    new_tabs[indes] = familyDetails;

    setTabs(new_tabs);
    setFamilyDetails({
      firstName: "",
      middleName: "",
      lastName: "",
      birthdate: "",
      relationshipToBeneficiary: "",
      gender: "",
      familyMemberId: Math.floor(Math.random() * Date.now()).toString(36),
    });
    setIndex();
  };

  const CancelData = (e) => {
    e.preventDefault();
    setFamilyDetails({
      firstName: "",
      middleName: "",
      lastName: "",
      birthdate: "",
      relationshipToBeneficiary: "",
      gender: "",
      familyMemberId: Math.floor(Math.random() * Date.now()).toString(36),
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
      middleName: "",
      lastName: "",
      birthdate: "",
      relationshipToBeneficiary: "",
      gender: "",
      familyMemberId: Math.floor(Math.random() * Date.now()).toString(36),
    });

    setIndex();
    console.log("data", tabsa);
    // setTabs(new_tabs);
    // setFamilyDetails({
    //   firstName: "",
    //   middleName: "",
    //   lastName: "",
    //   birthdate: "",
    //   relationshipToBeneficiary: "",
    //   gender: "",
    //   familyMemberId: random.toString(),
    // });
    // setIndex();
  };

  const handleSubmit = (values) => {
    if (key == "home") {
      const data = {
        firstName: values.firtname,
        middleName: values.middleName,
        lastName: values.lastName,
        birthdate: values.birthday,
        phoneNumber: values.phone,
        gender: values.gender,
        familyMembers: tabsa,
        institutionId: values.institutionID,
        cityResidence: values.residence,
        districtResidence: values.district,
      };
      dispatch(CreateBenefeciary(data));

      setTimeout(() => {
        props.onHide();
        setFamilyDetails({
          firstName: "",
          middleName: "",
          lastName: "",
          birthdate: "",
          relationshipToBeneficiary: "",
          gender: "",
          familyMemberId: "",
        });
        setTabs();
        setIndex();
      }, 1200);
    } else {
    }
  };

  // const data = props?.institutiondata?.split("-");

  return (
    <Modal
      className="add-fmly-mbm"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="p-0 ">
        <div className="add-new-bene">
          <h4>Add New Beneficiary</h4>
          <p>
            {" "}
            Company Name: <span>
              {props?.institutiondata?.split("-")[2]}
            </span>{" "}
          </p>
          <div className="add-denefi-marker">
            <Tabs
              defaultActiveKey="home"
              id="uncontrolled-tab-example"
              className="add-bene-tabs"
              onSelect={(k) => setKey(k)}
            >
              <Tab eventKey="home" title="New Primary Beneficiary">
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
                      residence: "",
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
                              <label>First name: </label>
                              <input
                                type="text"
                                placeholder="First name"
                                name="firtname"
                                value={values.firtname}
                                onChange={handleChange}
                              />
                            </div>
                          </Col>
                          <Col lg={3} md={4}>
                            <div className="form-group">
                              <label>Middle name: </label>
                              <input
                                type="text"
                                pla
                                ceholder="Middle name"
                                name="middleName"
                                value={values.middleName}
                                onChange={handleChange}
                              />
                            </div>
                          </Col>
                          <Col lg={3} md={4}>
                            <div className="form-group">
                              <label>Grandfather name </label>
                              <input
                                type="text"
                                placeholder="Grandfather name"
                                name="grandfathername"
                                value={values.grandfathername}
                                onChange={handleChange}
                              />
                            </div>
                          </Col>
                          <Col lg={3} md={4}>
                            <div className="form-group">
                              <label>Last name: </label>
                              <input
                                type="text"
                                placeholder="Last name:"
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                              />
                            </div>
                          </Col>
                          <Col lg={3} md={4}>
                            <div className="form-group">
                              <label>Birthdate: </label>
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
                              <label>Phone Number: </label>
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
                              <label>Residence City: </label>
                              <input
                                type="text"
                                placeholder="Residence"
                                name="residence"
                                value={values.residence}
                                onChange={handleChange}
                              />
                            </div>
                          </Col>
                          <Col lg={3} md={4}>
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
                          </Col>

                          <Col lg={3} md={4}>
                            <div className="form-group">
                              <label>Institution ID </label>
                              <input
                                type="text"
                                placeholder="InstitutionId"
                                name="institutionID"
                                value={values.institutionID}
                                onChange={handleChange}
                                readOnly
                              />
                            </div>
                          </Col>
                          <Col lg={3} md={4}>
                            <div className="form-group">
                              <label>Gender: </label>
                              <select
                                name="gender"
                                value={values.gender}
                                onChange={handleChange}
                              >
                                <option value={""} disabled selected>
                                  -- Select Gender --
                                </option>
                                <option value={"male"}>male</option>
                                <option value={"female"}>female</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={3} md={4}>
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
                          </Col>
                          <Col lg={3} md={4}>
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
                          </Col>
                          <Col lg={3} md={4}>
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
                          </Col>
                          <Col lg={3} md={4}>
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
                          </Col>
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
          <h3>Family Members:</h3>
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
            <button onClick={HandleAddFamilyMember}>Add family member</button>
          </div>

          {addFamilyMemberForm ? (
            <div className="add-form p-4">
              <form>
                <Row>
                  <Col lg={4} md={4}>
                    <div className="form-group">
                      <label>First name: </label>
                      <input
                        placeholder="First name:"
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
                      <label>Middle name: </label>
                      <input
                        type="text"
                        value={familyDetails?.middleName}
                        name="middleName"
                        id="middleName"
                        onChange={handleChanges}
                        placeholder="Middle name:"
                        // onChange={(e)=>setFamilyDetails([...familyDetails, {...user[user.length], mobile_number: e.target.value }])}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={4}>
                    <div className="form-group">
                      <label>Last name: </label>
                      <input
                        placeholder="Last name:"
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
                      <label>Birth Date: </label>
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
                      <label>RelationShip: </label>
                      <select
                        value={familyDetails.relationshipToBeneficiary}
                        name="relationshipToBeneficiary"
                        id="relationshipToBeneficiary"
                        onChange={handleChanges}
                      >
                        <option value="" disabled selected>
                          --Select--{" "}
                        </option>
                        {relationship &&
                          relationship?.map((val, i) => (
                            <option value={val}>{val} </option>
                          ))}
                        {/* <option value="brother">Brother </option> */}
                      </select>
                    </div>
                  </Col>
                  <Col lg={4} md={4}>
                    <div className="form-group">
                      <label>Gender: </label>
                      <select
                        value={familyDetails.gender}
                        name="gender"
                        id="gender"
                        onChange={handleChanges}
                      >
                        <option value="" selected disabled>
                          --Select--
                        </option>
                        <option value="male">Male </option>
                        <option value="female">Female </option>
                      </select>
                    </div>
                  </Col>
                </Row>
                <Row className="mt-3 text-center">
                  <Col>
                    {indes !== undefined ? (
                      <>
                        <button className="add-fmy-btn" onClick={UpdateROw}>
                          Update
                        </button>
                        <button
                          className="add-fmy-btn-cancel"
                          onClick={CancelAddedData}
                        >
                          Discard
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="add-fmy-btn" onClick={addNewRow}>
                          Accept
                        </button>
                        <button
                          className="add-fmy-btn-cancel"
                          onClick={CancelData}
                        >
                          Discard
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
            Cancel
          </button>
          <button
            className="add-fmy-btn"
            type="submit"
            form={key == "home" ? "new-form" : "exists-form"}
          >
            Add
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

function MyVerticallyInstitution(props) {
  const dispatch = useDispatch();

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
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="p-0">
        <div className="add-new-bene institution">
          <h4>Add New Institution</h4>

          <div className="add-denefi-marker">
            <div className="add-form p-0">
              <Formik
                initialValues={{
                  institutionName: "",
                  address: "",
                  city: "",
                  phone: "",
                  email: "",
                  website: "",
                  facebook: "",
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
                          <label>Instituation Name: </label>
                          <input
                            type="text"
                            placeholder="Institution name"
                            name="institutionName"
                            value={values.institutionName}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col lg={6} md={6}>
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
                      </Col>
                      <Col lg={4} md={4}>
                        <div className="form-group">
                          <label>City: </label>
                          <input
                            type="text"
                            placeholder="Tripoli"
                            name="city"
                            value={values.city}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4}>
                        <div className="form-group">
                          <label>Phone Number: </label>
                          <input
                            type="text"
                            placeholder="091-556-3377"
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col lg={4} md={4}>
                        <div className="form-group">
                          <label>Email: </label>
                          <input
                            type="text"
                            placeholder="sdaf@work.coom"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col lg={6} md={4}>
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
            Cancel
          </button>
          <button className="add-fmy-btn" type="submit" form="form-data">
            Add
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

function MedicalFileModal(props) {
  const dispatch = useDispatch();
  const [medicalkey, setmedicalKey] = useState("home");
  const [fullscreen, setFullscreen] = useState(true);
  const [addMedicalForm, setAddMedicalDataForm] = useState(false);

  // console.log("familymemberHealtDetail", props?.familymemberHealtDetail);
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
    props?.data?.middleName +
    " " +
    props?.data?.lastName;

  let gender = props?.data?.gender;

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        fullscreen={fullscreen}
        className="beneficiaries-full"
      >
        <Modal.Body className="full-modl-screen">
          <Row className=" h-100">
            <Col lg={2}></Col>
            {/* {addMedicalForm ? <Col lg={1}></Col> : <Col lg={2}></Col>} */}
            {/* <Col lg={addMedicalForm ? 5 : 8} md={12} className="add-mdicl-file"> */}
            <Col lg={8} md={12} className="add-mdicl-file">
              <Modal.Header closeButton className="mb-4">
                <Modal.Title>Medical file</Modal.Title>
              </Modal.Header>
              <div className="add-denefi-marker">
                <div className="add-form p-0">
                  <Formik
                    initialValues={{
                      id: data?.medicalFileId,
                      fName: name,
                      gender: gender,
                      height: data?.height,
                      weight: data?.weight,
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
                              <label>ID</label>
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
                              <label>Full Name</label>
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
                              <label>Gender</label>
                              <select
                                name="gender"
                                value={values.gender}
                                readOnly
                              >
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                              </select>
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="form-group">
                              <label>Height</label>
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
                              <label>Weight</label>
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
                            {!addMedicalForm ? "Add" : "Close"}
                            {/* Add */}
                          </button>
                        </div>

                        {/* Form Add  Start*/}

                        <div className="add-denefi-marker">
                          <Tabs
                            defaultActiveKey="Allergies"
                            id="uncontrolled-tab-example"
                            className="add-bene-tabs"
                            onSelect={(m) => setmedicalKey(m)}
                          >
                            <Tab eventKey="Allergies" title="Allergies">
                              {props.familymemberHealtDetail?.allergies?.map(
                                (val, is) => (
                                  <div className="view-dtl-data" key={is}>
                                    <div>
                                      <h1>
                                        {val?.allergyName}
                                        {val?.file !== null &&
                                        val?.file &&
                                        val?.thumbnail &&
                                        val?.thumbnail !== null ? (
                                          <div className="thumnbnail">
                                            <Link
                                              href={val?.file}
                                              target="_blank"
                                            >
                                              <img src={val?.thumbnail} />
                                            </Link>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </h1>
                                    </div>
                                    <div>
                                      <span className="notes-heatj">
                                        Notes :
                                      </span>
                                      <p>{val?.notes}</p>
                                    </div>
                                  </div>
                                )
                              )}
                            </Tab>
                            <Tab
                              eventKey="ChronicDisease"
                              title="Chronic Disease"
                            >
                              {props.familymemberHealtDetail?.chronicDiseases?.map(
                                (val, is) => (
                                  <div className="view-dtl-data" key={is}>
                                    <div>
                                      <h1>
                                        {val?.DiseaseName}
                                        {val?.file !== null &&
                                        val?.file &&
                                        val?.thumbnail &&
                                        val?.thumbnail !== null ? (
                                          <div className="thumnbnail">
                                            <Link
                                              href={val?.file}
                                              target="_blank"
                                            >
                                              <img src={val?.thumbnail} />
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
                                      <span className="notes-heatj">
                                        Notes :
                                      </span>
                                      <p>{val?.notes}</p>
                                    </div>
                                  </div>
                                )
                              )}
                            </Tab>
                            <Tab
                              eventKey="ChronicMedicine"
                              title="Chronic Medicine"
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
                                    residence: "",
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
                            <Tab eventKey="Surgery" title="Surgery History">
                              {props.familymemberHealtDetail?.surgeryHistory?.map(
                                (val, is) => (
                                  <div className="view-dtl-data" key={is}>
                                    <div>
                                      <h1>
                                        {val?.SurgeryName}
                                        {val?.file !== null &&
                                        val?.file &&
                                        val?.thumbnail &&
                                        val?.thumbnail !== null ? (
                                          <div className="thumnbnail">
                                            <Link
                                              href={val?.file}
                                              target="_blank"
                                            >
                                              <img src={val?.thumbnail} />
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
                                          {moment(val?.SurgeryDate).format(
                                            "LL"
                                          )}
                                        </li>
                                        <li>
                                          <span>HealthCenter:</span>{" "}
                                          {val?.medicalCenterName}
                                        </li>
                                        <li>
                                          <span>Doctor:</span> {val?.doctorName}
                                        </li>
                                      </ul>

                                      <span className="notes-heatj">
                                        Notes :
                                      </span>
                                      <p>{val?.notes}</p>
                                    </div>
                                  </div>
                                )
                              )}
                            </Tab>
                            <Tab eventKey="Clinic" title="Clinic Visit">
                              {props.familymemberHealtDetail?.clinicalVisits?.map(
                                (val, is) => (
                                  <div className="view-dtl-data" key={is}>
                                    <div>
                                      <h1>
                                        {val?.visitType}

                                        {val?.file !== null &&
                                        val?.file &&
                                        val?.thumbnail &&
                                        val?.thumbnail !== null ? (
                                          <div className="thumnbnail">
                                            <Link
                                              href={val?.file}
                                              target="_blank"
                                            >
                                              <img src={val?.thumbnail} />
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

                                      <span className="notes-heatj">
                                        Notes :
                                      </span>
                                      <p>{val?.notes}</p>
                                    </div>
                                  </div>
                                )
                              )}
                            </Tab>
                            <Tab eventKey="MedicalTests" title="Medical Tests">
                              {props.familymemberHealtDetail?.medicalTests?.map(
                                (val, is) => (
                                  <div className="view-dtl-data" key={is}>
                                    <div>
                                      <h1>
                                        {val?.labReportCategory}
                                        {val?.file !== null &&
                                        val?.file &&
                                        val?.thumbnail &&
                                        val?.thumbnail !== null ? (
                                          <div className="thumnbnail">
                                            <Link
                                              href={val?.file}
                                              target="_blank"
                                            >
                                              <img src={val?.thumbnail} />
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
                                )
                              )}
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
        setAddMedicalDataForm={setAddMedicalDataForm}
      />
    </>
  );
}

const Benificiary = () => {
  const [modalShow, setModalShow] = useState(false);

  const [modalShow1, setModalShow1] = useState(false);
  const [benef_lists, setBeneList] = useState([]);
  const [detatilsbtn, setDetailsButton] = useState(false);
  const [top, setTop] = useState();
  const [stopapi, setStopAPi] = useState(false);
  const [loader, setLoader] = useState(false);
  const [benefitbtn, setbenifitpolicyButton] = useState(false);
  const [showalergies, setAlergiesShow] = useState(false);
  const [limit] = useState(5);
  const [skip, setSKip] = useState(0);
  const [secondRow, setSecondRow] = useState([]);
  const [alergies, setAlergies] = useState([]);
  const [thirdRow, setThirdRow] = useState([]);
  const [institutionList, setInstitutionList] = useState([]);
  const [institutiondata, setInstitution] = useState();
  const [medicaldmodal, setMedicalModal] = useState(false);
  const [familymember, setFamilyMember] = useState();
  const [beniId, setBeneID] = useState();

  const dispatch = useDispatch();
  const setShowRow = (e, row) => {
    e.preventDefault();

    if (secondRow === row?._id) {
      setSecondRow();
      setBeneID();
    } else {
      setSecondRow(row?._id);
      setBeneID(row?.beneficiaryId);
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

  const APICall = () => {
    if (stopapi == false) {
      dispatch(BenefeciaryList(limit, skip));
    } else {
      setLoader(false);
    }
  };

  useEffect(() => {
    setLoader(true);
    APICall();
  }, [skip]);

  useEffect(() => {
    dispatch(GetInstitutionList());
  }, []);

  const { benef_list, institution_list, health_issue_family_member } =
    useSelector((state) => state.fetchdata);
  const { add_benef_res, add_instition_res, health_issue_family_res } =
    useSelector((state) => state.submitdata);

  const [count, setObjectCount] = useState();

  useEffect(() => {
    if (benef_list) {
      if (
        benef_list?.data?.codeStatus == "200" ||
        benef_list?.data?.data?.objectCount
      ) {
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
      if (
        institution_list?.data?.codeStatus == "200" ||
        institution_list?.data?.object ||
        institution_list?.data?.objectCount
      ) {
        setInstitutionList(institution_list?.data?.institutes);

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
      if (
        add_benef_res?.data?.codeStatus == "200" ||
        add_benef_res?.data?.codeStatus == "201" ||
        add_benef_res?.data?.object
      ) {
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
      if (
        add_instition_res?.data?.codeStatus == "200" ||
        add_instition_res?.data?.object
      ) {
        Swal.fire({
          icon: "success",
          text: "institution created successfully",
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
    // console.log("data", count, benef_lists?.length)

    // if (count == data?.length) {
    //   setStopAPi(true);
    //   setLoadMoreAlwways(false)
    // }
    // if (data_res?.data?.data?.objectCount >= data?.length) {
    // if (count > data?.length ) {
    //   setStopAPi(false);
    //   setLoadMoreAlwways(true)
    // }
    // if (count > data?.length) {
    //   setStopAPi(false);
    // }

    if (count <= skip + limit) {
      setStopAPi(true);
      // setLoadMoreAlwways(false)
    }
  }, [count, benef_lists]);

  useEffect(() => {
    if (medicaldmodal && familymember) {
      dispatch(
        FamilyMemberHealthIssueDetails(beniId, familymember?.familyMemberId)
      );
    }
  }, [medicaldmodal]);

  useEffect(() => {
    if (health_issue_family_member) {
      if (health_issue_family_member?.data?.statusCode == "200") {
        setFamilyMemeberHealthData(health_issue_family_member?.data?.data);
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

  // Add Modal Res

  // console.log("familymemberHealtDetail", );
  return (
    <div className="main-content">
      <div className="tnstitution">
        <Row className="align-items-center">
          <Col lg={6} md={12}>
            <div className="cmy-drp">
              <form>
                <div className="form-group">
                  <label>Institution</label>
                  <select onChange={(e) => setInstitution(e.target.value)}>
                    <option value={""} selected>
                      Select Company
                    </option>
                    {institutionList &&
                      institutionList?.map((val, ins) => (
                        <option
                          value={
                            val?.cityHQ +
                            "-" +
                            val?.institutionId +
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
                + Add New Institution
              </button>
              <MyVerticallyInstitution
                show={modalShow1}
                onHide={() => setModalShow1(false)}
                institutiondata={institutiondata}
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
                }}
              >
                + Add New Benefeciary
              </button>
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                institutiondata={institutiondata}
              />
              <button>+ Import Beneficiares</button>
            </div>
          </Col>
        </Row>
      </div>
      <div className="policy-beneficiary">
        <h5>Policy beneficiary</h5>
        <div className="plcy-bene">
          <Row>
            <Col lg={4} md={12} className="p-0 bdr-rght">
              <div style={{ display: detatilsbtn ? "none" : "block" }}>
                <div className="title-hdr">
                  <h2>
                    <span></span>
                    Details
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
                      Institution name:{" "}
                      <span> {institutiondata?.split("-")[2]}</span>
                    </li>
                    <li>
                      Phone number: <span>091-954-3355</span>
                    </li>
                    <li>
                      Address: <span>Shatar road</span>
                    </li>
                    <li>
                      City: <span> {institutiondata?.split("-")[0]}</span>
                    </li>
                    <li>
                      Employee count: <span>24231</span>
                    </li>
                    <li>
                      Beneficiary count: <span>70231</span>
                    </li>
                    <li>
                      Insurance budget: <span>1,000,000 Dinars</span>
                    </li>
                    <li>
                      Reset date: <span>October 3</span>
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
                    Details
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
                      Institution name:{" "}
                      <span>
                        <input type="text" placeholder="Al-Naseem company" />
                      </span>
                    </li>
                    <li>
                      Phone number:{" "}
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
                    Benefit Policy{" "}
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
                    <Tab eventKey="home" title="In-Patient">
                      <div className="lmt-dan">
                        <h2>
                          Aggregate Limit <span>1000LYD per member</span>
                        </h2>
                      </div>
                      <div className="srce-lmt text-center">
                        <Row>
                          <Col>
                            <h4>Service</h4>
                          </Col>
                          <Col>
                            <h4>Limit</h4>
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
                    <Tab eventKey="profile" title="Out-Patient">
                      <div className="lmt-dan">
                        <h2>
                          Aggregate Limit <span>1000LYD per member</span>
                        </h2>
                      </div>
                      <div className="srce-lmt text-center">
                        <Row>
                          <Col>
                            <h4>Service</h4>
                          </Col>
                          <Col>
                            <h4>Limit</h4>
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
                            <h4>Service</h4>
                          </Col>
                          <Col>
                            <h4>Limit</h4>
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
                            <h4>Service</h4>
                          </Col>
                          <Col>
                            <h4>Limit</h4>
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
                  <input type="text" placeholder="Search by name" />
                  <img src={"/assets/images/search-normal.svg"} alt="img" />
                </div>
                <div className="heading-tble">
                  <h3>Beneficiaries</h3>
                </div>
                <div className="imprt-btn">
                  <button>Import</button>
                </div>
              </div>
              <div className="benefic-tble">
                <Table className="table-responsive">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Full Name</th>
                      <th>
                        BirthDate <span>(Age)</span>
                      </th>
                      <th>Status</th>
                      <th>Family Count</th>
                      <th>Employee ID</th>
                      <th>Phone Number</th>
                      <th>Residence </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {benef_lists &&
                      benef_lists?.map((val, ins) => (
                        <>
                          <tr key={ins} onClick={(e) => setShowRow(e, val)}>
                            <td>{val.beneficiaryId}</td>
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
                            <td>{val?.familyMembers?.length}</td>
                            <td>Employee ID</td>
                            <td>{val?.phoneNumber}</td>
                            <td>{val?.residentCity} </td>
                            <td>
                              <button>Details</button>{" "}
                            </td>
                          </tr>
                          {secondRow?.includes(val?._id) ? (
                            <>
                              {val?.familyMembers &&
                                val?.familyMembers?.map((v, i) => (
                                  <>
                                    <tr className="clr-tr">
                                      <td>{v?.familyMemberId}</td>
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
                                      <td>{v?.relationshipToBeneficiary}</td>
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
                      Load More{" "}
                    </button>
                  </center>
                )}
              </div>
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
