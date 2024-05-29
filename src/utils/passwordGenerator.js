// Import the randomstring module
const randomstring = require("randomstring");

/**
 * Generates a random password with a specified length.
 *
 * @param {number} length - The desired length of the generated password.
 * If not provided, a default length of 12 characters will be used.
 * @returns {string} The generated password.
 * @throws {Error} If the length parameter is not a non-negative integer.
 */
function generatePassword(length = 12) {
  // Define the set of characters to use in the password
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

  // Validate the input length parameter
  if (typeof length !== "number" || length < 0) {
    throw new Error("Length must be a non-negative integer");
  }

  // Generate and return the password using the randomstring module
  try {
    return randomstring.generate({
      length,
      charset: characters,
    });
  } catch (error) {
    // Log the error message and throw an error
    console.error(error);
    throw new Error("Password generation failed");
  }
}

// Export the generatePassword function as the module's default export
module.exports = generatePassword;
