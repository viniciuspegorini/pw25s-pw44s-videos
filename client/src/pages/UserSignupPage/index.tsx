import { ChangeEvent, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "@/services/AuthService";
import { IUserSigup } from "@/commons/interfaces";
import { ButtonWithProgress } from "@/components/ButtonWithProgress";
import { Input } from "@/components/Input";

export function UserSignupPage() {
  const [form, setForm] = useState({
    displayName: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    displayName: "",
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

    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setApiError("");
  };

  const onClickSignup = async () => {
    setPendingApiCall(true);

    event?.preventDefault();
    const user: IUserSigup = {
      displayName: form.displayName,
      username: form.username,
      password: form.password,
    };

    const response = await AuthService.signup(user);
    if (response.status === 200 || response.status === 201) {
      setApiSuccess("Cadastrado com sucesso!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else {
      setApiError("Falha ao cadastrar o usuário!");
      if (response.data.validationErrors) {
        setErrors(response.data.validationErrors);
      }
      setPendingApiCall(false);
    }
  };

  return (
    <>
      <main className="form-signup w-100 m-auto">
        <form>
          <div className="text-center">
            <h1 className="h3 mb-3 fw-normal">Novo usuário</h1>
          </div>
          <div className="form-floating">
            <Input
              id="displayName"
              name="displayName"
              type="text"
              placeholder="Informe o seu nome"
              className="form-control"
              onChange={onChange}
              value={form.displayName}
              hasError={errors.displayName ? true : false}
              error={errors.displayName}
              label="Informe o seu nome"
            />
          </div>
          <div className="form-floating">
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Informe o seu usuário"
              className="form-control"
              onChange={onChange}
              value={form.username}
              hasError={errors.username ? true : false}
              error={errors.username}
              label="Informe o seu usuário"
            />
          </div>
          <div className="form-floating">
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="******"
              className="form-control"
              onChange={onChange}
              value={form.password}
              hasError={errors.password ? true : false}
              error={errors.password}
              label="Informe a sua senha"
            />
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
            onClick={onClickSignup}
            disabled={pendingApiCall}
            pendingApiCall={pendingApiCall}
            text="Cadastrar"
          />
        </form>
        <div className="text-center">
          <Link to="/login">Ir para tela de login</Link>
        </div>
      </main>
    </>
  );
}
