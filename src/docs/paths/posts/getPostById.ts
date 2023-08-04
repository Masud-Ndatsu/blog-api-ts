/**
 * @openapi
 * paths:
 *   /posts/{postId}:
 *      get:
 *        tags:
 *           - Post
 *        parameters:
 *           - in: path
 *             name: postId
 *             required: true
 *             schema:
 *                type: string
 *                description: Get existing post by postId
 *        responses:
 *             "200":
 *                 description: Request successful
 *
 *
 *
 */
