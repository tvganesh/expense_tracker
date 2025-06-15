import db from '../../utils/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name } = req.body;
      
      // Check if sheet name already exists
      const sheets = await db.getSheets();
      const existingSheet = sheets.find(sheet => sheet.name === name);
      if (existingSheet) {
        return res.status(400).json({ success: false, error: 'Sheet name already exists' });
      }

      // Insert new sheet
      await db.createSheet(name);
      
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error creating sheet:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const sheets = await db.getSheets();
      res.status(200).json({ success: true, data: sheets });
    } catch (error) {
      console.error('Error fetching sheets:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { name } = req.query;
      
      // Don't allow deleting the default sheet
      if (name === 'default') {
        return res.status(400).json({ success: false, error: 'Cannot delete default sheet' });
      }

      await db.deleteSheet(name);
      
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error deleting sheet:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
} 