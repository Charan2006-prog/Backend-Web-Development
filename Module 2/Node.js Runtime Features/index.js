const fs = require('fs');
const path = require('path');

const INPUT = path.join(__dirname, 'sample-data.txt');
const OUTPUT = path.join(__dirname, 'sample-copy.txt');

function readWholeFile() {
  fs.readFile(INPUT, (err, data) => {
    if (err) {
      console.error('readFile error:', err);
      return;
    }

    console.log(`readFile: loaded ${data.length} bytes into memory at once`);
  });
}

function streamFile() {
  const readable = fs.createReadStream(INPUT);
  const writable = fs.createWriteStream(OUTPUT);

  writable.on('finish', () => {
    console.log('stream: finished copying via 64KB chunks (peak memory stays flat)');
  });

  readable.pipe(writable);

  readable.on('error', (err) => {
    console.error('stream read error:', err);
  });

  writable.on('error', (err) => {
    console.error('stream write error:', err);
  });
}

// PART 3: Explanation
// fs.readFile loads the entire file into memory at once, so memory usage grows with the file size.
// Streams process the file in smaller chunks instead of loading everything together.
// This keeps peak memory usage relatively flat, making streams more suitable for large files.

readWholeFile();
streamFile();

module.exports = { readWholeFile, streamFile, INPUT, OUTPUT };