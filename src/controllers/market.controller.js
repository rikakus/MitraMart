const { success, failed } = require("../helpers/response");
const marketModel = require("../models/market.model");
const { v4: uuidv4 } = require("uuid");
const {moment} = require("moment");
const date = require("../helpers/date")

module.exports = {
  list: async(req, res) => {
    try {
      const str = ''
      const search = req.query.search ? req.query.search : str;
      const {page, limit} = req.query
      const pageValue = page? Number(page): 1
      const limitValue = limit? Number(limit): 6
      const offset = (pageValue - 1)*limitValue
      const allData = await marketModel.allData()
      const totalData = Number(allData.rows[0].total)
      marketModel
        .listAll(search,limitValue,offset)
        .then((result) => {
          const pagination = {
            currentPage: pageValue,
            dataPerPage: limitValue,
            totalPage: Math.ceil(totalData/limitValue)
          }
          if(result.rowCount == 0){
            return failed(res, 'failed to get data', "failed", "data not found")
          }
          success(res, result.rows, "success", "success to get data",pagination)
        })
        .catch((err) => {
          failed(res, err.message, "failed", "failed to get data")
        });
    } catch (err) {
      failed(res, err.message, "failed", "failed to get data")
    }
  },
  detail: (req, res) => {
    try {
      const id = req.params.id;
      // const check = parseInt(id);
      marketModel
        .detailGoods(id)
        .then((result) => {
          if(result.rowCount == 0){
            return failed(res, 'failed to get data', "failed", "data not found")
          }
          success(res, result.rows[0], "success", "success to get detail")
        })
        .catch((err) => {
          failed(res, err.message, "failed", "failed to get detail")
        });
    } catch (err) {
      failed(res, err.message, "failed", "failed to get detail")
    }
  },
  input: async(req, res) => {
    try {
      const body = req.body;
      const { nama, kodeBar, stok, harga, berat, exp } = body;
      // if ( !title || !ingredients || !video || !date || !idUser) {
      //   throw Error("parameter cannot blank");
      // }
      marketModel
        .inputGoods({id:uuidv4(), nama, kodeBar, stok, harga, berat, tanggalMasuk: date(), tanggalUpdate: date(), exp})
        .then((result) => {
          success(res, result.command, "success", "success to input")
        })
        .catch((err) => {
          failed(res, err.message, "failed", "failed to input")
        });
    } catch (err) {
      failed(res, err.message, "failed", "failed to input")
    }
  },
  update: async(req, res) => {
    try {
      const body = req.body;
      const id = req.params.id;
      const { nama, kodeBar, stok, harga, berat, tanggalMasuk, exp } = body;
      // if ( !title || !ingredients || !video || !date || !idUser) {
      //   throw Error("parameter cannot blank");
      // }
      marketModel
        .updateGoods({id, nama, kodeBar, stok, harga, berat, tanggalMasuk, tanggalUpdate: date(), exp})
        .then((result) => {
          success(res, result.command, "success", "success to input")
        })
        .catch((err) => {
          failed(res, err.message, "failed", "failed to input")
        });
    } catch (err) {
      failed(res, err.message, "failed", "failed to input")
    }
  },
  deleted: async(req, res) => {
    try {
      const id = req.params.id;
      // const check = parseInt(id);
      // const getData = await marketModel.detailGoods(id)
      // const checkId = getData.rows[0].user_id
      // if (isNaN(check) == true) {
      //   throw Error("input must be a number");
      // }else if(req.APP_DATA.tokenDecode.id != checkId){
      //   return failed(res, 'forbidden access', "failed", "failed to input recipe")
      // }
      marketModel
        .deleteGoods(id)
        .then((result) => {
          success(res, result.command, "success", "success to delete")
        })
        .catch((err) => {
          failed(res, err.message, "failed", "failed to delete")
        });
    } catch (err) {
      failed(res, err.message, "failed", "failed to delete")
    }
  },
};
