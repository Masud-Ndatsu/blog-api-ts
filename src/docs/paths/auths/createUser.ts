/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Create a new user
 *     operationId: createNewUser
 *     requestBody:
 *        required: true
 *        content:
 *           application/json:
 *               schema:
 *                  $ref: '#/components/schemas/CreateUserInput'
 *               example:
 *                  name: John Smith
 *                  email: johnsmith@example.com
 *                  password: johnsmith@01
 *     responses:
 *        "201":
 *           description: Request successful
 *           content:
 *             application/json:
 *                schema:
 *                   $ref: "#/components/schemas/CreateUserResponse"
 *                example:
 *                    _id: 64ca668d870809aa830af42f
 *                    name: John Smith
 *                    email: johnsmith1@example.com
 *                    password: $2b$10$esUQ1nzt/x5xp3af63hZQOj8KtFXW7L3ElwbZaKJSzImw7Fnk4yw2
 *
 *
 *
 *
 */
