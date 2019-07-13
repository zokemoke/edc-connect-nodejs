const serialport = require("serialport");
const createTable = require("data-table");
const edc = require("./edc-connect");

serialport.list((err, ports) => {
  if (err) {
    document.getElementById("error").textContent = err.message;
    return;
  } else {
    document.getElementById("error").textContent = "";
  }

  if (ports.length === 0) {
    log.info("No ports discovered");
    document.getElementById("error").textContent = "No ports discovered";
  }

  const headers = Object.keys(ports[0]);
  const table = createTable(headers);
  tableHTML = "";
  table.on("data", data => (tableHTML += data));
  table.on(
    "end",
    () => (document.getElementById("ports").innerHTML = tableHTML)
  );
  ports.forEach(port => table.write(port));
  table.end();
});

document.getElementById("edc-start").addEventListener("click", function(e) {
  edc.connectEdc();
});