import React, { Component, useState, useEffect } from "react";
import "./App.css";
// import ReactTable from "react-table";
// import "react-table/react-table.css";

function App() {
  const [data, setdata] = useState([]);
  const [originaldata, setoriginaldata] = useState([]);
  const [firstnameFilter, setFirstNameFilter] = useState("");
  const [lastnameFilter, setLastNameFilter] = useState("");
  const [phoneFilter, setPhoneFilter] = useState("");

  const inputChanged = (e, inputType) => {
    if (inputType == "name") {
      setFirstNameFilter(e.target.value);

      setdata(
        originaldata.filter((item) => {
          return item.name[0].includes(e.target.value);
        })
      );
    } else if (inputType == "lastName") {
      setLastNameFilter(e.target.value);
      setdata(
        originaldata.filter((item) => {
          return item.lastName[0].includes(e.target.value);
        })
      );
    } else if (inputType == "phone") {
      setPhoneFilter(e.target.value);
      setdata(
        originaldata.filter((item) => {
          return item.phone[0].includes(e.target.value);
        })
      );
    }
  };

  useEffect(() => {
    fetch("/data", { method: "post" })
      .then((res) => res.json())
      .then((result) => {
        setdata(result.result[0].result.contacts.contact);
        setoriginaldata(result.result[0].result.contacts.contact);
      });
  }, []);

  return (
    <div className="App">
      <h1>Assessment</h1>
      <table className="center" style={{
        margin:"10px auto",
        border:"1px solid black",
        borderCollapse:"collapse"
      }}>
        <tr>
          <th>
            <input
              type="text"
              placeholder="First name"
              value={firstnameFilter}
              onChange={(e) => inputChanged(e, "name")}
            />
          </th>
          <th>
            <input
              type="text"
              placeholder="Last name"
              value={lastnameFilter}
              onChange={(e) => inputChanged(e, "lastName")}
            />
          </th>
          <th>
            <input
              type="text"
              placeholder="Phone"
              value={phoneFilter}
              onChange={(e) => inputChanged(e, "phone")}
            />
          </th>
        </tr>
        {data.map((item) => {
          return (
            <tr className="center" >
              <td style={{ border:"1px solid black"}}>{item.name}</td>
              <td style={{ border:"1px solid black"}}>{item.lastName}</td>
              <td style={{ border:"1px solid black"}}>{item.phone}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
