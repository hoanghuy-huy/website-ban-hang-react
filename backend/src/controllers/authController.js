import authService from "../services/authService"

class authController {

    async register(req, res) {
        try {
            const { email, phone, password } = req.body
            
            const data = await authService.registerNewUser(req.body)

            if(!email || !phone || password ) {
                return res.status(200).json({
                    EM: data.EM, // error message
                    EC: data.EC,
                    DT: ''
                })
            }

            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC,
                DT: ''
            })
        } catch (error) {
            return res.status(500).json({
                EM: 'Error form server',
                EC: -1,
                DT: ''
            })
        }
    }

    async login(req, res) {
        try {
            const { valueLogin, password } = req.body
            
            const data = await authService.handleLogin(req.body)

            res.cookie("token",data.DT.token, { httpOnly: true } );

            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC,
                DT: data.DT
            })
        } catch (error) {
            return res.status(500).json({
                EM: 'Error form server',
                EC: -1,
                DT: ''
            })
        }
    }

    async logout(req, res) {
        try {
            
            res.clearCookie('token')
            
            return res.status(200).json({
                EM: 'Logout Success', // error message
                EC: 0,
                DT: ''
            })
        } catch (error) {
            return res.status(500).json({
                EM: 'Error form server',
                EC: -1,
                DT: ''
            })
        }
    }

}


module.exports = new authController()