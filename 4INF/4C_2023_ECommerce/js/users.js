async function getUserId() {
    const user_id_request = await fetch(`${apiBaseUrl}/user.php`);
    const {user_id} = await user_id_request.json();

    return { user_id, logged: user_id !== -1 };
}