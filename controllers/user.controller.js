import prisma from "../db/prismaClient.js";

export async function createUser(req, res, next) {
  try {
    const data = req.body; 

    const user = await prisma.user.create(
        data, 
    ); 

    res.status(201).json({
        message: "User Created", 
    }); 

  } catch (error) {
    console.error("Error in creating user", error);
    res.json(500).json({
      message: error.message,
    });
  }
}

export async function updateUser(req, res, next) {
  try {
    res.json({
        message: "Update API", 
    })
  } catch (error) {
    console.error("Error in creating user", error);
    res.json(500).json({
      message: error.message,
    });
  }
}
