const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const activateMfa = async (req, res) => {
    if (!req.loggedUser || !req.loggedUser.id) {
        return res.status(400).json({
            message: "User is not logged in or invalid request",
        });
    }
    const loggedUserId = req.loggedUser.id;

    try {
        const user = await prisma.user.findUnique({
            where: { id: loggedUserId },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const secret = speakeasy.generateSecret({
            length: 20,
        });
        const otpauthUrl = secret.otpauth_url;

        await prisma.user.update({
            where: { id: loggedUserId },
            data: {
                mfaSecret: secret.base32,
                mfaEnabled: true,
            },
        });

        qrcode.toDataURL(otpauthUrl, (err, dataUrl) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: "Internal server error" });
            }
            return res.status(200).json({ qrCode: dataUrl });
        });
    } catch (error) {
        return res.status(500).json({ message: "Error generating QR Code" });
    }
};

const verifyMfa = async (req, res) => {
    const { mfaToken } = req.body;

    if (!mfaToken) {
        return res.status(400).json({ message: "MFA token missing" });
    }

    try {
        const user = req.loggedUser;

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const verified = speakeasy.totp.verify({
            secret: user.mfaSecret,
            encoding: "base32",
            token: mfaToken,
        });

        if (verified) {
            return res
                .status(200)
                .json({ message: "MFA successfully verified" });
        } else {
            return res.status(401).json({ message: "Invalid MFA token" });
        }
    } catch (error) {
        console.error("Error verifying MFA:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { activateMfa, verifyMfa };
