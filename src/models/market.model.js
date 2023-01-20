const db = require('../config/db');

const marketModel = {
  allData: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) AS total FROM market`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  inputGoods: (data) => {
    return new Promise((resolve, reject) => {
        const {id, nama, kodeBar, stok, harga, berat, tanggalMasuk, tanggalUpdate, exp} = data
        db.query(
            `INSERT INTO market( id, nama, kode_bar, stok, harga, berat, tanggal_masuk, tanggal_update, exp) 
            VALUES ('${id}', '${nama}','${kodeBar}', ${stok}, '${harga}','${berat}','${tanggalMasuk}','${tanggalUpdate}','${exp}')`,
             (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  updateGoods: (data) => {
    return new Promise((resolve, reject) => {
        const {id, nama, kodeBar, stok, harga, berat, tanggalMasuk, tanggalUpdate, exp} = data
        db.query(
          `UPDATE market SET nama='${nama}', kode_bar='${kodeBar}',stok='${stok}'
          , harga='${harga}', berat='${berat}', tanggal_masuk='${tanggalMasuk}', tanggal_update='${tanggalUpdate}', exp='${exp}' WHERE id='${id}'`,
             (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
   getDataNama: (nama) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM market WHERE nama='${nama}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  getDataKodeBar: (kodeBar) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM market WHERE kode_bar='${kodeBar}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  listAll: (search,limit,offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM market WHERE nama LIKE '%${search}%' LIMIT ${limit} OFFSET ${offset}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  detailGoods: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM market WHERE id='${id}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  deleteGoods: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM market WHERE id='${id}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
}

module.exports = marketModel