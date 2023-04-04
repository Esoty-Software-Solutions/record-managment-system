import React, { useState } from "react";

import { RiArrowDropDownLine } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

const Sidebar = () => {
  const location = useRouter();
  const dispatch = useDispatch();
  const [dropdown, setShowDrop] = useState(false);
  const { sidebar } = useSelector((state) => state.fetchdata);

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
              <span>Process Booking</span>
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
              <span>Medical Center</span>
            </Link>
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
              <span>Doctor</span>
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
              <span>Institution</span>
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
              <span>Expense Claims</span>
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
                Medical Claims{" "}
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
                  <span>Medical Claims</span>
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
                  <span>Medical Expense Claims Detailed View</span>
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
                  <span>Medical Generic Service</span>
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
              <span> Admintration</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
