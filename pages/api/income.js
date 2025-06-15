import db from '../../utils/db';

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        const { page = 1, pageSize = 10, sheet_name = 'default' } = req.query;
        const { data, total } = await db.getIncome(parseInt(page), parseInt(pageSize), sheet_name);
        res.status(200).json({ data, total });
        break;

      case 'POST':
        const newIncome = await db.insertIncome(req.body);
        res.status(201).json(newIncome);
        break;

      case 'PUT':
        const { id, ...incomeData } = req.body;
        const updatedIncome = await db.updateIncome(id, incomeData);
        res.status(200).json(updatedIncome);
        break;

      case 'DELETE':
        const { id: incomeId } = req.query;
        await db.deleteIncome(incomeId);
        res.status(200).json({ message: 'Income deleted successfully' });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error in income API:', error);
    res.status(500).json({ error: error.message });
  }
} 