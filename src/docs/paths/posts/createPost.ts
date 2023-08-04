/**
 * @openapi
 * paths:
 *  /posts:
 *      post:
 *        tags:
 *         - Post
 *        summary: Add a new post
 *        operationId: createNewPost
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                    $ref: '#/components/schemas/CreatePostInput'
 *               example:
 *                 title: Why love hurts?
 *                 content: Because love is beautiful and hurtful at the same time.
 *        responses:
 *           "201":
 *              description: Request successful
 *              content:
 *                  application/json:
 *                       schema:
 *                           $ref: "#/components/schemas/CreatePostResponse"
 *                       example:
 *                           _id: 64c61f2e9766dd159e38a8dc
 *                           title: The is second,
 *                           content: This is the second content,
 *                           author: 64c61f2e9766dd159e38a8dc
 *
 *
 *
 */
