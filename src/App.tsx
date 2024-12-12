import React, { useState } from "react";
import * as S from "./style";
import Form from "./components/Form";
import List from "./components/UsersList";
import GlobalStyle from "./styles/global";
import { User } from "./interfaces/global.interface";



function App() {
  const [refresh, setRefresh] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleRefresh = () => {
    setRefresh(!refresh); 
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  return (
    <>
      <GlobalStyle />
      <S.Container>
        <h1>{editingUser ? "Edição" : "Cadastro"}</h1>
        <Form onRefresh={handleRefresh} editingUser={editingUser} setEditingUser={setEditingUser} />
        <br />
        <hr />
        <br />
        <List refresh={refresh} onEdit={handleEdit} />
      </S.Container>
    </>
  );
};

export default App;