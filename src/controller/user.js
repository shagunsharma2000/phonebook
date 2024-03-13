import user from '../model/userModel.js';
import bcrypt from 'bcrypt';

const userRegister = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existinguser = await user.findOne({ where: { username } });
        if (existinguser) {
            return res.status(400).json({
                message: 'username  is already in use',
                status: 403
            });
        }

        const newuser = new user({ username, password });


        await newuser.save();

        res.status(201).json({
            newuser,
            message: "user registered successfully",
            status: 201,
            error: []
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "user not registered ",
            status: 401,
            error: [error.message]
        });
    }
};



const userlogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await user.findOne({ where: { username } });

        if (!existingUser) {
            console.log("User not found");
            return res.status(401).json({
                message: 'User not found',
                status: 401
            });
        }

        const passwordMatch = new user(username, password);

        if (passwordMatch) {
            console.log("Login successful");
            return res.status(200).json({
                message: 'Login successful',
                status: 200
            });
        } else {
            console.log("Invalid password");
            return res.status(401).json({
                message: 'Invalid password',
                status: 401
            });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            message: 'Internal Server Error',
            status: 500
        });
    }
};

const updateDetails = async (req, res) => {
    const userId = req.params.id;
    console.log(req.params.id);
    const updatedData = req.body;
    console.log(req.body);

    try {
        const users = await user.findByPk(userId);

        if (!users) {
            return res.status(404).json({ message: 'User not found' });
        }


        Object.assign(users, updatedData);


        await users.save();

        res.json({ message: 'User updated successfully', users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteDetails = async (req, res) => {
    try {
        const contactId = req.params.id;


        const existingContact = await user.destroy({ where: { id: contactId } });


        if (!existingContact) {
            return res.status(404).json({
                message: 'Contact not found',
                status: 404
            });
        }


        res.status(200).json({
            message: "Contact deleted successfully",
            status: 200,
            error: []
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete contact",
            status: 500,
            error: [error.message]
        });
    }
};


const changePassword = async (req, res, next) => {
    try {
        
        const { oldPassword, newPassword, confirmPassword } = req.body;

        
        const User = await user.findByPk(req.params.id);
        if (!User) {
             res.status(404).send('User not found');
        }

        
        if (User.password !== oldPassword) {
             res.status(401).send('Incorrect old password');
        }

       
        if (oldPassword === newPassword) {
             res.status(400).send('New password must be different from the old password');
        }

        
        if (newPassword !== confirmPassword) {
             res.status(400).send('New password and confirm password do not match');
        }



       if (newPassword === confirmPassword) {
       
          User.password = newPassword;
          await User.save();
        
         } else {
       
       console.log("Passwords don't match. Please try again.");
      
       }

       
        res.status(200).send('Password changed successfully');
    } catch (error) {
  
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getUserById = async (req, res) => {
    try {
        const contactId = req.params.id;


        const existingContact = await user.findByPk(contactId);


        if (!existingContact) {
            return res.status(404).json({
                message: 'Contact not found',
                status: 404
            });
        }


        res.status(200).json({
            contact: existingContact,
            message: "Contact retrieved successfully",
            status: 200,
            error: []
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to retrieve contact",
            status: 500,
            error: [error.message]
        });
    }
};


export { userRegister, userlogin, updateDetails, deleteDetails, changePassword, getUserById };