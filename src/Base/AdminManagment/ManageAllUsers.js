import React, { useEffect, useState } from 'react';
import './ManageAllUsers.css';
import { GetUsers, UpdateUser, DeleteUser } from '../ApiServices/UserService';
import { useAuth } from '../AuthContext/AuthContext';

const ManageAllUsers = ({ setActivePage }) => {
    const { authState } = useAuth();
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        if (authState.userID) {
            GetUsers(authState.token)
                .then((data) => {
                    const formattedData = data.map((user) => ({
                        ...user,
                        createdAt: new Date(user.created_at).toISOString().split('T')[0],
                    }));
                    setUsers(formattedData);
                })
                .catch((error) => {
                    console.error('Błąd podczas pobierania użytkowników:', error);
                });
        }
    }, [authState.userID]);

    const handleEditClick = (user) => {
        setEditingUser({ ...user });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        try {
            const updatedUser = await UpdateUser({
                ...editingUser,
                created_at: new Date(editingUser.createdAt).toISOString(),
            }, authState.token);

            setUsers((prev) =>
                prev.map((user) =>
                    user.id === updatedUser.id ? updatedUser : user
                )
            );
            setEditingUser(null);
        } catch (error) {
            console.error('Błąd podczas zapisywania zmian:', error.message);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await DeleteUser(userId, authState.token);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        } catch (error) {
            console.error('Błąd podczas usuwania użytkownika:', error.message);
        }
    };

    return (
        <div className="my-work-container">
            <h2>Wszyscy użytkownicy</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id} className="work-item">
                        {editingUser && editingUser.id === user.id ? (
                            <div className="edit-form">
                                <h3>Edycja użytkownika</h3>
                                <div>
                                    <label htmlFor="username">Nazwa użytkownika:</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={editingUser.username}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={editingUser.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="type">Typ:</label>
                                    <input
                                        type="text"
                                        id="type"
                                        name="type"
                                        value={editingUser.type}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <button type="button" onClick={handleSaveChanges}>
                                    Zapisz zmiany
                                </button>
                            </div>
                        ) : (
                            <div>
                                <h3>{user.username}</h3>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Typ:</strong> {user.type}</p>
                                <button type="button" onClick={() => handleEditClick(user)}>
                                    Edytuj
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteUser(user.id)}
                                    style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
                                >
                                    Usuń
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageAllUsers;
