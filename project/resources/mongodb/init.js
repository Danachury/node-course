db.createUser({
    user: "easy",
    pwd: "easy",
    roles: [{role: "userAdminAnyDatabase", db: "admin"}, {role: "readWrite", db: "easy"}, {
        role: "readWrite",
        db: "easy"
    }]
});
