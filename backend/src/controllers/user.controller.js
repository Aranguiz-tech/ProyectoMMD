// Importa el modelo de datos 'User'
import User from '../models/user.model.js';
import Role from '../models/role.model.js';

// Función para dar "like" a un usuario
export const likeUser = async (req, res) => {
    try {
        const { userId, likedUserId } = req.body;  // obtener los IDs de los usuarios

        const user = await User.findById(userId);  // encontrar el usuario que da el like
        const likedUser = await User.findById(likedUserId);  // encontrar el usuario que recibe el like

        if (!user || !likedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });  // 404: no encontrado, verificar que ambos usuarios existen
        }

        if (!user.likes.includes(likedUserId)) { //esta condicion nos asegura qwe no hayan duplicados
            user.likes.push(likedUserId);  // Agregar el ID del usuario liked si no está ya en la lista
            await user.save();  // guardar los cambios
        }

        res.status(200).json({ message: "Usuario liked exitosamente" });  // 200 es el exito, hablando de numeros
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });  // 500 no se cumplió una condicion, para que el cliente sepa que la solicitud no se pudo completar debido a un problema interno
    }
};

// Función para dar "dislike" a un usuario
export const dislikeUser = async (req, res) => {
    try {
        const { userId, dislikedUserId } = req.body;  // Obtener los IDs de los usuarios

        const user = await User.findById(userId);  // Encontrar el usuario que da el dislike
        const dislikedUser = await User.findById(dislikedUserId);  // Encontrar el usuario que recibe el dislike

        if (!user || !dislikedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });  // Verificar que ambos usuarios existen
        }

        if (!user.dislikes.includes(dislikedUserId)) {
            user.dislikes.push(dislikedUserId);  // Agregar el ID del usuario disliked si no está ya en la lista
            await user.save();  // Guardar los cambios
        }

        res.status(200).json({ message: "Usuario disliked exitosamente" });  // Responder con éxito
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });  // Manejar errores
    }
};

export async function getUser(req, res) {
    try {
        const rutUser = req.query.rut;

        if (!rutUser) {
            res.status(400).json({
                message: "El parámetro 'rut' es requerido.",
                data: null
            });
            return;
        }

        const user = await User.findOne({rut: rutUser});

        if(!user){
            res.status(404).json({
                message: "Usuario no encontrado",
                data: null
            })
            return;
        }

        res.status(200).json({
            message: "Usuario encontrado!",
            data: user
        })
    } catch (error) {
        console.log("Error en user.controller.js -> getUser(): ", error);
        res.status(500).json({ message: error.message });
    }
}

export async function getUsers(req, res) {
    try {
        const users = await User.find().populate('roles', 'name');
        res.status(200).json({
            message: "Lista de usuarios",
            data: users
        });
    } catch (error) {
        console.log("Error en user.controller.js -> getUsers(): ", error);
        res.status(500).json({ message: error.message });
    }
}

export async function updateUser(req, res) {
    try {
        const rutUser = req.query.rut;
        const updatedData = req.body;

        if (!rutUser) {
            res.status(400).json({
                message: "El parámetro 'rut' es requerido.",
                data: null
            });
            return;
        }

        if (updatedData.roles) {
            const rolesNames = updatedData.roles;
            const roles = await Role.find({ name: { $in: rolesNames } });

            if (roles.length !== rolesNames.length) {
                res.status(400).json({
                    message: "Uno o más roles no son válidos.",
                    data: null
                });
                return;
            }

            const rolesIds = roles.map(role => role._id);
            updatedData.roles = rolesIds;
        }

        if (updatedData.password) {
            updatedData.password = await User.encryptPassword(updatedData.password);
        }
        const userMod = await User.findOneAndUpdate({ rut: rutUser }, updatedData, { new: true });

        if (!userMod) {
            res.status(404).json({
                message: "Usuario no encontrado",
                data: null
            });
            return;
        }

        res.status(200).json({
            message: "Usuario actualizado correctamente!",
            data: userMod
        });

    } catch (error) {
        console.log("Error en user.controller.js -> updateUser(): ", error);
        res.status(500).json({ message: error.message });
    }
}

export async function deleteUser(req, res) {
    try {
        const rutUser = req.query.rut;
        if (!rutUser) {
            res.status(400).json({
                message: "El parámetro 'rut' es requerido.",
                data: null
            });
            return;
        }

        const user = await User.findOneAndDelete({ rut: rutUser });

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado",
                data: null
            });
        }

        res.status(200).json({
            message: "Usuario eliminado exitosamente!",
            data: user
        });

    } catch (error) {
        console.log("Error en user.controller.js -> deleteUser(): ", error);
        res.status(500).json({ message: error.message });
    }
}
