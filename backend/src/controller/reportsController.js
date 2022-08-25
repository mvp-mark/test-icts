const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

module.exports = {

  async create(req, res) {
    try {
      const { Date, Open, High, Low, Close, Volume } = req.body;
      const policy = await prisma.reports.create({
        data: {
          Date, Open, High, Low, Close, Volume
        }
      });

      return res.status(200).json(policy);
    } catch (error) {
      return res.status(400).json({ msg: "error", error })
    }
  },
  async update(req, res) {
    const { id } = req.query;
    const { Date, Open, High, Low, Close, Volume } = req.body;
    try {
      const policy = await prisma.reports.update({
        where: { id:parseInt(id) },
        data: {
          Date, Open, High, Low, Close, Volume
        }
      });
      return res.status(200).json(policy);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "error", error })
    }
  },
  async createList(req, res) {
    try {
      const { items } = req.body;
      const data = items.map(item => ({
        ...item,
      }))
      const policies = await prisma.reports.createMany({
        data: data,
        skipDuplicates:true,
      });

      return res.status(200).json(policies);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Falha ou arquivo inválido", error })
    }
  },
  async index(req,res){
    try {
      const policies = await prisma.reports.findMany();
      return res.status(200).json(policies);
    } catch (error) {
      return res.status(400).json({ msg: "error", error })
    }
  }


}