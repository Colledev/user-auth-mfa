const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (user) => {
    return jwt.sign(user, SECRET_KEY, { expiresIn: "1h" });
};

const generateMfaToken = (user) => {
    return jwt.sign({ id: user.id, mfa: true }, SECRET_KEY, {
        expiresIn: "5m",
    });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        console.error("Error verifying token: ", error);
        return null;
    }
};

const authenticateToken = async (req, res, next) => {
    try {
        const tokenHeader = req.headers["authorization"];

        if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                error: "Unauthorized",
                message: "Token not found or invalid format",
            });
        }

        const token = tokenHeader.split(" ")[1];
        const payload = verifyToken(token);

        if (!payload || !payload.id) {
            return res.status(401).json({
                error: "Unauthorized",
                message: "Invalid token payload",
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: payload.id,
            },
        });

        if (!user) {
            return res.status(401).json({
                error: "Unauthorized",
                message: "User not found",
            });
        }

        req.loggedUser = user;
        next();
    } catch (error) {
        return res.status(401).json({
            error: "Unauthorized",
            message: error.message,
        });
    }
};

module.exports = {
    generateToken,
    generateMfaToken,
    verifyToken,
    authenticateToken,
};
