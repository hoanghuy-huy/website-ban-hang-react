import userService from "../services/userService";
import db from "../models/index";
import userApiService from "../services/userApiService";


class userController {
  async renderUserPage(req, res) {
    try {
      const userList = await userService.getAllUser();

      return res.render("homepage.ejs", { userList });
    } catch (error) {
      console.log(error);
    }
  }

  async handleCreateNewUser(req, res) {
    try {
      let { email, username, password } = req.body;

      userService.createNewUser(email, password, username);

      return res.redirect("/user");
    } catch (error) {
      console.log(error);
    }
  }

  async handleDeleteUser(req, res) {
    try {
      let userId = req.body.id;

      userService.deleteUser(userId);

      return res.redirect("/user");
    } catch (error) {
      console.log(error);
    }
  }

  async getInformation(req, res) {
    try {
      let user = await  db.User.findOne(
        { 
          where: { id:1 },
          include:  db.Group,
          nest:true,
          raw:true
        },
      );
      
      let role = await db.Group.findOne({
        where:{ id: 1},
        attributes: ['name', 'description'],
        include: [
          { model: db.Role, attributes:["url"]}
        ],
        raw:true,
        nest:true
        
      })

      return console.log("check role", role);
    } catch (error) {
      console.log(error);
    }
  }


  async getAllUser(req, res) {
    try {
      let { page, limit } = req.query

      let data = await userApiService.handleGetAllUser(+page, +limit)


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

  async deleteUser (req, res) {
    try {
      let data = await userApiService.handleDeleteUser(req.body.id)


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

  async getAllGroup(req, res) {
    try {
      let data = await userApiService.handleGetGroupUser(+req.params.id)


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

  async createFunc(req, res) {
    try {
      console.log(req.body)
      let data = await userApiService.createNewUser(req.body)


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
  async getOneUser(req, res) {
    try {
      let data = await userApiService.getOneUser(req.params.id)

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
  
  async updateUser(req, res) {
    try {
      let data = await userApiService.handleUpdateUser(req.body)

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

  getAccount(req, res) {
    try {
      let token = req.token
      let data = req.user 
      res.status(200).json({
        EC: 0,
        EM: "Get account success",
        DT:{
          token,
          data
        }
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

module.exports = new userController();
