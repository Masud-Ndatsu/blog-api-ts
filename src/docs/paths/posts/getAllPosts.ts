/**
 * @openapi
 * paths:
 *  /posts:
 *   get:
 *     tags:
 *       - Post
 *     summary: Get All Posts
 *     description: Get all existing posts
 *     operationId: getAllPosts
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *            application/json:
 *                  schema:
 *                       type: array
 *                       items:
 *                          $ref: "#/components/schemas/CreatePostResponse"
 *                  example:
 *                    - _id: 64c61f2e9766dd159e38a8dc
 *                      title: The is second,
 *                      content: This is the second content,
 *                      author: 64c61f2e9766dd159e38a8dc
 *                    - _id: 64c61f2e9766dd159e38a8dc
 *                      title: The is second,
 *                      content: This is the second content,
 *                      author: 64c61f2e9766dd159e38a8dc
 *
 *
 */
