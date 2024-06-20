import { IProduct } from "@/commons/interfaces";
import ProductService from "@/services/ProductService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function ProductListPage() {
  const [data, setData] = useState<IProduct[]>([]);
  const [apiError, setApiError] = useState("");
  const [apiRemoveSuccess, setApiRemoveSuccess] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await ProductService.findAll();
    if (response.status === 200) {
      setData(response.data);
    } else {
      setApiError("Falha ao carregar a lista de produtos!");
    }
  };

  const onClickRemove = async (id?: number) => {
    if (id) {
      const response = await ProductService.remove(id);
      if (response.status === 204 || response.status === 200) {
        // await loadData();
        setData(data.filter((product) => product.id !== id));
        setApiRemoveSuccess("Producto excluído com sucesso!");
        setTimeout(() => {
          setApiRemoveSuccess("");
        }, 2000);
      } else {
        setApiError("Falha ao excluir o produto!");
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
          <span className="h3 mb-3 fw-normal">Lista de Produtos</span>
        </div>
        <Link to="/products/new" className="btn btn-success">
          Novo Produto
        </Link>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Categoria</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product: IProduct) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category.name}</td>
                <td>
                    <Link to={`/products/${product.id}`} className="btn btn-info">
                        Editar
                    </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => onClickRemove(product.id)}
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
