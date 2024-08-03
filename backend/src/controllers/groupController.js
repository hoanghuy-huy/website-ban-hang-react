import db from "../models/index";
import groupApiService from '../services/groupApiService'

class groupController {
    
  async getAllGroup(req, res) {
    try {
      let data = await groupApiService.handleGetAllGroup()


      return res.status(200).json({
          EM: data.EM,
          EC: data.EC,
          DT: data.DT
      })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'Error form server',
            EC: -1,
            DT: ''
        })
    }
  }
}

module.exports = new groupController();
