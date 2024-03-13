import Phone from '../model/phoneModel.js';
import user from '../model/userModel.js';
import bcrypt from 'bcrypt';


const Createcontact = async (req, res) => {
    try {
        const { name, mobileno, userid } = req.body;

        
        const existingUser = await user.findByPk(userid);
        if (!existingUser) {
            return res.status(400).json({
                message: 'User does not exist',
                status: 400
            });
        }

        
        const existingMobile = await Phone.findOne({ where: { mobileno, userid } });
        if (existingMobile) {
            return res.status(400).json({
                message: 'This mobile number is already in use for this user',
                status: 400
            });
        }

       
        const newContact = await Phone.create({ name, mobileno, userid });

        res.status(201).json({
            newContact,
            message: "New contact created successfully",
            status: 201
        });
    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).json({
            message: "New contact not created",
            status: 500,
            error: [error.message]
        });
    }
};



const AllContact = async (req, res) => {
    try {
       
        const allContacts = await Phone.findAll();

        if (!allContacts || allContacts.length === 0) {
            return res.status(404).json({
                message: 'No contacts found',
                status: 404
            });
        }

       
        res.status(200).json({
            contacts: allContacts,
            message: "All contacts retrieved successfully",
            status: 200,
            error: []
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to retrieve contacts",
            status: 500,
            error: [error.message]
        });
    }
};


const getContactByuserId = async (req, res) => {
    try {
        
        const userId = req.params.id;
        console.log( userId)

       
        if (!userId) {
            console.log( userId)
            return res.status(400).json({ message: 'User ID is missing or invalid' });
        }

      
        const existingContact = await Phone.findByPk(userId );
        const existinguser = await user.findByPk(existingContact.userid );

         const data = {
            "user": existinguser,
            "contact": existingContact
        }

      
        if (!existingContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        
        res.json(data);
    } catch (error) {
       
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Failed to retrieve contact', error: error.message });
    }
};

const   updateContact = async (req, res) => {
    const userId = req.params.id;
    console.log(req.params.id);
    const updatedData = req.body;
    console.log(req.body);  

    try {
        const users = await Phone.findByPk(userId);

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


const deleteContact = async (req, res) => {
    try {
        const contactId = req.params.id; 

       
        const existingContact = await Phone.destroy({where: {id: contactId }});

        
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



export { Createcontact , AllContact , getContactByuserId  , updateContact , deleteContact  };
