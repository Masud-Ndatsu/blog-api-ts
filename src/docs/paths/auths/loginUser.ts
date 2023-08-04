/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: login existing user
 *     operationId: loginUser
 *     requestBody:
 *        required: true
 *        content:
 *           application/json:
 *               schema:
 *                  $ref: "#/components/schemas/CreateUserInput"
 *               example:
 *                  email: johnsmith@example.com
 *                  password: johnsmith@01
 *     responses:
 *        "200":
 *           description: Request successful
 *
 */
