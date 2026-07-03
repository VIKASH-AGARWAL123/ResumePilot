import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadResumePDF = (resume) => {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(22);
  doc.text("Optimized Resume", 15, y);

  y += 15;

  doc.setFontSize(18);
  doc.text("Professional Summary", 15, y);

  y += 8;

  doc.setFontSize(12);

  const summary = doc.splitTextToSize(resume.summary || "", 180);

  doc.text(summary, 15, y);

  y += summary.length * 7 + 10;

  autoTable(doc, {
    startY: y,

    head: [["Skills"]],

    body: resume.skills.map((skill) => [skill]),
  });

  y = doc.lastAutoTable.finalY + 10;

  autoTable(doc, {
    startY: y,

    head: [["ATS Keywords"]],

    body: resume.keywords.map((keyword) => [keyword]),
  });

  y = doc.lastAutoTable.finalY + 10;

  doc.setFontSize(18);
  doc.text("Projects", 15, y);

  y += 10;

  resume.projects.forEach((project) => {
    doc.setFontSize(14);

    doc.text(project.title, 15, y);

    y += 7;

    doc.setFontSize(11);

    const desc = doc.splitTextToSize(project.description, 180);

    doc.text(desc, 15, y);

    y += desc.length * 6 + 8;
  });

  doc.setFontSize(18);

  doc.text("Resume Tips", 15, y);

  y += 8;

  resume.tips.forEach((tip) => {
    doc.setFontSize(12);

    const tipText = doc.splitTextToSize("• " + tip, 180);

    doc.text(tipText, 15, y);

    y += tipText.length * 6;
  });

  doc.save("Optimized_Resume.pdf");
};
