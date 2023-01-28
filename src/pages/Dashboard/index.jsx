/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import InfoBar from "../../components/InfoBar";
import NavbarComponent from "../../components/Navbar";
import {
  AiFillHome,
  AiFillSetting,
  AiOutlineDown,
  AiOutlineUp,
  AiFillEye,
  AiFillDelete,
  AiOutlineUser,
} from "react-icons/ai";
// import { GiPerson } from "react-icons/gi";
//styles
import "./styles.css";

import fetchAPI from "../../services/pegawai";
import ToastComponent from "../../components/Toast";

const HomePage = () => {
  const [openDrop, setOpenDrop] = React.useState(false);
  const [openToast, setOpenToast] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [menu, setMenu] = React.useState("HOME");
  const [data, setData] = React.useState(null);
  const [message, setMessage] = React.useState({
    success: "",
    error: "",
  });
  const [response, setResponse] = React.useState({
    status: 200,
    message: "",
  });

  const [dataPost, setDataPost] = React.useState({
    nama: "",
    nip: "",
    jabatan: "",
    pangkat: "",
    phone: "",
    nama_bank: "",
    no_rek: "",
    nama_rek: "",
  });
  const menus = [{ label: "HOME" }, { label: "PEGAWAI" }];

  const getAllPegawai = async () => {
    try {
      const result = await fetchAPI({
        endpoint: "/pegawai?page=1&limit=10",
      });
      // console.log(result);
      if (result.status === 200) {
        setData(result.data?.result);
      }
    } catch (error) {
      setResponse({
        ...response,
        status: error.response?.status,
        message: error.response?.data.masagge,
      });
    }
  };

  const handleAddKaryawan = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await fetchAPI({
        method: "POST",
        endpoint: "/pegawai",
        data: dataPost,
      });
      if (result.status === 200) {
        setIsLoading(false);
        setMessage({ ...message, success: result.message });
        setIsSuccess(true);
        setOpenToast(!openToast);
        setDataPost({
          nama: "",
          nip: "",
          no_rek: "",
          nama_bank: "",
          nama_rek: "",
          pangkat: "",
          phone: "",
        });
      }
    } catch (error) {
      setIsLoading(false);
      // console.log(error);
      setIsSuccess(false);
      setMessage({ ...message, error: error.message });
      setOpenToast(!openToast);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    getAllPegawai();
  }, [data]);

  console.log(message);
  return (
    <div className={`${!add ? "home-container" : ""} bg-secondary`}>
      <header className="bg-success">
        <NavbarComponent />
        <InfoBar menu={menu} add={add} setAdd={setAdd} />
      </header>
      <div className="d-flex gap-4">
        <div className="menu-content bg-white p-3">
          {menus.map((item) => {
            return (
              <div
                onClick={() => {
                  setMenu(item.label);
                }}
                key={item.label}
                className={`d-flex gap-3 ${
                  menu === item.label ? "bg-secondary" : ""
                } p-1 px-2 mb-2 rounded-4 align-items-center menu-item`}
              >
                <div className="bg-success icon-home align-items-center">
                  {item.label === "HOME" ? (
                    <AiFillHome className="text-white" />
                  ) : (
                    <AiOutlineUser className="text-white" />
                  )}
                </div>
                <p
                  className={`fw-bold ${
                    menu === item.label ? "text-white" : ""
                  } mt-2`}
                >
                  {item.label}
                </p>
              </div>
            );
          })}
          <div
            onClick={() => {
              setOpenDrop(!openDrop);
            }}
            className="d-flex gap-3 p-1 px-2 mb-2 rounded-4 align-items-center justify-content-between setting-menu"
          >
            <div className="bg-success icon-home align-items-center">
              <AiFillSetting className="text-white" />
            </div>
            <p className="fw-bold text-blac fw-bold mt-2">SETTING</p>
            {openDrop ? (
              <AiOutlineUp color="black" />
            ) : (
              <AiOutlineDown color="black" />
            )}
          </div>
          {openDrop && (
            <div className="ps-5 fw-bold">
              <button className="btn">Penandatanganan Berkas</button>
              <button className="btn">Pengaturan Login & Hak</button>
            </div>
          )}
        </div>
        <div className="main-content bg-white p-3">
          {menu === "HOME" && (
            <div className="text-center">
              <h1>WELCOME HOME</h1>
            </div>
          )}
          {menu === "PEGAWAI" && add === false && (
            <table className="table table-warning">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>NIP</th>
                  <th>Jabatan</th>
                  <th>Pangkat</th>
                  <th>Gol</th>
                  <th>Kontak</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.length === 0 && response.status !== 200 && (
                  <div>
                    <h1>{response.message}</h1>
                  </div>
                )}
                {data?.length > 0 &&
                  data?.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.nama}</td>
                        <td>{item.nip}</td>
                        <td>{item.jabatan}</td>
                        <td>{item.pangkat}</td>
                        <td>IV a</td>
                        <td>{item.phone}</td>
                        <td>
                          <AiFillEye style={{ cursor: "pointer" }} />
                          <AiFillSetting
                            style={{ cursor: "pointer" }}
                            className="mx-2"
                          />
                          <AiFillDelete style={{ cursor: "pointer" }} />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
          {menu === "PEGAWAI" && add && (
            <div className="">
              <ToastComponent
                setShow={setOpenToast}
                show={openToast}
                message={!isSuccess ? message.error : message.success}
                isSuccess={isSuccess}
              />
              <h4 className="text-success">Tambah Data Pegawai</h4>
              <form onSubmit={handleAddKaryawan} className="form-container">
                <div className="input-container">
                  <div className="mb-2 row">
                    <label htmlFor="nama" className="col-sm-2 col-form-label">
                      Nama
                    </label>
                    <div className="col-sm-10">
                      <input
                        value={dataPost.nama}
                        onChange={(e) => {
                          setDataPost({ ...dataPost, nama: e.target.value });
                        }}
                        type="text"
                        className="form-control"
                        id="nama"
                      />
                    </div>
                  </div>
                  <div className="mb-2 row">
                    <label htmlFor="NIP" className="col-sm-2 col-form-label">
                      NIP
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => {
                          setDataPost({ ...dataPost, nip: e.target.value });
                        }}
                        value={dataPost.nip}
                        type="text"
                        className="form-control"
                        id="NIP"
                      />
                    </div>
                  </div>
                  <div className="select-input">
                    <label htmlFor="NIP" className="col-sm-2 col-form-label">
                      Jabatan
                    </label>
                    <select
                      onChange={(e) => {
                        setDataPost({ ...dataPost, jabatan: e.target.value });
                      }}
                      defaultValue="0"
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option disabled value="0">
                        Pilih jabatan
                      </option>
                      <option value="Manager">Manager</option>
                    </select>
                  </div>
                  <div className="select-input my-2">
                    <label htmlFor="NIP" className="col-sm-2 col-form-label">
                      Pangkat
                    </label>
                    <select
                      defaultValue="0"
                      onChange={(e) => {
                        setDataPost({ ...dataPost, pangkat: e.target.value });
                      }}
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option disabled value="0">
                        Pilih pangkat
                      </option>
                      <option value="Pranata R">Pranata R</option>
                    </select>
                  </div>
                  <div className="select-input my-2">
                    <label htmlFor="NIP" className="col-sm-2 col-form-label">
                      Gol
                    </label>
                    <select
                      defaultValue="0"
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option disabled value="0">
                        Pilih Gol
                      </option>
                      <option value="-">-</option>
                    </select>
                  </div>
                  <div className="mb-2 row">
                    <label htmlFor="kontak" className="col-sm-2 col-form-label">
                      Kontak
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => {
                          setDataPost({ ...dataPost, phone: e.target.value });
                        }}
                        value={dataPost.phone}
                        type="text"
                        className="form-control"
                        id="kontak"
                      />
                    </div>
                  </div>
                  <div className="mb-2 row">
                    <label htmlFor="bank" className="col-sm-2 col-form-label">
                      Nama Bank
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => {
                          setDataPost({
                            ...dataPost,
                            nama_bank: e.target.value,
                          });
                        }}
                        value={dataPost.nama_bank}
                        type="text"
                        className="form-control"
                        id="bank"
                      />
                    </div>
                  </div>
                  <div className="mb-2 row">
                    <label htmlFor="norek" className="col-sm-2 col-form-label">
                      No Rek
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => {
                          setDataPost({ ...dataPost, no_rek: e.target.value });
                        }}
                        value={dataPost.no_rek}
                        type="text"
                        className="form-control"
                        id="norek"
                      />
                    </div>
                  </div>
                  <div className="mb-2 row">
                    <label
                      htmlFor="namarek"
                      className="col-sm-2 col-form-label"
                    >
                      Nama Rek
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => {
                          setDataPost({
                            ...dataPost,
                            nama_rek: e.target.value,
                          });
                        }}
                        value={dataPost.nama_rek}
                        type="text"
                        className="form-control"
                        id="namarek"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-50 d-flex justify-content-end">
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="btn btn-success"
                  >
                    {isLoading ? "Sedang menambah..." : "TAMBAH"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
