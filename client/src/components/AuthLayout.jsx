import "./../styles/Auth.css";

function AuthLayout({ children }) {
  return (
    <div className="auth-page">
      <div className="left-panel">
        <div className="brand">

          <div className="brand-logo">
            💼
          </div>

          <h1>JobVault</h1>

        </div>

        <h2>Save. Track. Succeed.</h2>

        <p>
          JobVault helps you save Internshala internships,
          track your applications and never miss an opportunity.
        </p>

        <div className="features">

          <div>✔ Save internships in one click</div>

          <div>✔ Track application status</div>

          <div>✔ Stay organized</div>

          <div>✔ Access from anywhere</div>

        </div>
      </div>

      <div className="right-panel">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;