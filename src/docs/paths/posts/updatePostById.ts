/**
 * @openapi
 * paths:
 *   /posts/{postId}:
 *      put:
 *        tags:
 *           - Post
 *        parameters:
 *           - in: path
 *             name: postId
 *             required: true
 *             schema:
 *                type: string
 *                description: Get existing post by postId
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
 *             "200":
 *                 description: Request successful
 *
 *
 *
 */
