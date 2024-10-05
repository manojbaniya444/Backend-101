const Login = () => {
  const facebookAuthHandler = () => {
    window.open("http://localhost:8080/auth/facebook", "_self");
  };
  return (
    <div>
      <h3>Login page</h3>
      <div className="login-wrapper">
        <form>
          <input type="text" placeholder="username" />
          <input type="text" placeholder="password" />
          <button>Login</button>
        </form>
        <p>Login with your facebook account</p>
        <button onClick={facebookAuthHandler}>Facebook Login</button>
      </div>
    </div>
  );
};

export default Login;
