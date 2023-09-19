/***********************************************************
NOTE: If Git reports a fatal error saying either "LF will be
replaced by CRLF" or "CRLF would be replaced by LF", then
the line endings in the specified file (such as
"data/book.html") don't match your local Git repository.
You'll need to change the line endings in the specified file
to CRLF (carriage-return \r, line feed \n) or LF (line feed,
\n) in your text editor and resave the file.

This happens because Windows uses CRLF and macOS/Linux use
LF to indicate the end of the file, and Git doesn't want to
accidentally corrupt a binary file mislabelled as a text
file.
***********************************************************/

// Dependencies ////////////////////////////////////////////
import {strict as assert} from 'node:assert';
import {closeSync, openSync, readFileSync, writeFileSync} from 'node:fs';
import {parse} from 'node-html-parser';


// Configuration ///////////////////////////////////////////
const srcPath = 'C:/Users/jaspe/Documents/CVTC/SQC/sqc-project-jdavis86cvtc/data/Economic-Consequences.html';
const dstPath = 'C:/Users/jaspe/Documents/CVTC/SQC/sqc-project-jdavis86cvtc/docs/generated-schema.sql';
const chapterIds = [
  'introduction',
  'ch1',
  'ch2',
  'ch3',
  'ch4',
  'ch5',
  'ch6',
  'ch7',
];

const problemChapterId = 'ch8';

const sqlHeader = `\\encoding UTF8

DROP TABLE IF EXISTS chapters;
DROP TABLE IF EXISTS cost;

CREATE TABLE chapters (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL
);

CREATE TABLE cost (
  id SERIAL PRIMARY KEY,
  supplier TEXT NOT NULL,
  amount TEXT NOT NULL
);

INSERT INTO chapters (title, body) VALUES
`;

const insertProblemTypesSql = `INSERT INTO cost(supplier, amount) VALUES
`;

const insertProblemsSql = `INSERT INTO problems (problem_type_id,  number, to_play, problem, solutions) VALUES
`;

const gobanConfig = {
  size: 19,
  theme: 'classic',
  coordSystem: 'A1',
  noMargin: false,
  hideMargin: false,
};

// Utility functions ///////////////////////////////////////
const extractTitle = function (root) {
  const title = root.querySelector (`h1`).text;
  return title;
};

const extractBody = function (root, id, pruneChildrenSelector) {
  const bodyNode = root.querySelector (`body`);

  if (pruneChildrenSelector) {
    const children = bodyNode.querySelectorAll (pruneChildrenSelector);
    children.forEach (child => {
      child.remove ();
    });
  }

  // The <img> tags point to the wrong directory, so we
  // need to change them here.
  bodyNode.querySelectorAll ('img').forEach (image => {
    const oldSrc = image.getAttribute ('src');
    const oldSrcTokens = oldSrc.split ('/');
    const newSrc = `/images/book/${oldSrcTokens[oldSrcTokens.length - 1]}`;
    image.setAttribute ('src', newSrc);
  });

  // Return HTML with the line endings normalized to Unix.
  bodyNode.innerHTML = bodyNode.innerHTML.replaceAll ('\r\n', '\n');
  bodyNode.innerHTML = bodyNode.innerHTML.trim ();
  return bodyNode;
};


// Conversion //////////////////////////////////////////////
const src = readFileSync (srcPath, 'utf8');
const domRoot = parse (src);


const chapters = [];

chapterIds.forEach (id => {
  // Extract the title
  const title = extractTitle (domRoot); // Removed 'id' argument as it's not needed
  const body = extractBody (domRoot, id);

  chapters.push ({
    title,
    body,
  });
});


// Extract the problems…
const table = domRoot.querySelector('table');


// Extract and process data from table rows and cells.
const tableRows = table.querySelectorAll ('tr');
tableRows.forEach (row => {
  const cells = row.querySelectorAll ('td');
  if (cells.length === 4) {
    const country = cells[0].text;
    const financialFigure = parseFloat (cells[2].text.replace (/[^0-9.]/g, ''));
    // Process and use this data as needed, e.g., generate SQL statements.
  }
});

// Output the data as SQL.
const fd = openSync (dstPath, 'w');
writeFileSync (fd, sqlHeader);
writeFileSync (fd, `('${chapters[0].title}', '${chapters[0].body}')`);
chapters.slice (1).forEach (data => {
  const value = `,\n('${data.title}', '${data.body}')`;
  writeFileSync (fd, value);
});
writeFileSync (fd, ';\n\n');

closeSync (fd);

