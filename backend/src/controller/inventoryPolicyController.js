const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

module.exports = {

  async create(req, res) {
    const { great, critical } = req.body;
    try {

      const policy = await prisma.inventoryPolicy.create({
        data: {
          great, critical
        }
      });
      return res.status(200).json(policy);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "error", error })
    }
  },

  async update(req, res) {
    const { great, critical, id } = req.body;
    try {
      const policy = await prisma.inventoryPolicy.update({
        where: { id: id },
        data: {
          great, critical
        }
      });
      return res.status(200).json(policy);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "error", error })
    }
  },

  async index(req, res) {
    try {
      const policies = await prisma.inventoryPolicy.findFirst();
      return res.status(200).json(policies);
    }
    catch (error) {
      return res.status(400).json({ msg: "error", error })
    }

  }
}