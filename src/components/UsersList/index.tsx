import React, { useEffect, useState } from "react";
import * as S from "./style";
import api from "../../services/api";
import { User } from "../../interfaces/global.interface";

interface ListProps {
    refresh: boolean;
    onEdit: (user: User) => void;
  }
  
  const List = ({ refresh, onEdit }: ListProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refresh]);

  return (
    <S.ListContainer>
      <h3>Lista de Usuários</h3>
      {loading ? (
        <p>Carregando...</p>
      ) : users.length > 0 ? (
        users.map((user, index) => (
          <S.UserItem key={index}>
            <div>
              <p>
                <strong>Nome:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>CEP:</strong> {user.cep}
              </p>
            </div>
            <S.Button onClick={() => onEdit(user)}>Editar</S.Button>
          </S.UserItem>
        ))
      ) : (
        <p>Nenhum usuário cadastrado.</p>
      )}
    </S.ListContainer>
  );
};

export default List;
