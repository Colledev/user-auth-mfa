const express = require("express");
const mfaController = require("../controllers/mfaController");
const { authenticateToken } = require("../middleware/authentication");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: MFA
 *   description: MFA management routes
 */

/**
 * @swagger
 * /mfa/activate:
 *   post:
 *     summary: Activate MFA for the user
 *     tags: [MFA]
 *     responses:
 *       200:
 *         description: MFA activated successfully
 *       500:
 *         description: Internal server error
 */
router.post("/activate", authenticateToken, mfaController.activateMfa);

/**
 * @swagger
 * /mfa/verify:
 *   post:
 *     summary: Verify user's MFA token
 *     tags: [MFA]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mfaToken
 *             properties:
 *               mfaToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: MFA verified successfully
 *       401:
 *         description: Invalid MFA token
 */
router.post("/verify", authenticateToken, mfaController.verifyMfa);

module.exports = router;
