import { ICategory, IProduct } from "@/commons/interfaces";
import CategoryService from "@/services/CategoryService";
import ProductService from "@/services/ProductService";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

export function ProductFormPageV2() {
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
      navigate("/products-v2");
    } else {
      setApiError("Falha ao salvar o produto!");
    }
  };

  return (
    <>
      <main className="container row justify-content-center">
        <h1 className="fs-2 text-center">Cadastro de Produtos - Chakra ui</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.name && true}>
            <FormLabel htmlFor="name">Nome</FormLabel>
            <Input
              id="name"
              placeholder="Informe o nome do produto"
              {...register("name", { required: "O campo nome é obrigatório." })}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.price && true}>
            <FormLabel htmlFor="price">Preço</FormLabel>
            <Input
              id="price"
              placeholder="0.0"
              {...register("price", {
                required: "O campo preço é obrigatório",
                min: {
                  value: 0.01,
                  message: "O valor deve ser maior que zero",
                },
              })}
              type="number"
              step="any"
            />

            <FormErrorMessage>
              {errors.price && errors.price.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.description && true}>
            <FormLabel htmlFor="description">Descrição</FormLabel>
            <Textarea
              id="description"
              placeholder="Descrição do produto"
              {...register("description", {
                required: "O campo descrição é obrigatório",
                minLength: {
                  value: 2,
                  message: "O tamanho deve ser entre 2 e 1024 caracteres",
                },
                maxLength: {
                  value: 1024,
                  message: "O tamanho deve ser entre 2 e 1024 caracteres",
                },
              })}
              size="sm"
            />
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.category && true}>
            <FormLabel htmlFor="category">Categoria</FormLabel>
            <Select
              id="category"
              {...register("category.id", {
                required: "O campo categoria é obrigatório",
              })}
              size="sm"
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((category: ICategory) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>
          <div className="text-center">
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Salvar
            </Button>
          </div>
        </form>
        {apiError && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Ocorreu um erro!</AlertTitle>
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}
        <div className="text-center">
          <Link to="/products-v2">Voltar</Link>
        </div>
      </main>
    </>
  );
}
