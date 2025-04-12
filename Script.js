document.getElementById('resultForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const classSelected = document.getElementById('class').value;
    const rollNumber = document.getElementById('rollNumber').value;
    
    if (classSelected && rollNumber) {
        fetchResult(classSelected, rollNumber);
    } else {
        alert("Please select a class and enter a roll number.");
    }
});

function fetchResult(classSelected, rollNumber) {
    fetch('https://www.knarlix.free.nf/Test/Result.json')
        .then(response => response.json())
        .then(data => {
            const classData = data[classSelected];
            const student = classData.find(student => student.roll_number === rollNumber);
            
            if (student) {
                displayResult(student);
                generatePDF(student);
            } else {
                alert("No data found for the given roll number.");
            }
        });
}

function displayResult(student) {
    const resultDiv = document.getElementById('resultData');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <h2>Result</h2>
        <p><strong>Name:</strong> ${student.name}</p>
        <p><strong>Roll Number:</strong> ${student.roll_number}</p>
        <p><strong>Total Marks:</strong> ${student.total_marks}</p>
        <p><strong>Status:</strong> ${student.result_status}</p>
    `;
}

function generatePDF(student) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text('Student Result', 20, 20);
    doc.text(`Name: ${student.name}`, 20, 30);
    doc.text(`Roll Number: ${student.roll_number}`, 20, 40);
    doc.text(`Total Marks: ${student.total_marks}`, 20, 50);
    doc.text(`Status: ${student.result_status}`, 20, 60);
    
    // Save the PDF
    doc.save(`${student.name}_Result.pdf`);
}
