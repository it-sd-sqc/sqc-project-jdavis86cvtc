import { closeSync, openSync, readFileSync, writeFileSync } from 'node:fs'
import { parse } from 'node-html-parser'

const srcPath =
  'C:/Users/jaspe/Documents/CVTC/SQC/sqc-project-jdavis86cvtc/data/Economic-Consequences.html'
const dstPath =
  'C:/Users/jaspe/Documents/CVTC/SQC/sqc-project-jdavis86cvtc/docs/generated-schema.sql'
const chapterIds = [
  'CHAPTER_I',
  'CHAPTER_II',
  'CHAPTER_III',
  'CHAPTER_IV',
  'CHAPTER_V',
  'CHAPTER_VI',
  'CHAPTER_VII'
]

const sqlHeader = `\\encoding UTF8

DROP TABLE IF EXISTS chapters;

CREATE TABLE chapters (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL
);

INSERT INTO chapters (title, body) VALUES
`

// Utility functions
const extractTitle = function (root, id) {
  const titleElement = root.querySelector(`#${id} h2 span.smcap.main`)
  if (titleElement) {
    const title = titleElement.text
    return title
  } else {
    return null
  }
}

const extractBody = function (root, id, pruneChildrenSelector) {
  const bodyNode = root.querySelector(`#${id}`)
  if (pruneChildrenSelector) {
    const children = bodyNode.querySelectorAll(pruneChildrenSelector)
    children.forEach(child => {
      child.remove()
    })
  }

  // The <img> tags point to the wrong directory, so we
  // need to change them here.
  bodyNode.querySelectorAll('img').forEach(image => {
    const oldSrc = image.getAttribute('src')
    const oldSrcTokens = oldSrc.split('/')
    const newSrc = `/images/book/${oldSrcTokens[oldSrcTokens.length - 1]}`
    image.setAttribute('src', newSrc)
  })

  // Return HTML with the line endings normalized to Unix.
  bodyNode.innerHTML = bodyNode.innerHTML.replaceAll('\r\n', '\n')
  bodyNode.innerHTML = bodyNode.innerHTML.trim()
  bodyNode.innerHTML = bodyNode.innerHTML.replace(/'/g, '’')
  return bodyNode
}

// Conversion
const src = readFileSync(srcPath, 'utf8')
const domRoot = parse(src)

const chapters = []

chapterIds.forEach(id => {
  // Extract the title
  const title = extractTitle(domRoot, id)
  const body = extractBody(domRoot, id)
  chapters.push({
    title,
    body
  })
})

// Output the data as SQL.
const fd = openSync(dstPath, 'w')
writeFileSync(fd, sqlHeader)
writeFileSync(fd, `('${chapters[0].title}', '${chapters[0].body}')`)
chapters.slice(1).forEach(data => {
  const value = `,\n('${data.title}', '${data.body}')`
  writeFileSync(fd, value)
})
writeFileSync(fd, ';\n\n')

closeSync(fd)
