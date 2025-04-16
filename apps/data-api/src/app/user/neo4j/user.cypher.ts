import { get } from "mongoose";

export const userCypher = {
    addUser: `
      CREATE (user:User {
        name: $name,
        email: $email
      }) RETURN user
    `,
    getAllUsers: `
      MATCH (user:User)
        RETURN user
    `,

    removeUser: `
      MATCH (user:User {name: $name})
      DETACH DELETE user
    `,
  
    getUserByUsername: 'MATCH (user:User {username: $username}) RETURN user',

    getUserById: ' MATCH (user:User {id: $id}) RETURN user',

    getUserByEmail: `
      MATCH (user:User {email: $email})
      RETURN user
    `,
 
    updateUser: `
        MATCH (user:User {name: $name})
        SET user.name = $name, user.email = $email
        RETURN user
        `,
  };
  