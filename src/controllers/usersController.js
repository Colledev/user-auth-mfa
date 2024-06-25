const bcrypt = require("bcryptjs");
const { generateToken } = require("../middleware/authentication");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createUserController = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginController = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Email and password are required" });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user);
        return res.status(200).json({ token });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const editUserController = async (req, res) => {
    try {
        const loggedUserId = req.loggedUser.id;
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUserWithEmail = await prisma.user.findFirst({
            where: {
                email,
                id: { not: loggedUserId },
            },
        });

        if (existingUserWithEmail) {
            return res.status(400).json({ error: "Email already in use" });
        }

        const updatedUser = await prisma.user.update({
            where: { id: loggedUserId },
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

module.exports = {
    createUserController,
    loginController,
    editUserController,
};
