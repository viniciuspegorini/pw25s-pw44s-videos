import { ICategory, IProduct } from "@/commons/interfaces";
import CategoryService from "@/services/CategoryService";
import ProductService from "@/services/ProductService";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export function ProductFormPage() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IProduct>();
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setApiError("");
    const responseCategories = await CategoryService.findAll();
    if (responseCategories.status === 200) {
      setCategories(responseCategories.data);
    } else {
      setApiError("Falha ao carregar a lista de categorias!");
    }

    if (id) {
      const response = await ProductService.findById(Number(id));
      if (response.status === 200) {
        reset(response.data);
      } else {
        setApiError("Falha ao carregar o produto!");
      }
    }
    // } else {
    //   reset((previousForm) => {
    //     return {
    //       ...previousForm,
    //       category: { id: categories[0]?.id, name: "" },
    //     };
    //   });
    // }
  };

  const onSubmit = async (product: IProduct) => {
    const response = await ProductService.save(product);
    if (response.status === 201 || response.status === 200) {
      reset();
      navigate("/products");
    } else {
      setApiError("Falha ao salvar o produto!");
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
              {id ? "Editando o Produto" : "Novo Produto"}
            </h1>
          </div>
          <input type="hidden" {...register("id")} />
          <div className="form-floating mb-3">
            <input
              className={"form-control" + (errors.name ? " is-invalid" : "")}
              type="text"
              placeholder="Informe o nome do produto"
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
            <label htmlFor="name">Informe o nome do produto</label>
            {errors.name && (
              <div className="invalid-feedback">{errors.name.message}</div>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              className={"form-control" + (errors.price ? " is-invalid" : "")}
              type="text"
              placeholder="Informe o preço do produto"
              {...register("price", {
                required: "Campo obrigatório",
              })}
            />
            <label htmlFor="price">Informe o preço do produto</label>
            {errors.price && (
              <div className="invalid-feedback">{errors.price.message}</div>
            )}
          </div>
          <div className="form-floating mb-3">
            <textarea
              className={
                "form-control" + (errors.description ? " is-invalid" : "")
              }
              placeholder="Informe a descrição do produto"
              {...register("description", {
                required: "Campo obrigatório",
              })}
            />
            <label htmlFor="description">Informe a descrição do produto</label>
            {errors.description && (
              <div className="invalid-feedback">
                {errors.description.message}
              </div>
            )}
          </div>
          <div className="form-floating mb-3">
            <select
              className={
                "form-control" + (errors.category ? " is-invalid" : "")
              }
              {...register("category.id", {
                required: "Campo obrigatório",
              })}
            >
              <option value="">Selecione a categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <label htmlFor="category">Informe a categoria do produto</label>
            {errors.category && (
              <div className="invalid-feedback">{errors.category.message}</div>
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
