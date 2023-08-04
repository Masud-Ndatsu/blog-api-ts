/**
 * @openapi
 * paths:
 *    /users/{userId}/posts:
 *         get:
 *           tags:
 *             - User
 *           parameters:
 *             - in: path
 *               name: userId
 *               required: true
 *               schema:
 *                  type: string
 *                  description: Get existing post by postId
 *           responses:
 *              "200":
 *                description: Ok
 *
 */
