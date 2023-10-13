import React, { useState } from "react";
import * as XLSX from "xlsx";
import "./home.css";
import { Box } from "@chakra-ui/react";
import TableComponent from "../../Table";
import { FileUploader } from "react-drag-drop-files";


import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
const Home = () => {
  const [excelFileError, setExcelFileError] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      setExcelFileError("Please select any file.");
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(selectedFile);
    fileReader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(jsonData.slice(0, 100)); // Limit to the top 100 rows
      setDisplayedData(jsonData.slice(0, 100)); // Initial display
      setExcelFileError(null);
    };
    fileReader.onerror = () => {
      setExcelFileError("Error reading the file.");
    };
  };
  const fileTypes = ["CSV"];

  //   console.log(excelData);
  return (
    <>
      <div className="outBox">
        <Box>
          
          {/* <div className="main">
            <form className="form-group" autoComplete="off">
              <br></br>
              <input
                type="file"
                className="form-control"
                accept=".xlsx,.xls"
                onChange={handleFile}
                required
              ></input>
              <div className="dragDiv">
                <p className="dragText">Drag and Drop</p>
              </div>
              {excelFileError ? (
                <div className="text-danger" style={{ marginTop: "10px" }}>
                  {excelFileError}
                </div>
              ) : (
                <p style={{ marginTop: "10px", color: "white" }}></p>
              )}
            </form>
          </div> */}

          <div className="topButtons">
            <button style={{ background: "#a0bad3" }}>
              bar graph visualisation
            </button>
            <button style={{ background: "#a0bad3" }}>
              focused typography
            </button>
            <button style={{ background: "#a0bad3" }}>
              statistical calculater
            </button>
            <button style={{ background: "#a0bad3" }}>
              statistical clarity
            </button>
            <button style={{ background: "#a0bad3" }}>
              accessibility shortcut
            </button>
            <button style={{ background: "#a0bad3" }}>
              audible bar graph insights
            </button>
            <button style={{ background: "#a0bad3" }}>
              visual comfort mode
            </button>
            <button style={{ background: "#a0bad3" }}>audible statics</button>
            <button style={{ background: "#a0bad3" }}>undisturbed mode</button>
            {/* <button style={{ background: "#a0bad3" }}>read out aloud</button> */}
            <div class="dropdown">
  <button class="btn dropdown-toggle text-light"  style={{ background: "#a0bad3", fontSize:'13px', fontWeight:'600' }} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  read out aloud
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">Press F for female voice</a>
    <a class="dropdown-item" href="#">Press M for Male voice</a>
    <a class="dropdown-item" href="#">Press B for Stop</a>
  </div>
</div>
          </div>

          <div className="dragAndDropDiv">
            {/* <div className="inputDiv"> */}
           
              <br></br>
              <input
                type="file"
                className="form-control"
                accept=".xlsx,.xls"
                onChange={handleFile}
                required
              ></input>
             
              {excelFileError ? (
                <div className="text-danger" style={{ marginTop: "10px" }}>
                  {excelFileError}
                </div>
              ) : (
                <p style={{ marginTop: "10px", color: "white" }}></p>
              )}
           
            {/* </div> */}
          </div>

          <br></br>

          <div className="viewer">
            {excelData.length === 0 && <p style={{ color: "white" }}></p>}
            {excelData.length > 0 && (
              <div className="table-responsive">
                {/* <table className='table'>
                  <thead>
                    <tr>
                      {Object.keys(excelData[0]).map((header, index) => (
                        <th key={index} scope='col'>
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {displayedData.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {Object.values(row).map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table> */}

                <TableContainer>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {Object.keys(excelData[0]).map((header, index) => (
                          <TableCell
                            style={{
                              fontSize: "15px",
                              fontWeight: "600",
                              background: "ffd8d8",
                            }}
                            key={index}
                          >
                            {header}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {displayedData.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                          {Object.values(row).map((cell, cellIndex) => (
                            <TableCell
                              key={cellIndex}
                              style={{
                                border: "2px,solid,black",
                                background: "",
                              }}
                            >
                              {cell}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )}
          </div>
        </Box>
      </div>
      <TableComponent excelData={excelData} />



      
    </>
  );
};
export default Home;
