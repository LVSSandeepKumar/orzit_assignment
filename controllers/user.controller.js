export async function createUser(req, res, next) {
  try {
    res.json({
      message: "Create API",
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
