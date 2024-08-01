import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Add from "./components/Add";
import { IncomeProvider } from "./components/IncomeContext";

ReactDOM.render(
  <React.StrictMode>
    <IncomeProvider>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/add" element={<Add />} />
        </Routes>
      </Router>
    </IncomeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
