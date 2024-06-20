import { IProduct } from "@/commons/interfaces";
import ProductService from "@/services/ProductService";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  BsPencilSquare,
  BsPlusCircle,
  BsThreeDotsVertical,
  BsTrash,
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

export function ProductListPageV2() {
  const [data, setData] = useState<IProduct[]>([]);
  const [apiError, setApiError] = useState("");
  const [apiRemoveSuccess, setApiRemoveSuccess] = useState("");
  const navigate = useNavigate();

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

  const onEdit = (id?: number) => {
    if (id) {
      navigate(`/products-v2/${id}`);
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
        <h1 className="fs-2 mb-4 text-center">Lista de Produtos - Chakra ui</h1>
        <div className="text-center">
          <Link
            to="/products-v2/new"
            className="btn btn-success"
            title="Novo Produto"
            style={{ display: "inline-block" }}
          >
            <BsPlusCircle style={{ display: "inline-block" }} /> Novo Produto
          </Link>
        </div>
        <TableContainer>
          <Table variant="striped">
            <TableCaption>Lista de produtos</TableCaption>
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Nome</Th>
                <Th isNumeric>Preço</Th>
                <Th>Categoria</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((product: IProduct) => (
                <Tr key={product.id}>
                  <Td>{product.id}</Td>
                  <Td>{product.name}</Td>
                  <Td isNumeric>{product.price}</Td>
                  <Td>{product.category?.name}</Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="Ações"
                        icon={<BsThreeDotsVertical size={20} />}
                        variant="ghost"
                      />
                      <MenuList>
                        <MenuItem
                          icon={<BsPencilSquare />}
                          onClick={() => onEdit(product.id)}
                        >
                          Editar
                        </MenuItem>
                        <MenuItem
                          icon={<BsTrash />}
                          onClick={() => onClickRemove(product.id)}
                        >
                          Remover
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        {apiError && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Ocorreu um erro!</AlertTitle>
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}
        {apiRemoveSuccess && (
          <Alert status="success">
            <AlertIcon />
            <AlertTitle>Sucesso!</AlertTitle>
            <AlertDescription>{apiRemoveSuccess}</AlertDescription>
          </Alert>
        )}
      </main>
    </>
  );
}
