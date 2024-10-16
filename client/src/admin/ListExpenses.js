import React, { Fragment, useEffect } from "react";
import Layout from "../core/Layout";
import { listExpenses, deleteExpenses } from "../actions/expensesActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const ListExpenses = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const expenseList = useSelector((state) => state.expenseList);
  const { loading, error, expenses } = expenseList;

  console.log(expenses);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const expensesDelete = useSelector((state) => state.expensesDelete);
  const { success: successDelete } = expensesDelete;

  useEffect(() => {
    if (userInfo) {
      dispatch(listExpenses());
    } else {
      navigate("/signin");
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    console.log(id);
    if (window.confirm("Are you sure")) {
      dispatch(deleteExpenses(id));
    }
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  const tableStyles = {
    width: "100%",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    borderCollapse: "separate",
    borderSpacing: "0 10px",
    margin: "20px 0",
    borderRadius: "8px",
  };

  const theadStyles = {
    backgroundColor: "#f8f9fa",
    fontWeight: "bold",
    textAlign: "center",
  };

  const rowStyles = {
    backgroundColor: "#fff",
    borderBottom: "1px solid #dee2e6",
    transition: "background-color 0.3s",
    textAlign: "center",
  };

  const emailStyles = {
    fontStyle: "italic",
    color: "#495057",
  };

  const buttonStyles = {
    borderRadius: "20px",
    padding: "3px 10px",
    fontSize: "12px",
    fontWeight: "bold",
  };

  const iconStyles = {
    fontSize: "18px",
    color: "#495057",
    cursor: "pointer",
    transition: "color 0.3s",
  };
  const centeredHeading = {
    display: "flex",
    justifyContent: "center", // Centers horizontally
    alignItems: "center", // Centers vertically (if there's height)
    textAlign: "center",
    height: "100px", // Optional: Adjust height as needed for vertical centering
    margin: "0 auto",
    fontWeight: "bold",
  };

  return (
    <Layout
      title="Profile"
      description="list treatment categories"
      className="container-fluid"
    >
      <h4>
        <Link to="/add-expenses">
          <button className="btn btn-primary btn-sm" style={buttonStyles}>
            Add Expense
          </button>
        </Link>
      </h4>
      <h2 className="mb-4" style={centeredHeading}>
        List Expenses
      </h2>
      {loading ? (
        showLoading()
      ) : error ? (
        showError()
      ) : expenses.length === 0 ? (
        <div className="row">
          <div className="col-sm-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">name</th>
                  <th scope="col">Department</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Description</th>
                  <th scope="col">From</th>
                  <th scope="col">To</th>
                  <th scope="col">Status</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">No Data</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-sm-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">name</th>
                  <th scope="col">Department</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Description</th>
                  <th scope="col">From</th>
                  <th scope="col">To</th>
                  <th scope="col">Status</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {expenses &&
                  expenses.map((expense, i) => (
                    <tr key={i}>
                      <Fragment>
                        <th scope="row">{expense._id}</th>
                        <td>{expense.name}</td>
                        <td>{expense.department.name}</td>
                        <td>{expense.amount}</td>
                        <td>{expense.description}</td>
                        <td>{moment(expense.fromDate).format("YYYY-MM-DD")}</td>
                        <td>{moment(expense.to).format("YYYY-MM-DD")}</td>
                        <td>
                          {expense.paid === "Paid" ? (
                            <button
                              type="button"
                              className="btn btn-success btn-sm"
                            >
                              {expense.paid}
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                            >
                              {expense.paid}
                            </button>
                          )}
                        </td>
                        <td>
                          <Link to={`/update-expenses/${expense._id}`}>
                            <i className="bi bi-pencil-square" />
                          </Link>
                        </td>
                        <td>
                          <i
                            className="bi bi-trash"
                            onClick={() => deleteHandler(expense._id)}
                          />
                        </td>
                      </Fragment>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ListExpenses;
