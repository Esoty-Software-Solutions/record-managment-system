import React, { useState } from "react";

import { RiArrowDropDownLine } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { RiCustomerService2Fill } from "react-icons/ri";
import { BsGenderMale, BsJournalMedical } from "react-icons/bs";
import { FaCity } from "react-icons/fa";
import { TbCalendarTime } from "react-icons/tb";
import { AiFillAccountBook } from "react-icons/ai";
import { useIntl } from "react-intl";


const Sidebar = () => {
  const location = useRouter();
  const dispatch = useDispatch();
  const [dropdown, setShowDrop] = useState(false);
  const { sidebar } = useSelector((state) => state.fetchdata);
  const { formatMessage: covert } = useIntl();
  return (
    <div
      className={`${
        sidebar ? `sidebar-section ` : `sidebar-section tlge-sidebar`
      }`}
      style={{ height: "85vh", overflow: "scroll initial" }}
    >
      <div className="profile-section">
        <div className="pr-icn">
          <img src={"/assets/images/pro-icon.png"} alt="img" />
        </div>
        <h3>John William</h3>
        <Link href="#">User Account</Link>
      </div>
      <div className="meni-list">
        <ul>
          <li
            className={
              location.pathname == "/" ? "active meni-tem" : "meni-tem"
            }
          >
            <Link href="/">
              <i>
                {" "}
                <img
                  className="main-imgg"
                  src={"/assets/images/side-1.svg"}
                  alt="img"
                />
              </i>{" "}
              <span>{covert({ id: "Total" })}</span>
              {/* <span>Process Booking</span> */}
            </Link>
          </li>
          <li
            className={
              location.pathname == "/MedicalCenter"
                ? "active meni-tem"
                : "meni-tem"
            }
          >
            <Link href="/MedicalCenter">
              <i>
                {" "}
                <img src={"/assets/images/side-2.svg"} alt="img" />
              </i>{" "}
              <span>{covert({ id: "MedicalCenter" })}</span>
            </Link>
            {/* <span>Medical Center</span> */}
          </li>
          <li
            className={
              location.pathname == "/Doctor" ? "active meni-tem" : "meni-tem"
            }
          >
            <Link href="/Doctor">
              <i>
                {" "}
                <img src={"/assets/images/side-3.svg"} alt="img" />
              </i>{" "}
              
              <span>{covert({ id: "Doctor" })}</span>
            </Link>
          </li>
          <li
            className={
              location.pathname == "/Benificiary"
                ? " active meni-tem"
                : "meni-tem"
            }
          >
            <Link href="/Benificiary">
              <i>
                {" "}
                <img src={"/assets/images/side-4.svg"} alt="img" />
              </i>{" "}
              <span>{covert({ id: "Subscriber" })}</span>
              {/* <span>{covert({ id: "Institution" })}</span> */}
            </Link>
          </li>
          <li
            className={
              location.pathname == "/Prescription"
                ? "active meni-tem"
                : "meni-tem"
            }
          >
            <Link href="/Prescription">
              <i>
                {" "}
                <img src={"/assets/images/side-4.svg"} alt="img" />
              </i>{" "}
              <span>{covert({ id: "Prescription" })}</span>
            </Link>
          </li>
          <li
            className={
              location.pathname == "/ExpenseClaims"
                ? "active meni-tem"
                : "meni-tem"
            }
          >
            <Link href="/ExpenseClaims">
              <i>
                {" "}
                <img src={"/assets/images/side-4.svg"} alt="img" />
              </i>{" "}
              <span>{covert({ id: "expenseCLaims" })}</span>
            </Link>
          </li>

          <li
            className={
              location.pathname == "/MedicalClaims" ||
              location.pathname == "/ExpenseDetails" ||
              location.pathname == "/MedicalGenericService"
                ? "active meni-tem"
                : "meni-tem"
            }
            onClick={() => setShowDrop(!dropdown)}
          >
            <Link href="#">
              <i>
                {" "}
                <img src={"/assets/images/side-4.svg"} alt="img" />
              </i>{" "}
              <span>
                {covert({ id: "MedicalClaims" })}

                <b className={!dropdown ? "icn-dp" : "icn-dp rotate-icon"}>
                  <RiArrowDropDownLine />
                </b>
              </span>
            </Link>

            <ul className={dropdown ? "drp-dwn" : "drp-dwn-default"}>
              <li
              // className={
              //   location.pathname == "/medical-claims"
              //     ? "active meni-tem"
              //     : "meni-tem"
              // }
              >
                <Link href="/MedicalClaims">
                  {/* <i>
                    
                  
                  </i>  */}
                  <span> {covert({ id: "MedicalClaims" })}</span>
                </Link>
              </li>

              <li
              // className={
              //   location.pathname == "/medical-claims-detail"
              //     ? "active meni-tem"
              //     : "meni-tem"
              // }
              >
                <Link href="/ExpenseDetails">
                  {/* <i>
                     
                  </i>  */}
                  <span>{covert({ id: "medicaldetail" })}</span>
                </Link>
              </li>
              <li
              // className={
              //   location.pathname == "/medical-generic-service"
              //     ? "active meni-tem"
              //     : "meni-tem"
              // }
              >
                <Link href="/MedicalGenericService">
                  {/* <i>
                   
                    
                  </i>  */}
                  <span>{covert({ id: "medicalgeneric" })}</span>
                </Link>
              </li>
            </ul>
          </li>

          <li
            className={
              location.pathname == "/Admiration"
                ? "active meni-tem"
                : "meni-tem"
            }
          >
            <Link href="/Admiration">
              <i>
                {" "}
                <img src={"/assets/images/side-5.svg"} alt="img" />
              </i>{" "}
              <span>{covert({ id: "adminration" })}</span>
            </Link>
          </li>

          {/* New Work 6-04-2023 */}

          <li
            className={
              location.pathname == "/Cities" ? "active meni-tem" : "meni-tem"
            }
          >
            <Link href="/Cities">
              <i>
                {" "}
                <FaCity style={{ fontSize: "20px" }} />
                {/* <img src={"/assets/images/side-4.svg"} alt="img" /> */}
              </i>{" "}
              <span>{covert({ id: "onlyCity" })}</span>
            </Link>
          </li>

          <li
            className={
              location.pathname == "/MedicalSpecilaty"
                ? "active meni-tem"
                : "meni-tem"
            }
          >
            <Link href="/MedicalSpecilaty">
              <i>
                {" "}
                <BsJournalMedical style={{ fontSize: "20px" }} />
                {/* <img src={"/assets/images/side-4.svg"} alt="img" /> */}
              </i>{" "}
              {/* <span>Medical Specilaties</span> */}
              <span>{covert({ id: "medicalSpcecalties" })}</span>
            </Link>
          </li>

          <li
            className={
              location.pathname == "/Gender" ? "active meni-tem" : "meni-tem"
            }
          >
            <Link href="/Gender">
              <i>
                {" "}
                <BsGenderMale style={{ fontSize: "20px" }} />
                {/* <img src={"/assets/images/side-4.svg"} alt="img" /> */}
              </i>{" "}
              <span>{covert({ id: "gender" })}</span>
            </Link>
          </li>
          <li
            className={
              location.pathname == "/MedicalService"
                ? "active meni-tem"
                : "meni-tem"
            }
          >
            <Link href="/MedicalService">
              <i>
                {" "}
                <RiCustomerService2Fill style={{ fontSize: "20px" }} />
                {/* <img src={"/assets/images/side-4.svg"} alt="img" /> */}
              </i>{" "}
              <span>{covert({ id: "medicalservice" })}</span>
            </Link>
          </li>
          <li
            className={
              location.pathname == "/Appointment"
                ? "active meni-tem"
                : "meni-tem"
            }
          >
            <Link href="/Appointment">
              <i>
                {" "}
                <img src={"/assets/images/side-4.svg"} alt="img" />
              </i>{" "}
              <span> {covert({ id: "Onlyappointment" })}</span>
            </Link>
          </li>

          <li
            className={
              location.pathname == "/RelationShip"
                ? "active meni-tem"
                : "meni-tem"
            }
          >
            <Link href="/RelationShip">
              <i>
                {" "}
                <img src={"/assets/images/side-4.svg"} alt="img" />
              </i>{" "}
              <span>{covert({ id: "RelationShip" })}</span>
            </Link>
          </li>

          <li
            className={
              location.pathname == "/TimeSlot" ? "active meni-tem" : "meni-tem"
            }
          >
            <Link href="/TimeSlot">
              <i>
                {" "}
                <TbCalendarTime style={{ fontSize: "20px" }} />
                {/* <img src={"/assets/images/side-4.svg"} alt="img" /> */}
              </i>{" "}
              <span>{covert({ id: "TimeSlot" })}</span>
            </Link>
          </li>

          <li
            className={
              location.pathname == "/AccountStatus"
                ? "active meni-tem"
                : "meni-tem"
            }
          >
            <Link href="/AccountStatus">
              <i>
                {" "}
                <AiFillAccountBook style={{ fontSize: "20px" }} />
                {/* <img src={"/assets/images/side-4.svg"} alt="img" /> */}
              </i>{" "}
              <span>{covert({ id: "Account Status" })}</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
