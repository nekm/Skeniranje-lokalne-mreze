//////////////////////////////////////////
// mmarusevec 17.02.2021               //
//                                     //
//čitanje ip i mac adresa s lokalne    //
//mreže i upis mysql bazu
/////////////////////////////////////////
const { exec } = require("child_process");
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: "localhost",
  user: "node",
  password: "node",
  database: "node"
});

//var dd = new Date();
//var mm = dd.getMinutes();
//var nm = mm + 5;

//console.log(mm,nm);

exec("sudo arp-scan -l", (error, line, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    var podaci = line;
    var i = 0;
    var n = 0;
    var m = 0;
    var podatak = "";
    var raz = 0;
    var ip = "";
    var ostatak_podatak = "";
    var mac = "";
    var ostatak = "";
    var data  = "";
    while (i == 0) {
      n = podaci.search("192");
      m = podaci.search("(Unknown)");
      k = podaci.length;
      podatak = podaci.substring(n, m-1);
      raz = podatak.search("\t");
      ip = podatak.substring(0, raz);
      ostatak_podatak = podatak.substring(raz+1, 100);
      raz = ostatak_podatak.search("\t");
      mac = ostatak_podatak.substring(0, raz);
      ostatak = podaci.substring(m+9, k);
      data += "('" + ip + "', '" + mac + "')";
      i =  ostatak.search("192");
      if (i == 0) {
         data += ",";
      }
      podaci = ostatak;
    };
    data += "";
//    console.log(data);

    connection.connect(function(err) {
      var sql = "DELETE FROM node.t0_ip_mac ;";
      connection.query(sql,  function (err, result) {
        if (err) throw err;
//        console.log(result);
      });

      var sql = "insert into node.t0_ip_mac (`ip`,`mac`) VALUES" + data + " ;";
      connection.query(sql,  function (err, result) {
        if (err) throw err;
//        console.log(result);
      });

      var sql = "update node.t0_ip_name st INNER JOIN (SELECT m.ip, m.mac, m.createdAt FROM node.t0_ip_mac m WHERE EXISTS (select 1 from node.t0_ip_name n where m.mac = n.mac_address)) rez ON st.mac_address = rez.mac SET st.ip = rez.ip, st.updatedAt = rez.createdAt;";
      connection.query(sql,  function (err, result) {
        if (err) throw err;
//        console.log(result);
      });

      var sql = "INSERT INTO node.t0_ip_name (mac_address, name, ip, relevant, createdAt, updatedAt) SELECT m.mac, m.mac, m.ip, 0, m.createdAt, m.createdAt FROM node.t0_ip_mac m WHERE not EXISTS (select 1 from node.t0_ip_name n where m.mac = n.mac_address);";
      connection.query(sql,  function (err, result) {
        if (err) throw err;
//        console.log(result);
      });

    connection.end();
    });
});

