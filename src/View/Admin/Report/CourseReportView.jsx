import * as React from "react";
import { connect } from "react-redux";
import { FetchCoursereportRequest } from '../../../actions/Admin/CourseReportAction';
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { alpha } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import PreviewIcon from "@mui/icons-material/Preview";
import { Col } from "react-bootstrap";
import { Button } from "bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ReportSkeleton from '../../../components/Loading/Reportskeleton';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const CourseReportView = ({ FetchCoursereportRequest, coursereport }) => {

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    FetchCoursereportRequest();
  }, [FetchCoursereportRequest]);

  //Pdf 
  const pdfRef = React.useRef();
  if (loading || coursereport.length === 0) {
    return <div>
      <ReportSkeleton />
    </div>;
  }
  //Rows for the table
  const rows = coursereport;

  //Descending function
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  //Comparator
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  //Stable Sort for table
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  //Header for table
  const headCells = [
    {
      id: "sno",
      numeric: true,
      disablePadding: false,
      label: "S.No",
    },
    {
      id: "coursename",
      numeric: false,
      disablePadding: false,
      label: "Course Name",
    },
    {
      id: "coursecategory",
      numeric: false,
      disablePadding: false,
      label: "Course Category",
    },
    {
      id: "courselevels",
      numeric: false,
      disablePadding: false,
      label: "Course Level",
    },
    {
      id: "createdate",
      numeric: true,
      disablePadding: true,
      label: "Create Date",
    },
    {
      id: "modifydate",
      numeric: true,
      disablePadding: true,
      label: "Modify Date",
    },
  ];

  // today date
  let today = new Date();
  today.setDate(today.getDate());
  let month = String(today.getMonth() + 1).padStart(2, '0');
  let day = String(today.getDate()).padStart(2, '0');
  let Dates = day + '-' + month + '-' + today.getFullYear();

  const ExportPdf = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.text('Course Report', 75, 12);
      pdf.setFontSize(5);
      pdf.text("Project Name - LXP " + today.toLocaleDateString() + " " + today.toLocaleTimeString(), 2, 15);
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`CourseReports_${Dates}.pdf`);
    })
  };

  const ExportExcel=()=>{
    const selectedFields = rows.map(row => ({
      title: row.title,
      category: row.category,
      level: row.level,
      createdAt:row.createdAt.split('T')[0].split('-').reverse().join('-') + ' ' + row.createdAt.split('T')[1],
      modifiedAt:row.modifiedAt===null ?"Not Modified":row.modifiedAt.split(' ')[0].split('-').reverse().join('-') + ' ' + row.modifiedAt.split(' ')[1],
    }));
    const worksheet = XLSX.utils.json_to_sheet(selectedFields);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
    saveAs(blob,`CourseReports_${Dates}.xlsx`);
  };

  //Component for Head in Table
  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead style={{ backgroundColor: "#23275c" }}>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "left" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
              style={{ color: "white" }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
                style={{ color: "white" }}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  //Props for EnhancedHead Table
  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  //Table and props for toolbar

  function EnhancedTableToolbar(props) {
    const { numSelected } = props;
    return (
      <Toolbar
        sx={{
          mt: 5,
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <>
          </>
        )}
      </Toolbar>
    );
  }

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  //Table for the Overall Component

  function EnhancedTable() {
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("S.no");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const dense = true;
    const [rowsPerPage, setRowsPerPage] = React.useState(
      parseInt(localStorage.getItem('CourserowsPerPage'), 10) || 5
    );

    const [searchTerm, setSearchTerm] = React.useState("");
    const [filteredUser, setFilteredUser] = React.useState([]);

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelected = rows.map((n) => n.id);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };


    const handleChangeRowsPerPage = (event) => {
      const newRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(newRowsPerPage);
      localStorage.setItem('CourserowsPerPage', newRowsPerPage); // Store the value in localStorage
      setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    useEffect(() => {
      setFilteredUser(
        visibleRows.filter((row) =>
          Object.values(row).some((value) =>
            value !== null && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      );
    });

    const visibleRows = React.useMemo(
      () =>
        stableSort(rows, getComparator(order, orderBy)).slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        ),
      [order, orderBy, page, rowsPerPage]
    );

    return (
      <Box sx={{ width: "100%" }}>
        <Paper
          sx={{
            width: "100%",
            mb: 2,
          }}
        >
          <EnhancedTableToolbar numSelected={selected.length} />
          <div style={{ display: 'flex', padding: "10px" }}>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                style={{ width: "30vw" }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
                <DropdownButton
      id="dropdown-basic-button"
      title={
        <>
          Download Report <ArrowDownwardIcon />
        </>
      }
      variant="success"
      style={{ marginLeft: '48%' }}
    >
      <Dropdown.Item onClick={ExportPdf}>Pdf Format</Dropdown.Item>
      <Dropdown.Item onClick={ExportExcel}>Excel Format</Dropdown.Item>
    </DropdownButton>
          </div>
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h4"
            id="tableTitle"
            component="div"
            align="center"
            style={{ marginBottom: "15px" }}
          >
            Course Report
          </Typography>
          <div id="learnersreport">
            <TableContainer ref={pdfRef}>

              <Table
                sx={{ width: '100%' }}
                aria-labelledby="tableTitle"
                size={dense ? "medium" : "medium"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {filteredUser.map((row, index) => {
                    const isItemSelected = isSelected(row.id);

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.index}
                        selected={isItemSelected}
                        sx={{ cursor: "pointer", textDecoration: "none" }}
                        component={Link}
                        to={'/coursecontent/' + row.courseId}
                      >
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell
                          component="th"
                          id={row.id}
                          scope="row"
                          align="left"
                          padding="none"
                        >
                          {row.title}
                        </TableCell>
                        <TableCell align="left">{row.category}</TableCell>
                        <TableCell align="left">
                          {/* {row.lastLogin.replace("T", " ")} */}
                          {row.level}
                        </TableCell>
                        <TableCell align="left">
                          {row.createdAt.split('T')[0].split('-').reverse().join('-') + ' ' + row.createdAt.split('T')[1]}
                        </TableCell>
                        <TableCell align="left">

                          {/* {row.modifiedAt} */}
                          {
                            row.modifiedAt===null ?<span style={{color:'green'}}>Not Modified</span>:row.modifiedAt.split(' ')[0].split('-').reverse().join('-') + ' ' + row.modifiedAt.split(' ')[1]
                          }
                          {/* {row.modifiedAt.split(' ')[0].split('-').reverse().join('-') + ' ' + row.modifiedAt.split(' ')[1]} */}
                        </TableCell>

                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <TablePagination
            style={{ color: 'black' }}
            rowsPerPageOptions={[
              { label: '5 ', value: 5 },
              { label: '10 ', value: 10 },
              { label: '25 ', value: 25 },
              { label: 'All', value: rows.length },
            ]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

        </Paper>
      </Box>
    );
  }

  return (
    <>
      <EnhancedTable />
    </>
  );
};

const mapStateToProps = (state) => ({
  coursereport: state.coursereport.coursereport,
});

const mapDispatchToProps = (dispatch) => ({
  FetchCoursereportRequest: () => dispatch(FetchCoursereportRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseReportView);