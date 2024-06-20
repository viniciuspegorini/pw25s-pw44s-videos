import { ChangeEvent, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { IUserLogin } from "@/commons/interfaces";
import AuthService from "@/services/AuthService";
import { ButtonWithProgress } from "@/components/ButtonWithProgress";

export function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setApiError("");
  };

  const onClickLogin = async () => {
    setPendingApiCall(true);
    event?.preventDefault();
    const user: IUserLogin = {
      username: form.username,
      password: form.password,
    };

    const response = await AuthService.login(user);
    if (response.status === 200) {
      setApiSuccess("Autenticado com sucesso!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      setPendingApiCall(false);
      setApiError("Falha ao autenticar o usuário!");
    }
  };

  return (
    <>
      <main className="form-signup w-100 m-auto">
        <form>
          <div className="text-center">
            <h1 className="h3 mb-3 fw-normal">Login</h1>
          </div>
          <div className="form-floating">
            <input
              id="username"
              name="username"
              className="form-control"
              type="text"
              placeholder="Informe o usuário"
              onChange={onChange}
            />
            <label htmlFor="username">Informe o usuário</label>
          </div>
          <div className="form-floating">
            <input
              id="password"
              name="password"
              className="form-control"
              type="password"
              placeholder="Informe a senha"
              onChange={onChange}
            />
            <label htmlFor="password">Informe a senha</label>
          </div>

          {apiError && (
            <div className="col-12 mb-3">
              <div className="alert alert-danger">{apiError}</div>
            </div>
          )}
          {apiSuccess && (
            <div className="col-12 mb-3">
              <div className="alert alert-success">{apiSuccess}</div>
            </div>
          )}
          
          <ButtonWithProgress 
            onClick={onClickLogin}
            disabled={pendingApiCall}
            pendingApiCall={pendingApiCall}
            text="Login"
          />         
        </form>
        <div className="text-center">
          <Link to="/signup">Deseja cadastrar-se</Link>
        </div>
      </main>
    </>
  );
}
