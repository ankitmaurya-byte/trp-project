/**
 * @swagger
 * /api/v1/users/findUser:
 *   get:
 *     summary: Find a user by authentication
 *     description: This endpoint retrieves user data, but only if the user is authenticated. The `isAuthenticated` middleware ensures that the request is coming from an authenticated user.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []  # Assuming you use Bearer token for authentication
 *     responses:
 *       200:
 *         description: A list of users found in the system
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The user's ID
 *                   username:
 *                     type: string
 *                     description: The user's username
 *                   email:
 *                     type: string
 *                     description: The user's email
 *       401:
 *         description: Unauthorized. Authentication required.
 *       500:
 *         description: Server error or failure in fetching users
 *     x-codeSamples:
 *       - lang: "curl"
 *         label: "Example Request"
 *         source: |
 *           curl -X 'GET' 'https://trp-project.onrender.com/api/v1/users/findUser' \
 *           -H 'Authorization: Bearer <your_token>'
 */
