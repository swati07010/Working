import React, { useState } from "react";
import "./Form.css";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Form = () => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [isCourseValid, setIsCourseValid] = useState(false);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    setIsNameValid(newName.trim() !== "");
  };

  const handleCourseChange = (e) => {
    const newCourse = e.target.value;
    setCourse(newCourse);
    setIsCourseValid(newCourse !== "");
  };

  const generatePDF = () => {
    if (!isNameValid || !isCourseValid) {
      alert("Please fill out both name and course before generating PDF.");
      return;
    }

    const doc = new jsPDF();

    const currentDate = new Date().toLocaleDateString();
    let template = "";

    if (course === "M.tech") {
      template = `Ref: B101\nName: ${name}\nCourse: ${course}\nDate of Offer (current date): ${currentDate}\nFee structure:\n`;
      // Add table for fee structure

      doc.autoTable({
        head: [["Year", "One time fee", "Tuition fee"]],
        body: [
          [1, 600, 260],
          [2, "-", 260],
        ],
        startY: 40,
        margin: { top: 30 },
        styles: {
          borderColor: [0, 0, 0], // Black  color
          lineWidth: 1, // 1px border width
          fillColor: [255, 255, 255], // White background color
          textColor: [0, 0, 0], // Black text color
        },
      });
    } else if (course === "B.tech") {
      template = `Ref: A101\nName: ${name}\nCourse: ${course}\nDate of Offer (current date): ${currentDate}\nFee structure:\n`;
      // Add table for fee structure
      doc.autoTable({
        head: [["Year", "One time fee", "Tuition fee"]],
        body: [
          [1, 500, 160],
          [2, "-", 160],
        ],
        startY: 40,
        margin: { top: 30 },
        styles: {
          borderColor: [0, 0, 0],
          lineWidth: 1,
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
        },
      });
    }

    // Add the text elements after the table
    doc.text(template, 10, 10);

    doc.save(`${name}_${course}.pdf`);
  };

  return (
    <div>
      <div className="Formpage">
        <div className="Formpage-name">
          Name:
          <label>
            <input
              className="Formpage-input"
              type="text"
              value={name}
              onChange={handleNameChange}
            />
          </label>
          {!isNameValid && <span className="error"></span>}
        </div>
        <div className="Formpage-course">
          Course:
          <label>
            <select
              className="Formpage-select"
              value={course}
              onChange={handleCourseChange}
            >
              <option value="">Select course</option>
              <option value="B.tech">B.tech</option>
              <option value="M.tech">M.tech</option>
            </select>
          </label>
          {!isCourseValid && <span className="error"></span>}
        </div>
        <div className="Formpage-button">
          <button className="Formpage-button-submit"> Submit</button>
          <button className="Formpage-button-generatePDF" onClick={generatePDF}>
            Generate PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
