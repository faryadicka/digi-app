import React from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import "./styles.css";

const InfoBar = ({ menu, add, setAdd }) => {
  return (
    <div className="infobar-container bg-secondary container-fluid d-flex align-items-center">
      <div className="d-flex align-items-center gap-5">
        <h1 className="text-white">D</h1>
        <p className="fw-bold text-white">PT.DIGI TEKNO</p>
      </div>
      <div>
        {menu === "HOME" ? (
          <table className="table table-borderless text-white">
            <thead>
              <tr>
                <th scope="col">Tahun</th>
                <th scope="col">Jumlah Pegawai</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fw-bold border-end">
                  {new Date().getFullYear()}
                </td>
                <td className="text-center fw-bold">123</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div>
            <div className="d-flex align-items-center">
              <IoPersonCircleSharp size={60} color="white" />
              <h3 className="text-white">PEGAWAI</h3>
            </div>
            {menu === "PEGAWAI" && !add ? (
              <button
                onClick={() => setAdd(!add)}
                className="btn btn-success fw-bold text-white"
              >
                + TAMBAH
              </button>
            ) : (
              <button
                onClick={() => setAdd(!add)}
                className="btn btn-success fw-bold text-white"
              >
                BACK TO KARYAWAN LIST
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoBar;
