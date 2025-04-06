 const User = require('../models/user'); // Import the User model
const bcrypt = require('bcrypt');

// Function for parent signup
const signupParent = async (req, res) => {
  const { 
    nom, prenom, email, password, adresse, numeroTel, 
    relationAvecEnfant, nomPrenomEnf, dateNaissanceEnf, niveau,
    comportement, nomEcole,  medicaments, behavior 
  } = req.body;

  try {
    // Check if the email already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: 'This email is already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the parent user
    const newUser = new User({
      nom,
      prenom,
      email,
      password: hashedPassword,
      adresse,
      numeroTel,
      userType: 'parent',  // Set userType as 'parent'
      relationAvecEnfant,
      nomPrenomEnf,
      dateNaissanceEnf,
      niveau,
      nomEcole,
      medicaments,
      behavior
    });

    // Save the parent user to the database
    await newUser.save();
    res.status(201).json({ message: 'Parent registered successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, please try again' });
  }
};

module.exports = {
  signupParent
};