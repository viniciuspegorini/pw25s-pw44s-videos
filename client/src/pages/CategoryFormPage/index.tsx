import { ICategory } from "@/commons/interfaces";
import CategoryService from "@/services/CategoryService";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export function CategoryFormPage() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ICategory>();
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      loadData(Number(id));
    }
  }, []);

  const loadData = async (id: number) => {
    const response = await CategoryService.findById(id);
    if (response.status === 200) {
      reset(response.data);
    } else {
      setApiError("Falha ao carregar a categoria!");
    }
  };

  const onSubmit = async (category: ICategory) => {
    const response = await CategoryService.save(category);
    if (response.status === 201 || response.status === 200) {
      reset();
      navigate("/categories");
    } else {
      setApiError("Falha ao salvar a categoria!");
    }
  };

  return (
    <>
      <main className="container row justify-content-center">
        <form
          className="form-floating col-md-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-center">
            <h1 className="h3 mb-3 fw-normal">
              {id ? "Editando Categoria" : "Nova Categoria"}
            </h1>
          </div>
          <div className="form-floating mb-3">
            <input type="hidden" {...register("id")} />
            <input
              className={"form-control" + (errors.name ? " is-invalid" : "")}
              type="text"
              placeholder="Informe o nome da categoria"
              {...register("name", {
                required: "Campo obrigatório",
                minLength: {
                  value: 2,
                  message: "Campo deve ter no mínimo 2 caracteres",
                },
                maxLength: {
                  value: 100,
                  message: "Campo deve ter no máximo 100 caracteres",
                },
              })}
            />
            <label htmlFor="name">Informe o nome da categoria</label>
            {errors.name && (
              <div className="invalid-feedback">{errors.name.message}</div>
            )}
          </div>
          {apiError && <div className="alert alert-danger">{apiError}</div>}
          <button
            type="submit"
            className="w-100 btn btn-lg btn-primary mb-3"
            disabled={isSubmitting}
          >
            Salvar
          </button>
        </form>
      </main>
    </>
  );
}
