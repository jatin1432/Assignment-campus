export default function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    window.location.href = "https://assignment-campus.onrender.com/api/auth/google";
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
    >
      Sign in with Google
    </button>
  );
}
