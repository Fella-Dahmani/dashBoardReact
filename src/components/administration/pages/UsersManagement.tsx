import React, { useState } from "react";
const UsersManagement = () => {
  const [activeForm, setActiveForm] = useState<
    "add" | "changePassword" | "delete" | "manageRights" | null
  >(null);

  const handleCardClick = (
    formType: "add" | "changePassword" | "delete" | "manageRights"
  ) => {
    setActiveForm(formType);
  };

  const [showForm, setShowForm] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmitAdd = () => {
    console.log("User Added:", { name, surname, position, password });
    setName("");
    setSurname("");
    setPosition("");
    setPassword("");
    setShowForm(false);
  };

  const handleSubmitChangePassword = () => {
    console.log("Password Changed");
    setActiveForm(null);
  };

  const handleSubmitDelete = () => {
    console.log("User Deleted");
    setActiveForm(null);
  };
  const handleCancel = () => {
   
    setName("");
    setSurname("");
    setPosition("");
    setPassword("");
    setShowForm(false);

    setActiveForm(null);
  };

  const handleSubmitManageRights = () => {
    console.log("User Rights Managed");
    setActiveForm(null);
  };

  return (
    <div>
      <h1 className="title">Gestion des utilisateurs</h1>

      <div className="Cardcontainer">
        <div
          className={`card ${activeForm === "add" ? "clicked" : ""}`}
          onClick={() => handleCardClick("add")}
        >
          <h3>Ajouter un utilisateur</h3>
          <p>Créez un nouvel utilisateur dans le système.</p>
        </div>

        <div
          className={`card ${activeForm === "changePassword" ? "clicked" : ""}`}
          onClick={() => handleCardClick("changePassword")}
        >
          <h3>Modifier le mot de passe</h3>
          <p>Changez le mot de passe de l'utilisateur.</p>
        </div>

        <div
          className={`card ${activeForm === "delete" ? "clicked" : ""}`}
          onClick={() => handleCardClick("delete")}
        >
          <h3>Supprimer un utilisateur</h3>
          <p>Supprimez un utilisateur du système.</p>
        </div>

        <div
          className={`card ${activeForm === "manageRights" ? "clicked" : ""}`}
          onClick={() => handleCardClick("manageRights")}
        >
          <h3>Gérer les droits</h3>
          <p>Attribuez ou modifiez les droits des utilisateurs.</p>
        </div>
      </div>
      {activeForm === "add" && (
        <div className="form-card">
          <h3>Ajouter un utilisateur</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="name">Nom</label>
              <input type="text" id="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="surname">Prénom</label>
              <input type="text" id="surname" required />
            </div>
            <div className="form-group">
              <label htmlFor="position">Fonction</label>
              <input type="text" id="position" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input type="password" id="password" required />
            </div>
            <div className="form-buttons">
              <button type="button" onClick={handleSubmitAdd}>
                Valider
              </button>
              <button type="button" onClick={handleCancel}>
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {activeForm === "changePassword" && (
        <div className="form-card">
          <h3>Modifier le mot de passe</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="username">Utilisateur</label>
              <input type="text" id="username" required />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">Nouveau mot de passe</label>
              <input type="password" id="newPassword" required />
            </div>
            <div className="form-buttons">
              <button type="button" onClick={handleSubmitChangePassword}>
                Valider
              </button>
              <button type="button" onClick={handleCancel}>
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {activeForm === "delete" && (
        <div className="form-card">
          <h3>Supprimer un utilisateur</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="deleteUsername">Utilisateur</label>
              <input type="text" id="deleteUsername" required />
            </div>
            <div className="form-buttons">
              <button type="button" onClick={handleSubmitDelete}>
                Valider
              </button>
              <button type="button" onClick={handleCancel}>
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {activeForm === "manageRights" && (
        <div className="form-card">
          <h3>Gérer les droits des utilisateurs</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="user">Utilisateur</label>
              <input type="text" id="user" required />
            </div>
            <div className="form-group">
              <label htmlFor="rights">Droits</label>
              <select id="rights" required>
                <option value="">Sélectionner un droit</option>
                <option value="admin">Administrateur</option>
                <option value="editor">Éditeur</option>
                <option value="viewer">Lecteur</option>
              </select>
            </div>
            <div className="form-buttons">
              <button type="button" onClick={handleSubmitManageRights}>
                Valider
              </button>
              <button type="button" onClick={handleCancel}>
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;
