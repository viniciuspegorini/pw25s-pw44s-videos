import { ICategory } from "@/commons/interfaces";
import CategoryService from "@/services/CategoryService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function CategoryListPage() {
  const [data, setData] = useState<ICategory[]>([]);
  const [apiError, setApiError] = useState("");
  const [apiRemoveSuccess, setApiRemoveSuccess] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await CategoryService.findAll();
    if (response.status === 200) {
      setData(response.data);
    } else {
      setApiError("Falha ao carregar a lista de categorias!");
    }
  };

  const onClickRemove = async (id?: number) => {
    if (id) {
      const response = await CategoryService.remove(id);
      if (response.status === 204 || response.status === 200) {
        // await loadData();
        setData(data.filter((category) => category.id !== id));
        setApiRemoveSuccess("Categoria excluída com sucesso!");
        setTimeout(() => {
          setApiRemoveSuccess("");
        }, 2000);
      } else {
        setApiError("Falha ao excluir a categoria!");
        setTimeout(() => {
          setApiError("");
        }, 2000);
      }
    }
  };

  return (
    <>
      <main className="container">
        <div className="text-center">
          <span className="h3 mb-3 fw-normal">Lista de Categorias</span>
        </div>
        <Link to="/categories/new" className="btn btn-success">
          Nova categoria
        </Link>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {data.map((category: ICategory) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                    <Link to={`/categories/${category.id}`} className="btn btn-info">
                        Editar
                    </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => onClickRemove(category.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            <tr></tr>
          </tbody>
        </table>
        {apiError && <div className="alert alert-danger">{apiError}</div>}
        {apiRemoveSuccess && (
          <div className="alert alert-success">{apiRemoveSuccess}</div>
        )}
      </main>
    </>
  );
}
