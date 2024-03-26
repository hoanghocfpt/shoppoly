var jwt = require('jsonwebtoken')
var dotenv = require('dotenv')
dotenv.config()

const authenticateToken = (req, res, next) => {
    console.log(req.headers.authorization);
    // Lấy access token từ header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    // Nếu không có token, trả về lỗi 401 (Unauthorized)
    if (token == null) {
    return res.sendStatus(401)
    }

    // Nếu có token, giải mã token và xác thực
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // Nếu xảy ra lỗi hoặc token không hợp lệ, trả về lỗi 403 (Forbidden)
    if (err) {
        return res.sendStatus(403)
    }

    // Nếu token hợp lệ, tiếp tục xử lý yêu cầu
    req.user = user
    console.log(user);
    next()
    })
}

module.exports = authenticateToken