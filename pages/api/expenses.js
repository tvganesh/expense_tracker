import db from '../../utils/db';

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        const { page = 1, pageSize = 10, sheet_name = 'default' } = req.query;
        console.log('Fetching expenses:', { page, pageSize, sheet_name }); // Debug log
        
        const { data, total } = await db.getExpenses(parseInt(page), parseInt(pageSize), sheet_name);
        console.log('Database response:', { data, total }); // Debug log
        
        if (!data) {
          return res.status(200).json({ data: [], total: 0 });
        }
        
        res.status(200).json({ data, total });
        break;

      case 'POST':
        const newExpense = await db.insertExpense(req.body);
        res.status(201).json(newExpense);
        break;

      case 'PUT':
        const { id, ...expenseData } = req.body;
        const updatedExpense = await db.updateExpense(id, expenseData);
        res.status(200).json(updatedExpense);
        break;

      case 'DELETE':
        const { id: expenseId } = req.query;
        await db.deleteExpense(expenseId);
        res.status(200).json({ message: 'Expense deleted successfully' });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error in expenses API:', error);
    res.status(500).json({ error: error.message });
  }
} 