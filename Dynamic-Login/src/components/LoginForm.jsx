import { useState } from "react";

function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const validateForm = () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }

    if (!password) {
      return "Password cannot be empty";
    }

    return null;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    try {

      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      setSuccess("Login successful!");

      setEmail("");
      setPassword("");

    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (

    <form onSubmit={handleSubmit}>

      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <p style={{ color: "red" }}>{error}</p>
      <p style={{ color: "green" }}>{success}</p>

    </form>
  );
}

export default LoginForm;