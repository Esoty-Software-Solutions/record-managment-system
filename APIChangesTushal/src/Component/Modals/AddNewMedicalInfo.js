import { useEffect, useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";

import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  AddHelathreportAllergies,
  AddHelathreportChronicDiseases,
  AddHelathreportClinicalVisits,
  AddHelathreportData,
  AddHelathreportMedicalTests,
  AddHelathreportSurgeryHistories,
} from "../../redux/actions/action";
import Swal from "sweetalert2";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
function AddNewInfo(props) {
  const { formatMessage: covert } = useIntl();
  const { health_issue_family_res, add_health_issue_family_res } = useSelector(
    (state) => state.submitdata
  );

  console.log("props", props);

  const [doctortype, setDoctorType] = useState("alergy");

  const dispatch = useDispatch();
  // allergyState

  // const [allergy ]

  const [fileImage, setFile] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [visitType, setVisitType] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [notes, setNotes] = useState("");
  const [diagnosedByName, setDiagnosedBy] = useState("");
  const [diagnosedByDate, setDiagnosedDate] = useState("");
  const [date, setDate] = useState("");
  const [reportDate, setReportDate] = useState("");
  const [healthcenter, setHealthCenter] = useState("");
  const [cityId, setCityId] = useState();

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // props.setMedicalModal(false);
    // dispatch(AddHelathreportData(formdata, props?.beni_id));

    if (doctortype == "alergy") {
      const formdata = new FormData();
      formdata.append("file", fileImage);
      formdata.append("notes", notes);
      formdata.append("title", title);

      dispatch(
        AddHelathreportAllergies(props?.beni_id, props.data._id, formdata)
      );
    }

    if (doctortype == "chronic") {
      const formdata = new FormData();
      formdata.append("file", fileImage);
      formdata.append("notes", notes);
      formdata.append("diagnosisDate", diagnosedByDate);
      formdata.append("doctorName", diagnosedByName);
      formdata.append("title", title);
      dispatch(
        AddHelathreportChronicDiseases(props?.beni_id, props.data._id, formdata)
      );
    }

    if (doctortype == "medicaltest") {
      const formdata = new FormData();
      formdata.append("file", fileImage);
      formdata.append("notes", notes);
      formdata.append("centerName", healthcenter);
      formdata.append("cityId", cityId);
      formdata.append("reportDate", reportDate);
      formdata.append("title", title);
      dispatch(
        AddHelathreportMedicalTests(props?.beni_id, props.data._id, formdata)
      );
    }

    if (doctortype == "surgeroy") {
      const formdata = new FormData();
      formdata.append("file", fileImage);
      formdata.append("notes", notes);
      formdata.append("centerName", healthcenter);

      formdata.append("surgeryDate", date);
      formdata.append("title", title);
      dispatch(
        AddHelathreportSurgeryHistories(
          props?.beni_id,
          props.data._id,
          formdata
        )
      );
    }

    if (doctortype == "clinic") {
      const formdata = new FormData();
      formdata.append("file", fileImage);
      formdata.append("notes", notes);
      formdata.append("centerName", healthcenter);
      formdata.append("doctorName", diagnosedByName);
      formdata.append("visitDate", visitDate);
      formdata.append("visitType", visitType);

      dispatch(
        AddHelathreportClinicalVisits(props?.beni_id, props.data._id, formdata)
      );
    }

    setTimeout(() => {
      setImagePreview("");
      setName("");
      setTitle("");
      setNotes("");
      setDiagnosedBy("");
      setDiagnosedDate("");
      setReportDate("");
      setDate("");
      setHealthCenter("");
      setDoctorType("allergies");
      setCityId("");
      setVisitDate();
      setVisitType();
    }, 2000);
  };

  const DeleteImage = (e) => {
    e.preventDefault();
    setFile();
    setImagePreview("");
  };

  // useEffect(() => {
  //   if (health_issue_family_res) {
  //     if (health_issue_family_res?.data?.codeStatus == "200") {
  //       Swal.fire({
  //         icon: "success",
  //         text: health_issue_family_res?.data?.message,
  //       });

  //       props.setMedicalModal(false);
  //       props.setAddMedicalDataForm(false);

  //       // setImagePreview("");
  //       // setName("");
  //       // setTitle("");
  //       // setNotes("");
  //       // setDiagnosedBy("");
  //       // setDiagnosedDate("");
  //       // setReportDate("");
  //       // setDate("");
  //       // setHealthCenter("");
  //       // setDoctorType("");
  //       // setCityId("");
  //     } else if (
  //       health_issue_family_res?.startsWith("beneficiaries validation faile")
  //     ) {
  //       Swal.fire({
  //         icon: "error",
  //         text: health_issue_family_res?.substr(0, 26),
  //       });
  //     }
  //   }
  //   return () => {
  //     dispatch({ type: "ADD_HEALTH_ISSUE_FAMILY_MEMBER", payload: "" });
  //   };
  // }, [health_issue_family_res]);

  // useEffect(() => {
  //   if (add_health_issue_family_res) {
  //     console.log("hello", add_health_issue_family_res?.data?.message);
  //     if (add_health_issue_family_res?.data?.statusCode == "200") {
  //       Swal.fire({
  //         icon: "success",
  //         text: add_health_issue_family_res?.data?.message,
  //       });

  //       props.setMedicalModal(false);
  //       props.setAddMedicalDataForm(false);

  //     } else if (
  //       add_health_issue_family_res?.startsWith(
  //         "beneficiaries validation faile"
  //       )
  //     ) {
  //       Swal.fire({
  //         icon: "error",
  //         text: add_health_issue_family_res?.substr(0, 26),
  //       });
  //     }
  //   }
  //   return () => {
  //     dispatch({ type: "ADD_HEALTH_ISSUE_FAMILY_MEMBER", payload: "" });
  //   };
  // }, [health_issue_family_res]);

  const DropDownChange = (e) => {
    e.preventDefault();
    setDoctorType(e.target.value);
    setImagePreview("");
    setName("");
    setTitle("");
    setNotes("");
    setDiagnosedBy("");
    setDiagnosedDate("");
    setReportDate("");
    setDate("");
    setVisitDate();
    setVisitType();
    setHealthCenter("");
    setCityId("");
  };
  const { locale } = useRouter();

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      fullscreen={true}
      className={
        locale == "ar" ? "beneficiaries-full new-rtl" : "beneficiaries-full"
      }
    >
      <Modal.Body className="full-modl-screen">
        <Row>
          <Col md={3}></Col>
          <Col md={6} className="add-mdicl-file">
            <>
              <Modal.Header closeButton className="mb-4">
                <Modal.Title>{covert({ id: "Add Info" })}</Modal.Title>
              </Modal.Header>
              <div className="add-denefi-markers">
                <div className="add-form p-0">
                  <form id="form-data">
                    <Row>
                      <Col md={6}>
                        <div className="form-group">
                          <label> {covert({ id: "name" })}</label>
                          <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="form-group">
                          <label>{covert({ id: "doctorType" })}</label>
                          <select onChange={DropDownChange} value={doctortype}>
                            <option value="" selected>
                              Types are:
                            </option>
                            <option value="alergy">
                              {covert({ id: "Allergies" })}
                            </option>
                            <option value="chronic">
                              {covert({ id: "Chronic Disease" })}
                            </option>
                            <option value="medicaltest">
                              {covert({ id: "Medical Tests" })}
                            </option>
                            <option value="surgeroy">
                              {covert({ id: "Surgery History" })}
                            </option>
                            <option value="clinic">
                              {covert({ id: "Clinic Visit" })}
                            </option>
                            {/* <option>Medical Tests</option> */}
                          </select>
                        </div>
                      </Col>

                      {doctortype == "alergy" ? (
                        <>
                          <Col md={12}>
                            <div className="form-group">
                              <label>Title :</label>
                              <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                              />
                            </div>
                          </Col>
                          <Col md={12}>
                            <div className="form-group">
                              <label>{covert({ id: "Notes" })}:</label>
                              <textarea
                                cols="5"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                              ></textarea>
                            </div>
                          </Col>
                          <Col md={12}>
                            {/* <div className="form-group">
                              <label>Upload File</label>
                              <div className="uplfle">
                                <input type="file" onChange={onChange} />
                                <img src={"/assets/images/upload-img.svg"} alt="img" />
                              </div>
                            </div> */}
                          </Col>
                        </>
                      ) : doctortype == "chronic" ? (
                        <>
                          <Col md={12}>
                            <div className="form-group">
                              <label>{covert({ id: "Title" })} :</label>
                              <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                // placeholder="Title"
                              />
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "DiagnoesOn" })} :</label>
                              <input
                                type="date"
                                name="dates"
                                // placeholder="Title"
                                value={diagnosedByDate}
                                onChange={(e) =>
                                  setDiagnosedDate(e.target.value)
                                }
                              />
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "DiagnoesBy" })} :</label>
                              <input
                                type="text"
                                name="dateby"
                                value={diagnosedByName}
                                onChange={(e) => setDiagnosedBy(e.target.value)}
                                // placeholder="Title"
                              />
                            </div>
                          </Col>
                          <Col md={12}>
                            <div className="form-group">
                              <label>{covert({ id: "Notes" })}:</label>
                              <textarea
                                cols="5"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                              ></textarea>
                            </div>
                          </Col>
                          {/* <Col md={12}>
                            <div className="form-group">
                              <label>Upload File</label>
                              <div className="uplfle">
                                <input type="file" onChange={onChange} />
                                <img src={"/assets/images/upload-img.svg"} alt="img" />
                              </div>
                            </div>
                          </Col> */}
                        </>
                      ) : doctortype == "medicaltest" ? (
                        <>
                          <Col md={12}>
                            <div className="form-group">
                              <label>{covert({ id: "Title" })} :</label>
                              <input
                                type="text"
                                name="title"
                                // placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                              />
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "CenterName" })} :</label>
                              <input
                                type="text"
                                name="center"
                                // placeholder="Title"

                                value={healthcenter}
                                onChange={(e) =>
                                  setHealthCenter(e.target.value)
                                }
                              />
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "City" })} :</label>
                              <select
                                name="cityId"
                                value={cityId}
                                onChange={(e) => setCityId(e.target.value)}
                              >
                                <option value={""} disabled selected>
                                  {covert({ id: "Select City" })}
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

                          <Col md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "Report Date" })} :</label>
                              <input
                                type="date"
                                name="title"
                                // placeholder="Title"

                                value={reportDate}
                                onChange={(e) => setReportDate(e.target.value)}
                              />
                            </div>
                          </Col>

                          <Col md={12}>
                            <div className="form-group">
                              <label>{covert({ id: "Notes" })}:</label>
                              <textarea
                                cols="5"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                              ></textarea>
                            </div>
                          </Col>
                          {/* <Col md={12}>
                            <div className="form-group">
                              <label>Upload File</label>
                              <div className="uplfle">
                                <input type="file" onChange={onChange} />
                                <img src={"/assets/images/upload-img.svg"} alt="img" />
                              </div>
                            </div>
                          </Col> */}
                        </>
                      ) : doctortype == "clinic" ? (
                        <>
                          <Col md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "Visit Type" })} :</label>
                              <input
                                type="text"
                                name="visit"
                                // placeholder="Title"
                                value={visitType}
                                onChange={(e) => setVisitType(e.target.value)}
                              />
                            </div>
                          </Col>

                          <Col md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "Health Center" })} :</label>
                              <input
                                type="text"
                                name="center"
                                // placeholder="Title"

                                value={healthcenter}
                                onChange={(e) =>
                                  setHealthCenter(e.target.value)
                                }
                              />
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "Date" })} :</label>
                              <input
                                type="date"
                                name="date"
                                value={visitDate}
                                onChange={(e) => setVisitDate(e.target.value)}
                              />
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "Doctor" })} :</label>
                              <input
                                type="text"
                                name="title"
                                // placeholder="Title"
                                value={diagnosedByName}
                                onChange={(e) => setDiagnosedBy(e.target.value)}
                              />
                            </div>
                          </Col>
                          <Col md={12}>
                            <div className="form-group">
                              <label>{covert({ id: "Notes" })}:</label>
                              <textarea
                                cols="5"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                              ></textarea>
                            </div>
                          </Col>

                          {/* <Col md={12}>
                            <div className="form-group">
                              <label>Upload File</label>
                              <div className="uplfle">
                                <input type="file" onChange={onChange} />
                                <img src={"/assets/images/upload-img.svg"} alt="img" />
                              </div>
                            </div>
                          </Col> */}
                        </>
                      ) : doctortype == "surgeroy" ? (
                        <>
                          <Col md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "Title" })} :</label>
                              <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                // placeholder="Title"
                              />
                            </div>
                          </Col>

                          <Col md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "Health Center" })} :</label>
                              <input
                                type="text"
                                value={healthcenter}
                                onChange={(e) =>
                                  setHealthCenter(e.target.value)
                                }
                                name="title"
                                // placeholder="Title"
                              />
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "Date" })} :</label>
                              <input
                                type="date"
                                name="title"
                                // placeholder="Title"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                              />
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "Doctor" })} :</label>
                              <input
                                type="text"
                                name="title"
                                value={diagnosedByName}
                                onChange={(e) => setDiagnosedBy(e.target.value)}
                                // placeholder="Title"
                              />
                            </div>
                          </Col>
                          <Col md={12}>
                            <div className="form-group">
                              <label>{covert({ id: "Notes" })}:</label>
                              <textarea
                                cols="5"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                              ></textarea>
                            </div>
                          </Col>

                          {/* <Col md={12}>
                            <div className="form-group">
                              <label>Upload File</label>
                              <div className="uplfle">
                                <input type="file" onChange={onChange} />
                                <img src={"/assets/images/upload-img.svg"} alt="img" />
                              </div>
                            </div>
                          </Col> */}
                        </>
                      ) : (
                        ""
                      )}

                      <Col md={12}>
                        <div className="form-group">
                          <label>{covert({ id: "upload" })}</label>
                          <div className="uplfle">
                            <input type="file" onChange={onChange} />
                            <img
                              src={"/assets/images/upload-img.svg"}
                              alt="img"
                            />
                          </div>
                        </div>
                      </Col>
                      <Col md={12}>
                        {imagePreview !== "" ? (
                          <div className="imag-preview">
                            <center>
                              {/* <img src={imagePreview} />
                              <button onClick={DeleteImage}>
                                <RxCross1 />
                              </button> */}
                              <p>{fileImage.name}</p>
                              <button onClick={DeleteImage}>
                                <RxCross1 />
                              </button>{" "}
                            </center>
                          </div>
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>
                  </form>
                </div>
                {doctortype !== "" ? (
                  <div className="can-sve mt-0">
                    <button
                      onClick={() => props.onHide()}
                      className="cls-btn-btn"
                    >
                      {covert({ id: "Cancel" })}
                    </button>
                    <button
                      className="add-fmy-btn"
                      // type="submit"
                      onClick={handleSubmit}
                      form="form-data"
                    >
                      {covert({ id: "Submit" })}
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
export default AddNewInfo;
