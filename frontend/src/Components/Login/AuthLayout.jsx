import "../../styles/login/authLayout.css";
function AuthLayout({ title, children }) {
  return (
    <div className="login-page">
      <div className="center">
        <h2>{title}</h2>

        {children}
      </div>
    </div>
  );
}

export default AuthLayout;