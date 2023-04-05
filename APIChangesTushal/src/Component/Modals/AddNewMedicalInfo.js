import { useEffect, useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";

import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { AddHelathreportData } from "../../redux/actions/action";
import Swal from "sweetalert2";
function AddNewInfo(props) {
  const { health_issue_family_res } = useSelector((state) => state.submitdata);

  const [doctortype, setDoctorType] = useState("alergy");

  const dispatch = useDispatch();
  // allergyState

  // const [allergy ]

  const [fileImage, setFile] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [diagnosedByName, setDiagnosedBy] = useState("");
  const [diagnosedByDate, setDiagnosedDate] = useState("");
  const [date, setDate] = useState("");
  const [reportDate, setReportDate] = useState("");
  const [healthcenter, setHealthCenter] = useState("");

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("file2", fileImage);
    formdata.append("name", name);
    formdata.append("title", title);
    formdata.append("type", doctortype);

    dispatch(AddHelathreportData(formdata, props?.beni_id));
  };

  const DeleteImage = (e) => {
    e.preventDefault();
    setFile();
    setImagePreview("");
  };

  useEffect(() => {
    if (health_issue_family_res) {
      if (health_issue_family_res?.data?.codeStatus == "200") {
        Swal.fire({
          icon: "success",
          text: health_issue_family_res?.data?.message,
        });

        props.setMedicalModal(false);
        props.setAddMedicalDataForm(false);
      } else if (
        health_issue_family_res?.startsWith("beneficiaries validation faile")
      ) {
        Swal.fire({
          icon: "error",
          text: health_issue_family_res?.substr(0, 26),
        });
      }
    }
    return () => {
      dispatch({ type: "ADD_HEALTH_ISSUE_FAMILY_MEMBER", payload: "" });
    };
  }, [health_issue_family_res]);

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
    setHealthCenter("");
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      fullscreen={true}
      className="beneficiaries-full"
    >
      <Modal.Body className="full-modl-screen">
        <Row>
          <Col md={3}></Col>
          <Col md={6} className="add-mdicl-file">
            <>
              <Modal.Header closeButton className="mb-4">
                <Modal.Title>Add Info</Modal.Title>
              </Modal.Header>
              <div className="add-denefi-markers">
                <div className="add-form p-0">
                  <form id="form-data">
                    <Row>
                      <Col md={6}>
                        <div className="form-group">
                          <label>Name</label>
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
                          <label>Doctor Type</label>
                          <select onChange={DropDownChange} value={doctortype}>
                            <option value="" selected>
                              Types are:
                            </option>
                            <option value="alergy">Allergies</option>
                            <option value="chronic">Chronic Disease</option>
                            <option value="medicaltest">Medical Test</option>
                            <option value="surgeroy">Surgery History</option>
                            <option value="clinic">Clinic Visit</option>
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
                              <label>Notes:</label>
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
                              <label>Title :</label>
                              <input
                                type="text"
                                name="title"
                                // placeholder="Title"
                              />
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="form-group">
                              <label>Diagonsed On :</label>
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
                              <label>Diagonsed By :</label>
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
                              <label>Notes:</label>
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
                              <label>Title :</label>
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
                              <label>Report Date :</label>
                              <input
                                type="date"
                                name="title"
                                // placeholder="Title"

                                value={reportDate}
                                onChange={(e) => setReportDate(e.target.value)}
                              />
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
                              <label>Title :</label>
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
                              <label>Health Center :</label>
                              <input
                                type="text"
                                name="title"
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
                              <label>Date :</label>
                              <input
                                type="date"
                                name="title"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                              />
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="form-group">
                              <label>Doctor :</label>
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
                              <label>Notes:</label>
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
                              <label>Title :</label>
                              <input
                                type="text"
                                name="title"
                                // placeholder="Title"
                              />
                            </div>
                          </Col>

                          <Col md={6}>
                            <div className="form-group">
                              <label>Health Center :</label>
                              <input
                                type="text"
                                name="title"
                                // placeholder="Title"
                              />
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="form-group">
                              <label>Date :</label>
                              <input
                                type="date"
                                name="title"
                                // placeholder="Title"
                              />
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="form-group">
                              <label>Doctor :</label>
                              <input
                                type="text"
                                name="title"
                                // placeholder="Title"
                              />
                            </div>
                          </Col>
                          <Col md={12}>
                            <div className="form-group">
                              <label>Notes:</label>
                              <textarea cols="5"></textarea>
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
                          <label>Upload File</label>
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
                      Cancel
                    </button>
                    <button
                      className="add-fmy-btn"
                      // type="submit"
                      onClick={handleSubmit}
                      form="form-data"
                    >
                      Submit
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
